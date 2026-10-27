import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Store, Scale } from 'lucide-react';
import { COMMODITY_MARKET_PRICES } from '../data/agriData';
import { toLocalNum } from '../data/translations';

export default function MarketPrices({ lang }) {
  const [selectedCrop, setSelectedCrop] = useState(COMMODITY_MARKET_PRICES[0]);
  const [farmerQuantity, setFarmerQuantity] = useState(10);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-teal-500/20 relative overflow-hidden bg-gradient-to-r from-teal-950/20 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-500/30 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'ন্যায্য বাজারদর ও মিডলম্যান প্রতিরোধ' : 'Fair-Price Intelligence & Middleman Shield'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                SDG 1: No Poverty
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'কৃষকের উৎপাদিত ফসলের সঠিক মূল্য সুরক্ষা' : 'Protecting Smallholder Farmgate Incomes'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {lang === 'bn'
                ? 'দালাল বা মধ্যস্বত্বভোগীদের ঠকানো রোধ করতে দেশের প্রধান পাইকারি মোকামের বাস্তব দর জানুন এবং নিজের ফসলের আসল মূল্য দাবি করুন।'
                : 'Empowering farmers with transparent wholesale price indices across national wholesale hubs to prevent middlemen exploitation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Commodity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMMODITY_MARKET_PRICES.map((item, idx) => {
          const isSelected = selectedCrop.itemBn === item.itemBn;
          return (
            <div
              key={idx}
              onClick={() => setSelectedCrop(item)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'glass-panel-glow border-teal-400/60 shadow-lg'
                  : 'glass-panel border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Store className="w-3 h-3 text-teal-400" />
                  {lang === 'bn' ? item.locationBn : item.locationEn}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  {item.marketTrend === 'up' ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  ) : item.marketTrend === 'down' ? (
                    <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                  ) : (
                    <Minus className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  {item.marketTrend.toUpperCase()}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-2">
                {lang === 'bn' ? item.itemBn : item.itemEn}
              </h4>

              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">{lang === 'bn' ? 'পাইকারি বাজার দর:' : 'Wholesale Market:'}</span>
                  <span className="font-bold text-emerald-300">{item.wholesalePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{lang === 'bn' ? 'কৃষকের ন্যায্য দর:' : 'Fair Farmgate:'}</span>
                  <span className="font-bold text-teal-200">{item.fairFarmgatePrice}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Fair Income Calculator */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-teal-400" />
            <span>{lang === 'bn' ? 'ন্যায্য বিক্রয়মূল্য ক্যালকুলেটর' : 'Fair Revenue & Anti-Exploitation Calculator'}</span>
          </h3>
          <span className="text-xs text-slate-400">{lang === 'bn' ? selectedCrop.itemBn : selectedCrop.itemEn}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'উৎপাদিত ফসলের পরিমাণ (মণ/একক):' : 'Harvest Quantity (Units/Maund):'}
            </label>
            <input
              type="number"
              min="1"
              value={farmerQuantity}
              onChange={(e) => setFarmerQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-base text-white font-bold outline-none focus:border-teal-400"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">
              {lang === 'bn' ? 'সরাসরি বিক্রয় করলে সম্ভাব্য আয়:' : 'Direct Fair Revenue:'}
            </span>
            <span className="text-xl font-extrabold text-emerald-400">
              ৳ {toLocalNum((farmerQuantity * 3150).toLocaleString(), lang)}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              {lang === 'bn' ? 'সরকারি ও পাইকারি রেফারেন্স মূল্যের ভিত্তিতে' : 'Benchmarked to wholesale reference rate'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30">
            <span className="text-xs text-teal-300 block mb-1 font-semibold">
              {lang === 'bn' ? 'দালাল মুক্ত হওয়ার দরুন বাড়তি লাভ:' : 'Middleman Markup Prevented:'}
            </span>
            <span className="text-xl font-extrabold text-teal-300">
              ৳ {toLocalNum((farmerQuantity * 450).toLocaleString(), lang)}
            </span>
            <p className="text-[11px] text-teal-400 mt-1">
              ✓ {lang === 'bn' ? 'সরাসরি কৃষকের পকেটে অতিরিক্ত মুনাফা' : 'Retained directly by smallholder'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
