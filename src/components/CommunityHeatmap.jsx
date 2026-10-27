import React, { useState } from 'react';
import { Radio, MapPin, EyeOff } from 'lucide-react';
import { OUTBREAK_HOTSPOTS } from '../data/agriData';
import { toLocalNum } from '../data/translations';

export default function CommunityHeatmap({ lang }) {
  const [selectedHotspot, setSelectedHotspot] = useState(OUTBREAK_HOTSPOTS[0]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/20 relative overflow-hidden bg-gradient-to-r from-red-950/20 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/30 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" />
                {lang === 'bn' ? 'কমিউনিটি এপিডেমিক ও ফসল রোগ রাডার' : 'Community Outbreak Radar & Epidemic Warning'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                SDG 2: Food Security
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'আঞ্চলিক ফসলের মহামারী আগাম প্রতিরোধ' : 'Hyperlocal Crop Disease Containment Network'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {lang === 'bn'
                ? 'আশেপাশের জমিতে কোনো রোগ ছড়ালে সঙ্গে সঙ্গে নিকটবর্তী কৃষকদের সতর্কবার্তা পাঠানো হয় যাতে রোগ ছড়িয়ে পড়ার আগেই প্রতিরোধমূলক ব্যবস্থা নেওয়া যায়।'
                : 'Aggregates anonymized leaf scan telemetry to alert neighboring farmers within a 15km perimeter before fungal spores spread.'}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <EyeOff className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'জিপিএস গোপনীয়তা ফাজড (২.৫ কিমি)' : 'GPS Privacy Fuzzed (2.5km)'}</span>
          </div>
        </div>
      </div>

      {/* Grid of Hotspots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {OUTBREAK_HOTSPOTS.map((spot) => {
          const isSelected = selectedHotspot.id === spot.id;
          return (
            <div
              key={spot.id}
              onClick={() => setSelectedHotspot(spot)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'glass-panel-glow border-red-500/60 shadow-lg'
                  : 'glass-panel border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" />
                  {lang === 'bn' ? spot.districtBn : spot.districtEn}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  spot.riskPct > 80
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {toLocalNum(spot.riskPct, lang)}% {lang === 'bn' ? 'ঝুঁকি' : 'Risk'}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-2">
                {lang === 'bn' ? spot.diseaseBn : spot.diseaseEn}
              </h4>

              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">{lang === 'bn' ? 'আক্রান্ত জমি/খামার:' : 'Affected Farms:'}</span>
                  <span className="font-bold text-red-300">{toLocalNum(spot.affectedFarms, lang)} {lang === 'bn' ? 'টি' : 'farms'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{lang === 'bn' ? 'বর্তমান অবস্থা:' : 'Status:'}</span>
                  <span className="font-bold text-amber-300">{lang === 'bn' ? spot.statusBn : spot.statusEn}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Outbreak Deep-Dive */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              {lang === 'bn' ? 'মহামারী নিয়ন্ত্রণ ও প্রতিরোধ ব্যবস্থা' : 'Active Epidemic Quarantine Zone'}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {lang === 'bn' ? selectedHotspot.districtBn : selectedHotspot.districtEn} — {lang === 'bn' ? selectedHotspot.diseaseBn : selectedHotspot.diseaseEn}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-bold text-red-400">{lang === 'bn' ? selectedHotspot.statusBn : selectedHotspot.statusEn}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">
              {lang === 'bn' ? 'বিপদগ্রস্ত ভৌগোলিক এলাকা:' : 'Containment Radius:'}
            </span>
            <span className="text-lg font-bold text-white">
              {lang === 'bn' ? '১২ কিমি পরিধি' : '12 km Radius'}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              {lang === 'bn' ? 'পাশের সব ইউনিয়নের কৃষকদের স্বয়ংক্রিয় পুশ অ্যালার্ট পাঠানো হয়েছে' : 'Automated SMS blast broadcasted to perimeter'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">
              {lang === 'bn' ? 'প্রস্তুতকৃত জৈব প্রতিষেধক মজুদ:' : 'Bio-Control Stockpiled:'}
            </span>
            <span className="text-lg font-bold text-emerald-400">
              {lang === 'bn' ? '১,২০০ লিটার বোর্দো ও নিম নির্যাস' : '1,200L Bordeaux & Neem Extract'}
            </span>
            <p className="text-[11px] text-emerald-500 mt-1">
              {lang === 'bn' ? 'উপজেলা কৃষি অফিসের মাধ্যমে বিতরণ কার্যক্রম চালু' : 'Zero-cost distribution via Upazila Extension Office'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">
              {lang === 'bn' ? 'কৃষক তথ্য নিরাপত্তা শিল্ড:' : 'Farmer Privacy Shield:'}
            </span>
            <span className="text-lg font-bold text-teal-300">
              {lang === 'bn' ? '১০০% পরিচয় সুরক্ষিত' : '100% Anonymized'}
            </span>
            <p className="text-[11px] text-teal-400 mt-1">
              {lang === 'bn' ? 'কোনো কৃষকের ব্যক্তিগত ফোন নম্বর বা নাম প্রকাশ করা হয় না' : 'Zero individual PII published or monetized'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
