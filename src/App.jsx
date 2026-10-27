import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CropDoctor from './components/CropDoctor';
import FertilizerCalculator from './components/FertilizerCalculator';
import WaterAndSprayGuide from './components/WaterAndSprayGuide';
import VoiceAssistant from './components/VoiceAssistant';
import DisasterRadar from './components/DisasterRadar';
import MarketPrices from './components/MarketPrices';
import CommunityHeatmap from './components/CommunityHeatmap';
import HelplineDirectory from './components/HelplineDirectory';
import SecurityConsole from './components/SecurityConsole';
import { 
  Stethoscope, Calculator, Droplets, Mic, CloudRain, 
  Store, Radio, PhoneCall, ShieldCheck, Sparkles, TrendingUp 
} from 'lucide-react';
import { UI_TEXT } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('bn'); // 'bn' | 'en'
  const [activeTab, setActiveTab] = useState('crop-doctor');
  const t = UI_TEXT[lang] || UI_TEXT.bn;

  const TABS = [
    {
      id: 'crop-doctor',
      label: t.tabDoctor,
      icon: Stethoscope,
      badge: 'Multimodal'
    },
    {
      id: 'fertilizer',
      label: t.tabLandCalc,
      icon: Calculator,
      badge: 'BARC AI'
    },
    {
      id: 'water-spray',
      label: t.tabWaterSpray,
      icon: Droplets,
      badge: 'Hydrology'
    },
    {
      id: 'voice',
      label: t.tabVoice,
      icon: Mic,
      badge: 'Voice In/Out'
    },
    {
      id: 'disaster',
      label: t.tabDisaster,
      icon: CloudRain,
      badge: 'SDG 13'
    },
    {
      id: 'market',
      label: t.tabMarket,
      icon: Store,
      badge: 'SDG 1'
    },
    {
      id: 'outbreak',
      label: t.tabOutbreak,
      icon: Radio,
      badge: 'Hotspots'
    },
    {
      id: 'helpline',
      label: t.tabHelpline,
      icon: PhoneCall,
      badge: '16123 DAE'
    },
    {
      id: 'security',
      label: t.tabSecurity,
      icon: ShieldCheck,
      badge: 'Solix 100%'
    }
  ];

  return (
    <div className="min-h-screen bg-ambient-mesh text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar lang={lang} setLang={setLang} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* KPI Stat Cards (100% Fully localized with zero hardcoded values) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Diagnostic Accuracy */}
          <div className="p-3.5 rounded-2xl glass-panel border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">
                {t.kpiAccuracyLabel}
              </span>
              <span className="text-lg font-extrabold text-white">
                {t.kpiAccuracyVal}
              </span>
            </div>
          </div>

          {/* Income Protected */}
          <div className="p-3.5 rounded-2xl glass-panel border border-teal-500/20 hover:border-teal-500/40 transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">
                {t.kpiIncomeLabel}
              </span>
              <span className="text-lg font-extrabold text-white">
                {t.kpiIncomeVal}
              </span>
            </div>
          </div>

          {/* Early Hazard Horizon */}
          <div className="p-3.5 rounded-2xl glass-panel border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">
                {t.kpiHazardLabel}
              </span>
              <span className="text-lg font-extrabold text-white">
                {t.kpiHazardVal}
              </span>
            </div>
          </div>

          {/* Solix Governance */}
          <div 
            onClick={() => setActiveTab('security')}
            className="cursor-pointer p-3.5 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">
                {t.kpiGovLabel}
              </span>
              <span className="text-lg font-extrabold text-emerald-400">
                {t.kpiGovVal}
              </span>
            </div>
          </div>

        </div>

        {/* Tab Navigation 2-Line Wrapped Bar */}
        <div className="glass-panel p-3 rounded-2xl border border-slate-800/80 shadow-xl">
          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/90 bg-slate-900/40 border border-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-slate-950/25 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Tab Contents */}
        <div className="transition-all duration-300">
          {activeTab === 'crop-doctor' && <CropDoctor lang={lang} />}
          {activeTab === 'fertilizer' && <FertilizerCalculator lang={lang} />}
          {activeTab === 'water-spray' && <WaterAndSprayGuide lang={lang} />}
          {activeTab === 'voice' && <VoiceAssistant lang={lang} />}
          {activeTab === 'disaster' && <DisasterRadar lang={lang} />}
          {activeTab === 'market' && <MarketPrices lang={lang} />}
          {activeTab === 'outbreak' && <CommunityHeatmap lang={lang} />}
          {activeTab === 'helpline' && <HelplineDirectory lang={lang} />}
          {activeTab === 'security' && <SecurityConsole lang={lang} />}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 glass-panel py-6 px-4 text-center text-xs text-slate-500 space-y-2 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">{t.brandName}</span>
            <span>•</span>
            <span>{t.footerRights}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>{t.footerTrack}</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{t.footerSecurity}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
