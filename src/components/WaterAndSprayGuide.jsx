import React, { useState } from 'react';
import { Droplet, Waves, AlertTriangle, Volume2, VolumeX } from 'lucide-react';
import { CROP_FERTILIZER_GUIDELINES } from '../data/agronomyData';
import { toLocalNum } from '../data/translations';
import { speechService } from '../services/speechService';

export default function WaterAndSprayGuide({ lang }) {
  const [selectedCrop, setSelectedCrop] = useState(CROP_FERTILIZER_GUIDELINES[0]);
  const [sprayerSizeLiters, setSprayerSizeLiters] = useState(16);
  const [targetProblem, setTargetProblem] = useState('fungus');
  const [landAreaBigha, setLandAreaBigha] = useState(1);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const problemSpecs = {
    fungus: {
      nameBn: 'ছত্রাক ও ব্লাইট রোগ (Fungal Blight/Blast)',
      nameEn: 'Fungal Blight & Blast Pathogen',
      ratioPerLiterGrams: 2.0,
      medNameBn: 'ম্যানকোজেব বা ট্রাইসাইক্লাজোল',
      medNameEn: 'Mancozeb 75 WP or Tricyclazole',
      safetyTipBn: 'কুয়াশা কেটে যাওয়ার পর বিকেলে স্প্রে করুন। বৃষ্টির আশঙ্কা থাকলে স্প্রে করবেন না।',
      safetyTipEn: 'Spray late afternoon after fog lifts. Do not apply if rainfall is imminent.'
    },
    insect: {
      nameBn: 'মাজরা বা লেদা পোকা (Stem Borer / Armyworm)',
      nameEn: 'Stem Borer & Chewing Insects',
      ratioPerLiterGrams: 0.5,
      medNameBn: 'এমামেকটিন বেনজোয়েট বা ইমিডাক্লোপ্রিড',
      medNameEn: 'Emamectin Benzoate 5 SG',
      safetyTipBn: 'গাছের গোড়া ও পাতার নিচে ভালোভাবে স্প্রে পৌঁছাতে হবে। সকালে মৌমাছি চলাচলের সময় বন্ধ রাখুন।',
      safetyTipEn: 'Target leaf undersides and stem base. Avoid early morning when bees are active.'
    },
    nutrient: {
      nameBn: 'জিংক ও বোরন পুষ্টি ঘাটতি (Micronutrient Deficiency)',
      nameEn: 'Zinc & Boron Foliar Spray',
      ratioPerLiterGrams: 1.5,
      medNameBn: 'চিলেটেড জিংক ও সলোবর বোরন',
      medNameEn: 'Chelated Zinc & Solubor Boron',
      safetyTipBn: 'সকালে হালকা রোদের সময় স্প্রে করলে পাতা দ্রুত শোষণ করতে পারে।',
      safetyTipEn: 'Apply in morning under mild sunlight for maximum leaf absorption.'
    }
  };

  const currentSpec = problemSpecs[targetProblem];
  const medicinePerTank = (sprayerSizeLiters * currentSpec.ratioPerLiterGrams).toFixed(1);
  const totalSprayLitersNeeded = (landAreaBigha * 60).toFixed(0);
  const totalTanksNeeded = Math.ceil(totalSprayLitersNeeded / sprayerSizeLiters);

  const handleToggleVoice = () => {
    if (isPlayingVoice) {
      speechService.stopSpeaking();
      setIsPlayingVoice(false);
      return;
    }

    const text = lang === 'bn'
      ? `${selectedCrop.nameBn} ফসলের সেচ পরামর্শ: ${selectedCrop.waterStageBn}। ${currentSpec.nameBn} দমনে প্রতি ${toLocalNum(sprayerSizeLiters, 'bn')} লিটার স্প্রে মেশিনে ${toLocalNum(medicinePerTank, 'bn')} গ্রাম বা মিলি ${currentSpec.medNameBn} গুলে নিন। ১ বিঘা জমিতে প্রায় ${toLocalNum(totalTanksNeeded, 'bn')} ঢোপ পানি স্প্রে করতে হবে।`
      : `Irrigation guidance for ${selectedCrop.nameEn}: ${selectedCrop.waterStageEn}. For ${currentSpec.nameEn}, mix ${medicinePerTank}g of ${currentSpec.medNameEn} per ${sprayerSizeLiters}L spray tank. Approximately ${totalTanksNeeded} tanks needed per bigha.`;

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
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 relative overflow-hidden bg-gradient-to-r from-cyan-950/20 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'পানি ব্যবস্থাপনা ও ওষুধ মিশ্রণ গাইড' : 'Irrigation Hydrology & Spray Dilution Protocol'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                SDG 6: Clean Water & SDG 12
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'ফসলে পানির পরিমাণ ও রোগ দমনে স্প্রে হিসাব' : 'Precision Water Levels & Spray Dilution Ratios'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {lang === 'bn'
                ? 'কোন ফসলে কোন সময় কতটুকু পানি রাখতে হবে এবং স্প্রে মেশিনের ট্যাঙ্কে সঠিক কতটুকু ওষুধ ও পানি মেশাতে হবে তার নির্ভুল গাইড।'
                : 'Exact standing water depth schedules across growth phases and calibrated sprayer dilution metrics to prevent chemical toxicity.'}
            </p>
          </div>

          {/* Voice Toggle Button (ON / OFF) */}
          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all self-start md:self-auto active:scale-95 shadow-md ${
              isPlayingVoice
                ? 'bg-red-600 hover:bg-red-500 text-white border-red-400 animate-pulse shadow-red-950/50'
                : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-cyan-950/40'
            }`}
          >
            {isPlayingVoice ? (
              <>
                <VolumeX className="w-4 h-4 text-white" />
                <span>{lang === 'bn' ? 'ভয়েস বন্ধ করুন (Voice OFF)' : 'Stop Voice (Voice OFF)'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>{lang === 'bn' ? 'পরামর্শ শুনুন (Voice ON)' : 'Listen Water Guide (Voice ON)'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Crop Selector & Standing Water Depth Phase */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'ফসল নির্বাচন করুন:' : 'Select Crop for Irrigation Guidelines:'}
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {CROP_FERTILIZER_GUIDELINES.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedCrop.id === crop.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  {lang === 'bn' ? crop.nameBn : crop.nameEn}
                </button>
              ))}
            </div>
          </div>
          
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'bn' ? `মোট সেচ চক্র: ${toLocalNum(selectedCrop.irrigationCycles, 'bn')} বার` : `Irrigation Cycles: ${selectedCrop.irrigationCycles} times`}</span>
          </div>
        </div>

        {/* Standing Water Depth Description */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-slate-900 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-extrabold text-white">
              {lang === 'bn' ? 'জমিতে পানির উচ্চতা ও সঠিক সময়সূচি:' : 'Standing Water Depth & Stage Protocol:'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
            {lang === 'bn' ? selectedCrop.waterStageBn : selectedCrop.waterStageEn}
          </p>
        </div>
      </div>

      {/* Interactive Spray Dilution Calculator */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
            {lang === 'bn' ? 'রোগ বা পোকা দমনে স্প্রে দ্রবণ ক্যালকুলেটর' : 'Interactive Spray Dilution & Tank Calculator'}
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            {lang === 'bn' ? 'স্প্রে মেশিনের মাপ অনুযায়ী সঠিক ওষুধের হিসাব' : 'Precise Chemical & Water Mixing Metrics'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Issue Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? '১. সমস্যার ধরন নির্বাচন করুন:' : '1. Target Pathology/Pest:'}
            </label>
            <select
              value={targetProblem}
              onChange={(e) => setTargetProblem(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-bold outline-none focus:border-cyan-400"
            >
              <option value="fungus">{lang === 'bn' ? 'ছত্রাক, ব্লাইট বা পচা রোগ' : 'Fungal Blight / Blast'}</option>
              <option value="insect">{lang === 'bn' ? 'মাজরা, লেদা বা মাছি পোকা' : 'Stem Borer / Armyworm / Whitefly'}</option>
              <option value="nutrient">{lang === 'bn' ? 'জিংক বা বোরনের পুষ্টি ঘাটতি' : 'Micronutrient Foliar Spray'}</option>
            </select>
          </div>

          {/* Sprayer Tank Size */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? '২. স্প্রে মেশিনের ধারণক্ষমতা:' : '2. Sprayer Tank Capacity:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { liters: 16, labelBn: '১৬ লিটার (স্ট্যান্ডার্ড)', labelEn: '16 L (Standard)' },
                { liters: 10, labelBn: '১০ লিটার (মাঝারি)', labelEn: '10 L (Medium)' },
                { liters: 5, labelBn: '৫ লিটার (ছোট)', labelEn: '5 L (Compact)' }
              ].map((item) => (
                <button
                  key={item.liters}
                  onClick={() => setSprayerSizeLiters(item.liters)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    sprayerSizeLiters === item.liters
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  {item.liters} L
                </button>
              ))}
            </div>
          </div>

          {/* Land Area */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? '৩. জমির আয়তন (বিঘা):' : '3. Land Area (Bigha):'}
            </label>
            <input
              type="number"
              min="0.25"
              step="0.25"
              value={landAreaBigha}
              onChange={(e) => setLandAreaBigha(Math.max(0.1, parseFloat(e.target.value) || 1))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-base text-white font-bold outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Calculation Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/40">
            <span className="text-xs text-slate-400 block mb-1">
              {lang === 'bn' ? `প্রতি ${toLocalNum(sprayerSizeLiters, 'bn')} লিটার পানিতে মেশাতে হবে:` : `Dosage per ${sprayerSizeLiters}L Tank:`}
            </span>
            <span className="text-2xl font-extrabold text-cyan-400">
              {toLocalNum(medicinePerTank, lang)} <span className="text-sm font-normal text-slate-300">{lang === 'bn' ? 'গ্রাম বা মিলি' : 'g / mL'}</span>
            </span>
            <p className="text-[11px] text-cyan-300/80 mt-1 font-medium">
              {lang === 'bn' ? currentSpec.medNameBn : currentSpec.medNameEn}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">
              {lang === 'bn' ? 'মোট কত ঢোপ স্প্রে লাগবে:' : 'Total Sprayer Tanks Needed:'}
            </span>
            <span className="text-2xl font-extrabold text-white">
              {toLocalNum(totalTanksNeeded, lang)} <span className="text-sm font-normal text-slate-300">{lang === 'bn' ? 'ঢোপ / ট্যাঙ্ক' : 'Tanks'}</span>
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              {lang === 'bn' ? `মোট প্রায় ${toLocalNum(totalSprayLitersNeeded, 'bn')} লিটার পানি প্রয়োজন` : `~${totalSprayLitersNeeded}L spray solution required`}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'স্প্রে করার সঠিক নিয়ম:' : 'Application Safety Rules:'}</span>
            </div>
            <p className="leading-relaxed">
              {lang === 'bn' ? currentSpec.safetyTipBn : currentSpec.safetyTipEn}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
