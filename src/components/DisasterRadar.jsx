import React, { useState } from 'react';
import { CloudRain, AlertTriangle, ShieldAlert, Waves, BellRing, Volume2, VolumeX, Wind } from 'lucide-react';
import { CLIMATE_ALERTS } from '../data/agriData';
import { speechService } from '../services/speechService';

export default function DisasterRadar({ lang }) {
  const [activeAlert, setActiveAlert] = useState(CLIMATE_ALERTS[0]);
  const [completedSteps, setCompletedSteps] = useState({});
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const toggleStep = (stepIndex) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [`${activeAlert.id}-${stepIndex}`]: !prev[`${activeAlert.id}-${stepIndex}`]
    }));
  };

  const handleToggleVoice = () => {
    if (isPlayingVoice) {
      speechService.stopSpeaking();
      setIsPlayingVoice(false);
      return;
    }

    const text = lang === 'bn'
      ? `জরুরি দুর্যোগ সতর্কতা: ${activeAlert.regionBn} এর জন্য ${activeAlert.alertType}। প্রত্যাশিত সময়: ${activeAlert.predictedTime}। নির্দেশনাবলী: ${activeAlert.actionPlanBn}`
      : `Emergency Climate Alert: ${activeAlert.alertType} for ${activeAlert.regionEn}. Expected Horizon: ${activeAlert.predictedTimeEn}. Action Plan: ${activeAlert.actionPlanEn}`;

    setIsPlayingVoice(true);
    const utterance = speechService.speak(text, lang === 'bn' ? 'bn-BD' : 'en-US');
    if (utterance) {
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 relative overflow-hidden bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center gap-1.5">
                <BellRing className="w-3.5 h-3.5 animate-bounce" />
                {lang === 'bn' ? 'জলবায়ু দুর্যোগ আগাম সতর্কতা সিস্টেম' : 'Early Climate & Flood Warning Radar'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                SDG 13: Climate Action
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'আকস্মিক বন্যা ও প্রাকৃতিক দুর্যোগ মোকাবিলা' : 'Flash Flood & Extreme Weather Resilience'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {lang === 'bn'
                ? 'হাওর বা উপকূলীয় অঞ্চলের কৃষকদের ফসল রক্ষার আগাম সতর্কতা এবং জীবন রক্ষাকারী অ্যাকশন প্ল্যান।'
                : 'Proactive hyper-local climate alerts and step-by-step mitigation plans to prevent total crop loss.'}
            </p>
          </div>

          {/* Voice Toggle Button (ON / OFF) */}
          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all self-start md:self-auto active:scale-95 shadow-md ${
              isPlayingVoice
                ? 'bg-red-600 hover:bg-red-500 text-white border-red-400 animate-pulse shadow-red-950/50'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-950/40'
            }`}
          >
            {isPlayingVoice ? (
              <>
                <VolumeX className="w-4 h-4 text-white" />
                <span>{lang === 'bn' ? 'সতর্কতা বন্ধ করুন (Voice OFF)' : 'Stop Voice Alert (Voice OFF)'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{lang === 'bn' ? 'অডিও শুনুন (Voice ON)' : 'Listen Voice Alert (Voice ON)'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Region Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CLIMATE_ALERTS.map((alert) => {
          const isSelected = activeAlert.id === alert.id;
          return (
            <div
              key={alert.id}
              onClick={() => setActiveAlert(alert)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'glass-panel-glow border-amber-400/60 shadow-lg'
                  : 'glass-panel border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  alert.alertLevel === 'HIGH'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : alert.alertLevel === 'WARNING'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                }`}>
                  {alert.alertLevel} {lang === 'bn' ? 'ঝুঁকি' : 'RISK'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? alert.predictedTime : alert.predictedTimeEn}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                {lang === 'bn' ? alert.regionBn : alert.regionEn}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                {alert.alertType}
              </p>
            </div>
          );
        })}
      </div>

      {/* Detailed Alert & Mitigation Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Environmental Indicators */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'bn' ? 'হাইপারলোকাল পরিবেশ পরিমাপক' : 'Environmental Metrics'}</span>
          </h4>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                  {lang === 'bn' ? 'প্রত্যাশিত বৃষ্টিপাত:' : 'Expected Rainfall:'}
                </span>
                <span className="font-bold text-blue-300">{activeAlert.rainfallExpected}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  {lang === 'bn' ? 'নদীর পানির স্তর / বিপদসীমা:' : 'River Surge Danger Level:'}
                </span>
              </div>
              <p className="text-xs font-semibold text-cyan-200 mt-1">
                {activeAlert.riverLevel}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'bn' ? 'সতর্কতার সময়সীমা:' : 'Warning Timeframe:'}
                </span>
                <span className="font-bold text-amber-300">
                  {lang === 'bn' ? activeAlert.predictedTime : activeAlert.predictedTimeEn}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{lang === 'bn' ? 'জরুরি হেল্পলাইন: কৃষি সম্প্রসারণ অধিদপ্তর (১৬১২৩)' : 'National Emergency Agri Hotline: 16123'}</span>
          </div>
        </div>

        {/* Action Plan & Farmer Checklist */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
              {lang === 'bn' ? 'জরুরি ফসল রক্ষা অ্যাকশন প্ল্যান' : 'Immediate Crop Defense Checklist'}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {activeAlert.alertType}
            </h3>
          </div>

          <p className="text-xs text-slate-400">
            {lang === 'bn'
              ? 'বন্যার পানিতে ফসল ডুবে যাওয়া বা ক্ষতি এড়াতে নিচের পদক্ষেপগুলো দ্রুত সম্পন্ন করুন:'
              : 'Complete the following mitigation steps before the hazard window to minimize loss:'}
          </p>

          <div className="space-y-3">
            {(lang === 'bn' ? activeAlert.actionPlanBn : activeAlert.actionPlanEn)
              .split('\n')
              .map((line, idx) => {
                const isChecked = !!completedSteps[`${activeAlert.id}-${idx}`];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="pt-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-800 border-slate-700"
                      />
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through opacity-70' : ''}`}>
                      {line}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

      </div>

    </div>
  );
}
