import React, { useState } from 'react';
import { Calculator, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { CROP_FERTILIZER_GUIDELINES } from '../data/agronomyData';
import { toLocalNum } from '../data/translations';
import { speechService } from '../services/speechService';

export default function FertilizerCalculator({ lang }) {
  const [selectedCrop, setSelectedCrop] = useState(CROP_FERTILIZER_GUIDELINES[0]);
  const [landUnit, setLandUnit] = useState('bigha');
  const [landAmount, setLandAmount] = useState(1);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const getDecimals = () => {
    const val = parseFloat(landAmount) || 0;
    if (landUnit === 'decimal') return val;
    if (landUnit === 'bigha') return val * 33;
    if (landUnit === 'katha') return val * 1.65;
    if (landUnit === 'acre') return val * 100;
    return val;
  };

  const totalDecimals = getDecimals();

  const seedsKg = (totalDecimals * selectedCrop.seedsPerDecimalKg).toFixed(2);
  const ureaKg = (totalDecimals * selectedCrop.ureaKg).toFixed(1);
  const tspKg = (totalDecimals * selectedCrop.tspKg).toFixed(1);
  const mopKg = (totalDecimals * selectedCrop.mopKg).toFixed(1);
  const gypsumKg = (totalDecimals * selectedCrop.gypsumKg).toFixed(1);
  const zincKg = (totalDecimals * selectedCrop.zincKg).toFixed(2);
  const compostKg = Math.round(totalDecimals * selectedCrop.compostKg);

  const handleToggleVoice = () => {
    if (isPlayingVoice) {
      speechService.stopSpeaking();
      setIsPlayingVoice(false);
      return;
    }

    const text = lang === 'bn'
      ? `${landAmount} ${landUnit === 'bigha' ? 'বিঘা' : landUnit === 'acre' ? 'একর' : 'শতক'} জমিতে ${selectedCrop.nameBn} চাষের জন্য ইউরিয়া লাগবে ${toLocalNum(ureaKg, 'bn')} কেজি, টিএসপি ${toLocalNum(tspKg, 'bn')} কেজি, পটাশ ${toLocalNum(mopKg, 'bn')} কেজি, এবং বীজ লাগবে ${toLocalNum(seedsKg, 'bn')} কেজি। ইউরিয়া ৩ কিস্তিতে প্রয়োগ করুন।`
      : `For ${landAmount} ${landUnit} of ${selectedCrop.nameEn}, required fertilizers: Urea ${ureaKg} kg, TSP ${tspKg} kg, Potash ${mopKg} kg, and seed ${seedsKg} kg. Split urea into 3 applications.`;

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
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 relative overflow-hidden bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'জমি, বীজ ও সুষম সার ক্যালকুলেটর' : 'Precision Land, Seed & Fertilizer Dosage Engine'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                SDG 2: Zero Hunger & SDG 12
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'জমির পরিমাপ অনুযায়ী সঠিক সারের হিসাব' : 'Precise Agro-Input & Balanced Nutrition Calculator'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {lang === 'bn'
                ? 'আপনার জমির পরিমাণ দিন। এআই সরকারি কৃষি গবেষণা কাউন্সিলের (BARC) মানদণ্ড অনুযায়ী বীজ, ইউরিয়া, টিএসপি ও পটাশের সঠিক মাত্রা হিসাব করে দেবে।'
                : 'Input your farm acreage. AI calculates certified seed requirements and scientific NPK fertilizer ratios to maximize yield and prevent soil degradation.'}
            </p>
          </div>

          {/* Voice Toggle Button (ON / OFF) */}
          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all self-start md:self-auto active:scale-95 shadow-md ${
              isPlayingVoice
                ? 'bg-red-600 hover:bg-red-500 text-white border-red-400 animate-pulse shadow-red-950/50'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40'
            }`}
          >
            {isPlayingVoice ? (
              <>
                <VolumeX className="w-4 h-4 text-white" />
                <span>{lang === 'bn' ? 'ভয়েস বন্ধ করুন (Voice OFF)' : 'Stop Voice (Voice OFF)'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>{lang === 'bn' ? 'ভয়েস শুনুন (Voice ON)' : 'Listen Dosage Report (Voice ON)'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Input Selector Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? '১. ফসল নির্বাচন করুন:' : '1. Select Crop Variety:'}
            </label>
            <select
              value={selectedCrop.id}
              onChange={(e) => setSelectedCrop(CROP_FERTILIZER_GUIDELINES.find(c => c.id === e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:border-emerald-500"
            >
              {CROP_FERTILIZER_GUIDELINES.map((crop) => (
                <option key={crop.id} value={crop.id} className="bg-slate-900 text-white">
                  {lang === 'bn' ? crop.nameBn : crop.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Land Unit */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? '২. জমির একক:' : '2. Land Measurement Unit:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'bigha', labelBn: 'বিঘা (৩৩ শতক)', labelEn: 'Bigha (33 dec)' },
                { id: 'decimal', labelBn: 'শতক / ডেসিমাল', labelEn: 'Decimal (Shatak)' },
                { id: 'acre', labelBn: 'একর (১০০ শতক)', labelEn: 'Acre (100 dec)' },
                { id: 'katha', labelBn: 'কাঠা (১.৬৫ শতক)', labelEn: 'Katha (1.65 dec)' }
              ].map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setLandUnit(unit.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                    landUnit === unit.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  {lang === 'bn' ? unit.labelBn : unit.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Land Quantity Input */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? '৩. জমির পরিমাণ লিখুন:' : '3. Total Land Area:'}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={landAmount}
                onChange={(e) => setLandAmount(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-extrabold text-white outline-none focus:border-emerald-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400">
                {landUnit === 'bigha' ? (lang === 'bn' ? 'বিঘা' : 'Bigha') : landUnit === 'acre' ? (lang === 'bn' ? 'একর' : 'Acre') : (lang === 'bn' ? 'শতক' : 'Dec')}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {lang === 'bn' ? `মোট আয়তন: ${toLocalNum(totalDecimals.toFixed(1), 'bn')} শতক` : `Equivalent area: ${totalDecimals.toFixed(1)} decimals`}
            </span>
          </div>

        </div>
      </div>

      {/* Calculated Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Seed */}
        <div className="p-4 rounded-xl glass-panel border border-emerald-500/30">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'bn' ? 'প্রয়োজনীয় বীজ:' : 'Required Seeds:'}
          </span>
          <span className="text-xl font-extrabold text-emerald-400">
            {toLocalNum(seedsKg, lang)} <span className="text-xs font-normal text-slate-300">{lang === 'bn' ? 'কেজি' : 'kg'}</span>
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">
            {lang === 'bn' ? 'উন্নত প্রত্যয়িত বীজ' : 'Certified Seeds'}
          </span>
        </div>

        {/* Urea */}
        <div className="p-4 rounded-xl glass-panel border border-teal-500/30">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'bn' ? 'ইউরিয়া (Urea):' : 'Urea (N):'}
          </span>
          <span className="text-xl font-extrabold text-teal-300">
            {toLocalNum(ureaKg, lang)} <span className="text-xs font-normal text-slate-300">{lang === 'bn' ? 'কেজি' : 'kg'}</span>
          </span>
          <span className="text-[10px] text-teal-400/80 block mt-1">
            {lang === 'bn' ? '৩ কিস্তিতে সমান ভাগ' : '3 Split Doses'}
          </span>
        </div>

        {/* TSP */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'bn' ? 'টিএসপি (TSP/DAP):' : 'TSP / DAP (P):'}
          </span>
          <span className="text-xl font-extrabold text-white">
            {toLocalNum(tspKg, lang)} <span className="text-xs font-normal text-slate-300">{lang === 'bn' ? 'কেজি' : 'kg'}</span>
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">
            {lang === 'bn' ? 'জমি তৈরির শেষ চাষে' : 'Basal application'}
          </span>
        </div>

        {/* MOP */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'bn' ? 'পটাশ (MoP):' : 'Potash (K):'}
          </span>
          <span className="text-xl font-extrabold text-white">
            {toLocalNum(mopKg, lang)} <span className="text-xs font-normal text-slate-300">{lang === 'bn' ? 'কেজি' : 'kg'}</span>
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">
            {lang === 'bn' ? 'অর্ধেক শুরুতে, বাকি থোড়ে' : '50% Basal + 50% Panicle'}
          </span>
        </div>

        {/* Gypsum */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'bn' ? 'জিপসাম (Gypsum):' : 'Gypsum (S):'}
          </span>
          <span className="text-xl font-extrabold text-white">
            {toLocalNum(gypsumKg, lang)} <span className="text-xs font-normal text-slate-300">{lang === 'bn' ? 'কেজি' : 'kg'}</span>
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">
            {lang === 'bn' ? 'সালফারের ঘাটতি পূরণ' : 'Sulfur enrichment'}
          </span>
        </div>

        {/* Compost */}
        <div className="p-4 rounded-xl glass-panel border border-amber-500/30">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'bn' ? 'জৈব সার/গোবর:' : 'Organic Compost:'}
          </span>
          <span className="text-xl font-extrabold text-amber-300">
            {toLocalNum(compostKg, lang)} <span className="text-xs font-normal text-slate-300">{lang === 'bn' ? 'কেজি' : 'kg'}</span>
          </span>
          <span className="text-[10px] text-amber-400/80 block mt-1">
            {lang === 'bn' ? 'মাটির জৈব স্বাস্থ্য রক্ষা' : 'Soil Organic Matter'}
          </span>
        </div>

      </div>

      {/* Fertilizer Application Timing & Schedule */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'bn' ? 'সার প্রয়োগের সঠিক বৈজ্ঞানিক সময়সূচি (BARC স্ট্যান্ডার্ড)' : 'Scientific Fertilizer Application Timeline (BARC Standard)'}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400 block text-sm">
              {lang === 'bn' ? '১. জমি তৈরির সময় (শেষ চাষে)' : '1. Basal Dose (Final Ploughing)'}
            </span>
            <p className="text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? `সম্পূর্ণ টিএসপি (${toLocalNum(tspKg, 'bn')} কেজি), জিপসাম (${toLocalNum(gypsumKg, 'bn')} কেজি), জৈব সার ও ৫০% পটাশ মাটির সাথে মিশিয়ে দিন।`
                : `Apply 100% TSP (${tspKg} kg), Gypsum (${gypsumKg} kg), all organic compost, and 50% Potash.`}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-teal-300 block text-sm">
              {lang === 'bn' ? '২. ১ম ও ২য় কিস্তি (কুশি গজানো)' : '2. 1st & 2nd Split (Vegetative)'}
            </span>
            <p className="text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? `রোপণের ১৫-২০ দিন পর ১ম কিস্তি ইউরিয়া (${toLocalNum((ureaKg/3).toFixed(1), 'bn')} কেজি) এবং ৩৫-৪০ দিন পর ২য় কিস্তি প্রয়োগ করুন।`
                : `Apply 1st third of Urea (${(ureaKg/3).toFixed(1)} kg) at 15-20 DAT and 2nd third at 35-40 DAT.`}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-300 block text-sm">
              {lang === 'bn' ? '৩. শেষ কিস্তি (ফুল/থোড় আসার আগে)' : '3. Final Split (Pre-flowering)'}
            </span>
            <p className="text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? `থোড় আসার ৫-৭ দিন আগে বাকি ইউরিয়া ও অবশিষ্ট ৫০% পটাশ সার জমিতে স্যাঁতসেঁতে অবস্থায় ছিটান।`
                : `Apply final third of Urea with remaining 50% Potash 5-7 days before panicle initiation under moist soil.`}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
