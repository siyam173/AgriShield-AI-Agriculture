import React, { useState } from 'react';
import { PhoneCall, Building2, MapPin, Mail, Clock, Search, Copy, Check } from 'lucide-react';
import { NATIONAL_HELPLINES, LOCAL_AGRI_OFFICES } from '../data/agronomyData';

export default function HelplineDirectory({ lang }) {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(null);

  const districts = ['all', ...new Set(LOCAL_AGRI_OFFICES.map(o => o.districtEn))];

  const filteredOffices = LOCAL_AGRI_OFFICES.filter((office) => {
    const matchesDistrict = selectedDistrict === 'all' || office.districtEn === selectedDistrict;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      office.upazilaBn.toLowerCase().includes(q) ||
      office.upazilaEn.toLowerCase().includes(q) ||
      office.districtBn.toLowerCase().includes(q) ||
      office.districtEn.toLowerCase().includes(q) ||
      office.officerNameBn.toLowerCase().includes(q) ||
      office.officerNameEn.toLowerCase().includes(q) ||
      office.phone.includes(q);
    return matchesDistrict && matchesSearch;
  });

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 relative overflow-hidden bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'জাতীয় ও স্থানীয় কৃষি অফিস যোগাযোগ ডিরেক্টরি' : 'National Agri Helplines & Local Upazila Offices'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                SDG 17: Partnerships for the Goals
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'জরুরি কৃষি হেল্পলাইন ও উপজেলা কৃষি কর্মকর্তা সংযোগ' : 'Direct Access to Government Agronomists & Field Officers'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {lang === 'bn'
                ? 'সরাসরি ফ্রিতে ফোন করে কৃষি সম্প্রসারণ অধিদপ্তরের (DAE) কৃষিবিদদের সাথে কথা বলুন অথবা আপনার স্থানীয় উপজেলা কৃষি অফিসের সাথে যোগাযোগ করুন।'
                : 'Connect directly with local Sub-Assistant Agriculture Officers (SAAO) and toll-free national agricultural call centers.'}
            </p>
          </div>
        </div>
      </div>

      {/* National Toll-Free Helplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {NATIONAL_HELPLINES.map((helpline) => (
          <div
            key={helpline.code}
            className="p-5 rounded-2xl glass-panel-glow border-emerald-500/40 space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {lang === 'bn' ? helpline.badgeBn : helpline.badgeEn}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-400" />
                {lang === 'bn' ? helpline.hoursBn : helpline.hoursEn}
              </span>
            </div>

            <div>
              <span className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <PhoneCall className="w-6 h-6 text-emerald-400 animate-pulse" />
                {helpline.code}
              </span>
              <h4 className="text-sm font-bold text-emerald-300 mt-1">
                {lang === 'bn' ? helpline.titleBn : helpline.titleEn}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {lang === 'bn' ? helpline.serviceBn : helpline.serviceEn}
              </p>
            </div>

            <a
              href={helpline.dialUrl}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? `এখনই কল করুন (${helpline.code})` : `Call Free Now (${helpline.code})`}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Local Upazila Agriculture Office Directory */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'bn' ? 'উপজেলা কৃষি অফিস ডিরেক্টরি' : 'Local Upazila Agriculture Offices'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn' ? 'আপনার জেলা ও উপজেলা নির্বাচন করে কর্মকর্তার নম্বর ও অফিসের ঠিকানা পান।' : 'Search or filter by district to find assigned field officers.'}
            </p>
          </div>

          {/* Filter & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* District Filter */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none focus:border-emerald-500"
            >
              <option value="all">{lang === 'bn' ? 'সকল জেলা' : 'All Districts'}</option>
              {districts.filter(d => d !== 'all').map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'bn' ? 'উপজেলা বা কর্মকর্তা খুঁজুন...' : 'Search upazila or officer...'}
                className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 w-full sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Offices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOffices.map((office, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {lang === 'bn' ? office.districtBn : office.districtEn}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {lang === 'bn' ? office.upazilaBn : office.upazilaEn}
                </span>
              </div>

              <div className="pt-1">
                <h4 className="text-sm font-bold text-white">
                  {lang === 'bn' ? office.officerNameBn : office.officerNameEn}
                </h4>
                <p className="text-xs text-teal-300 font-medium">
                  {lang === 'bn' ? office.officerTitleBn : office.officerTitleEn}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800 pt-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{lang === 'bn' ? 'অফিস সময়:' : 'Hours:'}</span>
                  <span className="font-medium text-slate-300">{lang === 'bn' ? office.workingHoursBn : office.workingHoursEn}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{lang === 'bn' ? 'ঠিকানা:' : 'Address:'}</span>
                  <span className="font-medium text-slate-300 truncate max-w-[180px]">
                    {lang === 'bn' ? office.addressBn : office.addressEn}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Call & Copy */}
              <div className="flex gap-2 pt-1">
                <a
                  href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md shadow-emerald-950/40"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{office.phone}</span>
                </a>

                <button
                  onClick={() => handleCopyPhone(office.phone)}
                  title="Copy Phone Number"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-95"
                >
                  {copiedPhone === office.phone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
