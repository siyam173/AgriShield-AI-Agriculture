import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, ShieldCheck, RefreshCw } from 'lucide-react';
import { speechService } from '../services/speechService';
import { securityEngine } from '../services/securityEngine';

const QUICK_QUESTIONS_BN = [
  'ধানের জমিতে ইউরিয়া সার দেওয়ার সঠিক নিয়ম কী?',
  'আলু ক্ষেতে কুয়াশা পড়লে কী করা উচিত?',
  'কীটনাশক দেওয়ার কতদিন পর ফসল তোলা নিরাপদ?',
  'পাহাড়ি ঢল বা আকস্মিক বন্যার আগে করণীয় কী?'
];

const QUICK_QUESTIONS_EN = [
  'What is the balanced ratio for urea & potash in paddy?',
  'How to protect potato crops during cold fog wave?',
  'What is the pre-harvest safety interval for pesticides?',
  'Early action checklist before haor flash floods?'
];

export default function VoiceAssistant({ lang }) {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSpeakingIdx, setActiveSpeakingIdx] = useState(null);

  const initialMsgBn = 'আসসালামু আলাইকুম! আমি আপনার কৃষি বন্ধু ও পরামর্শক এআই। যেকোনো ফসলের সমস্যা, সার বা আবহাওয়ার বিষয়ে মুখে বলুন অথবা লিখে পাঠান।';
  const initialMsgEn = 'Hello! I am your AI Agri-Advisor. Ask any question about crop management, soil health, fertilizers, or disaster prep by voice or text.';

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: lang === 'bn' ? initialMsgBn : initialMsgEn,
      timestamp: 'Just now',
      securityStatus: 'PASSED'
    }
  ]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [{
          role: 'assistant',
          text: lang === 'bn' ? initialMsgBn : initialMsgEn,
          timestamp: 'Just now',
          securityStatus: 'PASSED'
        }];
      }
      return prev;
    });
  }, [lang]);

  const handleStartVoice = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    speechService.startListening(
      lang === 'bn' ? 'bn-BD' : 'en-US',
      (transcript) => {
        setIsListening(false);
        setInputText(transcript);
        processUserQuery(transcript);
      },
      (error) => {
        setIsListening(false);
        alert(lang === 'bn' ? 'ভয়েস শনাক্ত করা যায়নি। আবার চেষ্টা করুন।' : 'Voice recognition error: ' + error);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleTogglePlayMessage = (text, idx) => {
    if (activeSpeakingIdx === idx) {
      speechService.stopSpeaking();
      setActiveSpeakingIdx(null);
      return;
    }

    setActiveSpeakingIdx(idx);
    const utterance = speechService.speak(text, lang === 'bn' ? 'bn-BD' : 'en-US');
    if (utterance) {
      utterance.onend = () => setActiveSpeakingIdx(null);
      utterance.onerror = () => setActiveSpeakingIdx(null);
    }
  };

  const processUserQuery = (queryText) => {
    if (!queryText.trim()) return;

    const secResult = securityEngine.inspectInput(queryText);

    const userMsg = {
      role: 'user',
      text: secResult.safe ? (secResult.sanitizedText || queryText) : queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      securityStatus: secResult.safe ? 'VERIFIED' : 'THREAT_INTERCEPTED'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      let botResponse = '';
      if (!secResult.safe) {
        botResponse = lang === 'bn'
          ? `⚠️ নিরাপত্তা লঙ্ঘন সনাক্ত: Solix AI Guardrail এই অনুরোধটি প্রতিরোধ করেছে (${secResult.reason})। কৃষকদের ক্ষতির ঝুঁকিমুক্ত রাখতে অনিরাপদ রাসায়নিক বা ক্ষতিকর প্রম্পট নিষিদ্ধ।`
          : `⚠️ Security Violation Intercepted: Solix AI Guardrail blocked this request (${secResult.reason}). Prohibited agro-toxins and jailbreaks are strictly forbidden.`;
      } else {
        botResponse = generateAgriAnswer(queryText, lang);
      }

      const botMsg = {
        role: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        securityStatus: secResult.safe ? 'PASSED' : 'BLOCKED'
      };

      setMessages((prev) => {
        const nextList = [...prev, botMsg];
        handleTogglePlayMessage(botResponse, nextList.length - 1);
        return nextList;
      });
      setIsLoading(false);
    }, 700);
  };

  const generateAgriAnswer = (query, currentLang) => {
    const q = query.toLowerCase();
    if (q.includes('ইউরিয়া') || q.includes('urea') || q.includes('সার')) {
      return currentLang === 'bn'
        ? 'ধানের জমিতে ইউরিয়া সার তিন কিস্তিতে প্রয়োগ করতে হয়: চারা রোপণের ১৫-২০ দিন পর প্রথম কিস্তি, কুশি গজানোর সময় দ্বিতীয় কিস্তি এবং থোড় আসার ৫-৭ দিন আগে শেষ কিস্তি। সবসময় ভেজা বা স্যাঁতসেঁতে মাটিতে সার প্রয়োগ করবেন।'
        : 'Apply urea in 3 split doses: 1st at 15-20 days after transplanting (DAT), 2nd at active tillering, and 3rd at panicle initiation. Ensure soil is moist, not submerged.';
    }
    if (q.includes('বন্যা') || q.includes('flood') || q.includes('ঢল')) {
      return currentLang === 'bn'
        ? 'আকস্মিক বন্যার আগাম পূর্বাভাস পেলে ৮০% পাকা ধান জরুরি ভিত্তিতে কেটে নিন। বীজতলা বাঁচাতে উঁচু বেড তৈরি করুন। বন্যা পরবর্তী সময়ে দ্রুত ফলনশীল আমন ধান চাষের প্রস্তুতি রাখুন।'
        : 'When flood risk is detected, initiate immediate harvest of 80% ripened paddy. Relocate seed reserves to elevated storage and prepare quick-maturing varieties.';
    }
    if (q.includes('আলু') || q.includes('potato') || q.includes('কুয়াশা') || q.includes('fog')) {
      return currentLang === 'bn'
        ? 'তীব্র কুয়াশায় আলুর জমিতে লেট ব্লাইট ছত্রাক দ্রুত ছড়ায়। কুয়াশা থাকা অবস্থায় সকালের দিকে জমিতে সেচ দেওয়া থেকে বিরত থাকুন। কুয়াশা দীর্ঘস্থায়ী হলে আগাম বোর্দো মিশ্রণ বা ম্যানকোজেব স্প্রে করুন।'
        : 'Dense cold fog triggers late blight fungal sporulation. Avoid morning overhead irrigation. Spray preventive 1% Bordeaux mixture or Mancozeb before spore germination.';
    }
    return currentLang === 'bn'
      ? 'আপনার প্রশ্নের জন্য ধন্যবাদ। কৃষি বিশেষজ্ঞদের বৈজ্ঞানিক তথ্যানুযায়ী, পরিমিত সেচ ও সুষম সার ব্যবহার করলে ফসলের ফলন ২০-২৫% বৃদ্ধি পায় এবং রোগবালাই প্রতিরোধ ক্ষমতা বাড়ে।'
      : 'Thank you for your inquiry. According to scientific agronomy standards, balanced nutrition and controlled irrigation boost crop resilience by 20-25%.';
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Mic className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'bn' ? 'কৃষক ভয়েস অ্যাসিস্ট্যান্ট (কথা বলুন)' : 'Voice-First Agri Assistant'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'টাইপ করতে না পারলে শুধু মুখে বলুন, এআই বাংলায় উত্তর দেবে।' : 'Speak naturally in Bangla or English — AI speaks back.'}
              </p>
            </div>
          </div>
        </div>

        {/* Security Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-xs text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'bn' ? 'সলিক্স রিয়েল-টাইম গার্ডরেল সক্রিয়' : 'Solix Real-Time Guardrail Active'}</span>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          {lang === 'bn' ? 'জরুরি কয়েকটি প্রশ্ন (ক্লিক করে শুনুন):' : 'Frequently Asked Voice Queries:'}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(lang === 'bn' ? QUICK_QUESTIONS_BN : QUICK_QUESTIONS_EN).map((q, idx) => (
            <button
              key={idx}
              onClick={() => processUserQuery(q)}
              className="text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 transition-all flex items-center justify-between group"
            >
              <span className="truncate pr-2">{q}</span>
              <Volume2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="h-72 overflow-y-auto space-y-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-950/40'
                  : m.securityStatus === 'BLOCKED'
                  ? 'bg-red-950/60 border border-red-500/40 text-red-200 rounded-bl-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              <p>{m.text}</p>
              <div className="flex items-center justify-between gap-3 mt-1.5 text-[10px] opacity-75">
                <span>{m.timestamp}</span>
                {m.role === 'assistant' && (
                  <button
                    onClick={() => handleTogglePlayMessage(m.text, i)}
                    className="hover:text-emerald-300 flex items-center gap-1 font-bold"
                  >
                    {activeSpeakingIdx === i ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                        <span className="text-red-300">{lang === 'bn' ? 'থামান (OFF)' : 'Stop (OFF)'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{lang === 'bn' ? 'শুনুন (ON)' : 'Listen (ON)'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{lang === 'bn' ? 'এআই তথ্য বিশ্লেষণ করছে...' : 'AI synthesizing agronomy insights...'}</span>
          </div>
        )}
      </div>

      {/* Input Controls & Large Mic Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleStartVoice}
          title={isListening ? 'ক্লিক করে কথা শেষ করুন' : 'মাইক্রোফোনে ক্লিক করে মুখে বলুন'}
          className={`relative p-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center ${
            isListening
              ? 'bg-red-600 text-white animate-pulse shadow-red-600/50 scale-105'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
          }`}
        >
          {isListening ? <MicOff className="w-6 h-6 animate-bounce" /> : <Mic className="w-6 h-6" />}
          {isListening && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && processUserQuery(inputText)}
            placeholder={
              isListening
                ? (lang === 'bn' ? 'শুনছি... আপনার প্রশ্নটি মুখে বলুন...' : 'Listening... Speak now...')
                : (lang === 'bn' ? 'আপনার প্রশ্ন লিখুন বা মাইকে কথা বলুন...' : 'Type or click the microphone to speak...')
            }
            className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all pr-12"
          />
          <button
            onClick={() => processUserQuery(inputText)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
