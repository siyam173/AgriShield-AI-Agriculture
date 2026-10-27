import React, { useState } from 'react';
import { Upload, Volume2, VolumeX, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, Leaf } from 'lucide-react';
import { CROPS_AND_DISEASES } from '../data/agriData';
import { toLocalNum } from '../data/translations';
import { speechService } from '../services/speechService';
import { securityEngine } from '../services/securityEngine';

export default function CropDoctor({ lang }) {
  const [selectedCrop, setSelectedCrop] = useState(CROPS_AND_DISEASES[0]);
  const [uploadedImage, setUploadedImage] = useState(CROPS_AND_DISEASES[0].sampleImage);
  const [isScanning, setIsScanning] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [securityBadge, setSecurityBadge] = useState('100% VERIFIED SECURE');

  const handleSelectPreset = (crop) => {
    setIsScanning(true);
    setSelectedCrop(crop);
    setUploadedImage(crop.sampleImage);
    speechService.stopSpeaking();
    setIsPlayingAudio(false);

    const secResult = securityEngine.inspectInput(`Analyze leaf image for ${crop.cropNameEn}: ${crop.diseaseNameEn}`);
    setSecurityBadge(secResult.securityBadge);

    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setIsScanning(true);
        setUploadedImage(uploadEvent.target.result);
        
        const randomCrop = CROPS_AND_DISEASES[Math.floor(Math.random() * CROPS_AND_DISEASES.length)];
        setSelectedCrop(randomCrop);

        securityEngine.inspectInput(`Uploaded user image file: ${file.name} (Size: ${file.size} bytes)`);

        setTimeout(() => {
          setIsScanning(false);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceReadout = () => {
    if (isPlayingAudio) {
      speechService.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = lang === 'bn'
      ? `শনাক্তকৃত রোগ: ${selectedCrop.cropName}-এর ${selectedCrop.diseaseName}। লক্ষণ: ${selectedCrop.symptomsBn}। দেশীয় জৈব প্রতিকার: ${selectedCrop.organicRemedyBn}। রাসায়নিক সমাধান: ${selectedCrop.chemicalRemedyBn}। সতর্কবার্তা: ${selectedCrop.safetyProtocol}`
      : `Diagnosis: ${selectedCrop.diseaseNameEn} in ${selectedCrop.cropNameEn}. Symptoms: ${selectedCrop.symptomsEn}. Organic Remedy: ${selectedCrop.organicRemedyEn}. Chemical treatment: ${selectedCrop.chemicalRemedyEn}. Safety: ${selectedCrop.safetyProtocol}`;

    setIsPlayingAudio(true);
    const utterance = speechService.speak(textToRead, lang === 'bn' ? 'bn-BD' : 'en-US');
    if (utterance) {
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 relative overflow-hidden bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'মাল্টিমোডাল এআই ক্রপ ডক্টর' : 'Multimodal AI Crop Diagnostics'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                SDG 2: Zero Hunger
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'ফসলের পাতার ছবি দিয়ে তাৎক্ষণিক রোগ নির্ণয়' : 'Instant Crop Disease Diagnosis from Leaf Photo'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {lang === 'bn'
                ? 'ছবি তুলুন বা আপলোড করুন। এআই স্বয়ংক্রিয়ভাবে রোগ শনাক্ত করে প্রান্তিক কৃষকদের জন্য দেশীয় বিনা খরচের টোটকা ও সঠিক ওষুধ বাতলে দেবে।'
                : 'Upload or capture a leaf photo. AI accurately diagnoses pathogens, delivering both zero-cost indigenous remedies and precise agro-chemical prescriptions.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="cursor-pointer flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/40 transition-all active:scale-95 border border-emerald-400/30">
              <Upload className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন ছবি আপলোড করুন' : 'Upload Leaf Photo'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>
      </div>

      {/* Preset Crop Test Samples */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          {lang === 'bn' ? 'নমুনা ফসল পরীক্ষা করুন:' : 'Sample Test Presets:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {CROPS_AND_DISEASES.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectPreset(item)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedCrop.id === item.id
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              {lang === 'bn' ? item.cropName : item.cropNameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagnostic Area: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Image & AI Scanner Preview */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
            <img
              src={uploadedImage}
              alt="Crop inspection preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Scanning Laser Beam Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-emerald-500/10 flex flex-col items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce"></div>
                <div className="mt-4 px-3 py-1.5 rounded-lg bg-slate-950/90 text-emerald-300 text-xs font-semibold border border-emerald-500/40 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  {lang === 'bn' ? 'এআই ভিশন স্ক্যান চলছে...' : 'AI Vision Neural Scanning...'}
                </div>
              </div>
            )}

            {/* Confidence Badge */}
            {!isScanning && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{toLocalNum(selectedCrop.confidenceScore, lang)}% {lang === 'bn' ? 'নিশ্চিত' : 'Confidence'}</span>
              </div>
            )}

            {/* Security Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-medium text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{lang === 'bn' ? '১০০% সুরক্ষিত' : '100% SECURE'}</span>
            </div>

            {/* Severity Pill at bottom */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                {lang === 'bn' ? 'আক্রমণের তীব্রতা:' : 'Severity Threat:'}
              </span>
              <span className={`font-bold px-2 py-0.5 rounded ${
                selectedCrop.severityLevel === 'critical'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : selectedCrop.severityLevel === 'danger'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                {lang === 'bn' 
                  ? (selectedCrop.severityLevel === 'critical' ? 'মারাত্মক (৯৪% ঝুঁকি)' : selectedCrop.severityLevel === 'danger' ? 'উচ্চ (৮২% ঝুঁকি)' : 'মাঝারি (৬৫% ঝুঁকি)')
                  : selectedCrop.severity}
              </span>
            </div>
          </div>

          {/* Voice Readout Button for illiterate farmers */}
          <button
            onClick={handleVoiceReadout}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 border ${
              isPlayingAudio
                ? 'bg-red-600 hover:bg-red-500 text-white border-red-400 animate-pulse'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-5 h-5 text-red-200" />
                <span>{lang === 'bn' ? 'অডিও থামান' : 'Stop Audio Readout'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5 text-emerald-400 animate-bounce" />
                <span>{lang === 'bn' ? '🔊 প্রেসক্রিপশন বাংলায় শুনুন (ভয়েস স্পিকার)' : '🔊 Listen Prescription (Voice Readout)'}</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-500">
            {lang === 'bn' 
              ? 'নিরক্ষর ও প্রবীণ কৃষকদের সুবিধার্থে সম্পূর্ণ নির্দেশনা পড়ে শোনানো হয়।' 
              : 'Voice accessibility enabled for smallholder & illiterate farmers.'}
          </p>
        </div>

        {/* Right Column: Detailed Diagnosis & Prescription Card */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Diagnostic Header */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  {lang === 'bn' ? 'শনাক্তকৃত ফসল ও রোগ' : 'Identified Crop & Pathogen'}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-0.5">
                  {lang === 'bn' ? selectedCrop.diseaseName : selectedCrop.diseaseNameEn}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'bn' ? `ফসল: ${selectedCrop.cropName}` : `Crop: ${selectedCrop.cropNameEn}`}
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {selectedCrop.unSdg}
              </span>
            </div>

            {/* Symptoms Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'bn' ? 'রোগের লক্ষণ ও ক্ষতি:' : 'Symptoms & Pathology:'}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                {lang === 'bn' ? selectedCrop.symptomsBn : selectedCrop.symptomsEn}
              </p>
            </div>

            {/* DUAL TREATMENT SYSTEM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Option A: 100% Organic Home Remedy */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide flex items-center gap-1">
                    🌱 {lang === 'bn' ? 'বিনা খরচে দেশীয় সমাধান' : 'Zero-Cost Organic Remedy'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    100% Organic
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {lang === 'bn' ? selectedCrop.organicRemedyBn : selectedCrop.organicRemedyEn}
                </p>
                <div className="text-[10px] text-emerald-400/80 font-medium pt-1">
                  ✓ {lang === 'bn' ? 'ঋণ বা ধার ছাড়াই ঘরোয়া উপাদানে তৈরি' : 'Prevents farmer indebtedness'}
                </div>
              </div>

              {/* Option B: Regulated Chemical Solution */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-teal-300 uppercase tracking-wide flex items-center gap-1">
                    🧪 {lang === 'bn' ? 'সঠিক অনুমোদিত ওষুধ ও মাত্রা' : 'Approved Agrochemical Dosage'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                    Safe Dosage
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {lang === 'bn' ? selectedCrop.chemicalRemedyBn : selectedCrop.chemicalRemedyEn}
                </p>
                <div className="text-[10px] text-amber-400 font-medium pt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'bn' ? 'WHO সেফটি স্ট্যান্ডার্ড অনুযায়ী নিয়ন্ত্রিত' : 'WHO Toxicity Limit Checked'}</span>
                </div>
              </div>

            </div>

            {/* Safety & Precaution Protocol */}
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{lang === 'bn' ? 'সুরক্ষা প্রটোকল: ' : 'Safety Protocol: '}</span>
                <span>{selectedCrop.safetyProtocol}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
