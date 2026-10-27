export const toLocalNum = (num, lang) => {
  if (lang !== 'bn') return String(num);
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
};

export const UI_TEXT = {
  en: {
    brandName: "AgriShield AI",
    version: "v2.6 Enterprise",
    tagline: "Smart Agriculture & Climate Resilience Hub",
    trackBadge: "SOLIXEmpower: AI for Social Good",
    unSdgs: "UN SDGs:",
    sdg1: "#1 No Poverty",
    sdg2: "#2 Zero Hunger",
    sdg13: "#13 Climate",
    securityStatus: "100% Security Active",
    securitySub: "Solix Guardrails & PII Shield",
    langButton: "বাংলা",
    
    // KPI Stats
    kpiAccuracyLabel: "Diagnostic Accuracy",
    kpiAccuracyVal: "98.9%",
    kpiIncomeLabel: "Income Protected",
    kpiIncomeVal: "+25% Growth",
    kpiHazardLabel: "Early Hazard Horizon",
    kpiHazardVal: "36-72 hrs",
    kpiGovLabel: "Solix Governance",
    kpiGovVal: "100% Active",

    // Tabs
    tabDoctor: "Crop Doctor (Vision)",
    tabLandCalc: "Land & Fertilizer Calc",
    tabWaterSpray: "Water & Spray Guide",
    tabVoice: "Voice Assistant",
    tabDisaster: "Disaster Radar",
    tabMarket: "Fair Market",
    tabOutbreak: "Outbreak Radar",
    tabHelpline: "Agri Helplines & Offices",
    tabSecurity: "100% Security Console",

    // Footer
    footerRights: "Solix AI Hackathon (SOLIXEmpower 2026)",
    footerTrack: "Track: AI for Social Good (CSR & TALHealthfest)",
    footerSecurity: "100% Secure & Responsible AI"
  },
  bn: {
    brandName: "এগ্রিশিল্ড এআই",
    version: "ভার্সন ২.৬ এন্টারপ্রাইজ",
    tagline: "স্মার্ট কৃষি ও জলবায়ু সুরক্ষা প্ল্যাটফর্ম",
    trackBadge: "সলিক্স এমপাওয়ার: এআই ফর সোশ্যাল গুড",
    unSdgs: "জাতিসংঘের এসডিজি:",
    sdg1: "#১ দারিদ্র্য বিমোচন",
    sdg2: "#২ ক্ষুধা মুক্তি",
    sdg13: "#১৩ জলবায়ু সুরক্ষা",
    securityStatus: "১০০% সিকিউরিটি সক্রিয়",
    securitySub: "সলিক্স গার্ডরেল ও পিআইআই শিল্ড",
    langButton: "English",

    // KPI Stats
    kpiAccuracyLabel: "রোগ নির্ণয় নির্ভুলতা",
    kpiAccuracyVal: "৯৮.৯%",
    kpiIncomeLabel: "কৃষকের আয় বৃদ্ধি",
    kpiIncomeVal: "+২৫% সুরক্ষিত",
    kpiHazardLabel: "আগাম দুর্যোগ সতর্কবার্তা",
    kpiHazardVal: "৩৬-৭২ ঘণ্টা",
    kpiGovLabel: "সলিক্স এআই গভর্ন্যান্স",
    kpiGovVal: "১০০% সক্রিয়",

    // Tabs
    tabDoctor: "ক্রপ ডক্টর (রোগ নির্ণয়)",
    tabLandCalc: "জমি ও সার পরিমাপক",
    tabWaterSpray: "সেচ ও স্প্রে মাত্রা",
    tabVoice: "ভয়েস অ্যাসিস্ট্যান্ট",
    tabDisaster: "বন্যা ও দুর্যোগ রাডার",
    tabMarket: "ন্যায্য বাজারদর",
    tabOutbreak: "মহামারী রাডার",
    tabHelpline: "কৃষি হেল্পলাইন ও অফিস",
    tabSecurity: "১০০% সিকিউরিটি কনসোল",

    // Footer
    footerRights: "সলিক্স এআই হ্যাকাথন (SOLIXEmpower ২০২৬)",
    footerTrack: "ট্র্যাক: এআই ফর সোশ্যাল গুড (CSR ও TALHealthfest)",
    footerSecurity: "১০০% নিরাপদ ও দায়িত্বশীল এআই"
  }
};
