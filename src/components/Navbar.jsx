import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';
import { UI_TEXT } from '../data/translations';

export default function Navbar({ lang, setLang, activeTab, setActiveTab }) {
  const t = UI_TEXT[lang] || UI_TEXT.bn;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-emerald-500/20 px-4 lg:px-8 py-3.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Track Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white font-bold text-2xl border border-emerald-300/40">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-white bg-clip-text text-transparent">
                {t.brandName}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {t.version}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>{t.tagline}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-medium">{t.trackBadge}</span>
            </p>
          </div>
        </div>

        {/* SDG Badges & 100% Security Status */}
        <div className="flex items-center flex-wrap gap-2">
          {/* SDG Badges */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-medium text-slate-300">
            <span className="text-amber-400 font-bold">{t.unSdgs}</span>
            <span className="px-1.5 py-0.5 rounded bg-red-900/50 text-red-300 border border-red-700/50">{t.sdg1}</span>
            <span className="px-1.5 py-0.5 rounded bg-yellow-900/50 text-yellow-300 border border-yellow-700/50">{t.sdg2}</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/50">{t.sdg13}</span>
          </div>

          {/* 100% Security Pill (Solix Standard) */}
          <div 
            onClick={() => setActiveTab('security')}
            className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 hover:border-emerald-400 text-xs text-emerald-300 transition-all hover:shadow-lg hover:shadow-emerald-900/30"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="font-semibold block leading-tight">{t.securityStatus}</span>
              <span className="text-[10px] text-emerald-400/80">{t.securitySub}</span>
            </div>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 text-xs font-bold text-white transition-all active:scale-95 shadow-md shadow-emerald-950/50"
          >
            <Globe className="w-3.5 h-3.5 text-white animate-spin-slow" />
            <span>{t.langButton}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
