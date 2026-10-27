/**
 * AgriShield Voice Service
 * Supports Web Speech API (SpeechRecognition and SpeechSynthesis)
 * with Bengali (bn-BD) and English (en-US) support
 */

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
      }
    }
  }

  isSpeechSupported() {
    return !!this.recognition && !!this.synth;
  }

  /**
   * Speak out text in Bangla or English
   */
  speak(text, lang = 'bn-BD') {
    if (!this.synth) return;

    // Cancel any ongoing speech
    this.synth.cancel();

    // Strip emojis or markdown stars for cleaner audio
    const cleanText = text
      .replace(/[*_#`]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'bn' || lang === 'bn-BD' ? 'bn-BD' : 'en-US';
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    // Try finding a matching voice
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(lang.slice(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    this.synth.speak(utterance);
    return utterance;
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Listen to voice input from farmer
   */
  startListening(lang = 'bn-BD', onResult, onError, onEnd) {
    if (!this.recognition) {
      if (onError) onError('ভয়েস রিকগনিশন আপনার ব্রাউজারে সাপোর্টেড নয়। Chrome ব্যবহার করুন।');
      return;
    }

    this.recognition.lang = lang === 'bn' || lang === 'bn-BD' ? 'bn-BD' : 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch {
      // Already running
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
