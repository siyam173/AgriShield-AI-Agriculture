export const CROPS_AND_DISEASES = [
  {
    id: 'rice-blast',
    cropName: 'ধান (Rice/Paddy)',
    cropNameEn: 'Rice (Paddy)',
    diseaseName: 'ব্লাস্ট রোগ (Rice Blast)',
    diseaseNameEn: 'Rice Blast (Magnaporthe oryzae)',
    severity: 'High (82% Threat)',
    severityLevel: 'danger',
    confidenceScore: 98.7,
    sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    symptomsBn: 'পাতার উপর চোখের মতো বা ডিম্বাকৃতি দাগ, কেন্দ্র ধূসর এবং কিনারা বাদামী রঙের হয়। শিষের গোড়ায় আক্রমণ হলে চিটা হয়ে যায়।',
    symptomsEn: 'Spindle-shaped lesions with gray centers and reddish-brown borders. Affects leaves and panicles causing grain sterility.',
    organicRemedyBn: 'নিমপাতা ও ছাই মিশিয়ে সেচ নালায় দিন। অতিরিক্ত ইউরিয়া সার বন্ধ করে পটাশ সার প্রয়োগ করুন।',
    organicRemedyEn: 'Apply neem extract and bio-ash suspension. Halt excessive nitrogen fertilizer and apply potash.',
    chemicalRemedyBn: 'ট্রাইসাইক্লাজোল প্রতি লিটার পানিতে ০.৭৫ গ্রাম হারে মিশিয়ে বিকেলে স্প্রে করুন।',
    chemicalRemedyEn: 'Spray Tricyclazole 75 WP @ 0.75g/L water during late afternoon. Maintain 14-day pre-harvest interval.',
    safetyProtocol: 'Use mask and gloves. Restrict livestock entry for 24 hours post-application.',
    unSdg: 'SDG 2: Zero Hunger'
  },
  {
    id: 'potato-late-blight',
    cropName: 'আলু (Potato)',
    cropNameEn: 'Potato',
    diseaseName: 'লেট ব্লাইট বা মড়ক রোগ (Late Blight)',
    diseaseNameEn: 'Late Blight (Phytophthora infestans)',
    severity: 'Critical (94% Threat)',
    severityLevel: 'critical',
    confidenceScore: 99.2,
    sampleImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    symptomsBn: 'কুয়াশাচ্ছন্ন আবহাওয়ায় পাতার কিনারায় কালচে বা জলভেজা দাগ পড়ে। কয়েক দিনে পুরো ক্ষেত পুড়ে যাওয়ার মতো দেখায়।',
    symptomsEn: 'Water-soaked irregular dark lesions on leaves surrounded by pale halos. Leads to total vine defoliation.',
    organicRemedyBn: 'কপার সালফেট ও চুন দিয়ে বোর্দো মিশ্রণ (১%) তৈরি করে কুয়াশা পড়ার আগেই স্প্রে করুন।',
    organicRemedyEn: 'Preventive spray of 1% Bordeaux mixture (Copper Sulfate + Lime). Remove and bury infected foliage.',
    chemicalRemedyBn: 'ম্যানকোজেব + মেটালেক্সিল ২ গ্রাম/লিটার হারে প্রতি ৭-১০ দিন পরপর স্প্রে করুন।',
    chemicalRemedyEn: 'Mancozeb + Metalaxyl @ 2g/L water at 7-10 day intervals during high relative humidity.',
    safetyProtocol: 'Wash hands thoroughly with soap after handling. Keep away from children.',
    unSdg: 'SDG 1 & 2: Food Security'
  },
  {
    id: 'tomato-leaf-curl',
    cropName: 'টমেটো (Tomato)',
    cropNameEn: 'Tomato',
    diseaseName: 'পাতা কোকড়ানো রোগ (Tomato Leaf Curl Virus)',
    diseaseNameEn: 'Tomato Leaf Curl Virus (TYLCV)',
    severity: 'Medium (65% Threat)',
    severityLevel: 'warning',
    confidenceScore: 96.5,
    sampleImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    symptomsBn: 'গাছের ডগা ও পাতা উপরের দিকে কুঁকড়ে যায় এবং হলুদ হয়ে যায়। গাছের স্বাভাবিক বৃদ্ধি থমকে যায়।',
    symptomsEn: 'Upward curling of leaves, chlorosis, stunting of plants, and flower drop. Transmitted by Whiteflies.',
    organicRemedyBn: 'হলুদ আঠালো ফাঁদ স্থাপন করুন এবং সাবান পানি (৫ গ্রাম/লিটার) দিয়ে সাদা মাছি দমন করুন।',
    organicRemedyEn: 'Deploy yellow sticky traps (15-20 traps/acre). Spray mild potassium soap oil solution.',
    chemicalRemedyBn: 'ইমিডাক্লোপ্রিড প্রতি ১ লিটার পানিতে ০.৫ মিলি মিশিয়ে স্প্রে করুন।',
    chemicalRemedyEn: 'Imidacloprid 17.8% SL @ 0.5 mL/L water targeting underside of leaves.',
    safetyProtocol: 'Do not spray during active pollinator hours (early morning).',
    unSdg: 'SDG 12: Sustainable Production'
  },
  {
    id: 'jute-stem-rot',
    cropName: 'পাট (Golden Fiber Jute)',
    cropNameEn: 'Jute',
    diseaseName: 'কাণ্ড পচা রোগ (Stem Rot)',
    diseaseNameEn: 'Macrophomina Stem Rot',
    severity: 'Medium (58% Threat)',
    severityLevel: 'warning',
    confidenceScore: 94.8,
    sampleImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    symptomsBn: 'পাটের কাণ্ডের গোড়ায় বাদামী দাগ হয়ে কাণ্ড শুকিয়ে ভেঙে যায়। আঁশের মান নষ্ট হয়।',
    symptomsEn: 'Sunken dark brown lesions around stem base and leaf axils causing premature lodging.',
    organicRemedyBn: 'ট্রাইকোডার্মা জীবাণু সার প্রয়োগ করুন এবং ক্ষেতের অতিরিক্ত পানি দ্রুত নিষ্কাশন করুন।',
    organicRemedyEn: 'Soil drenching with Trichoderma viride. Ensure efficient field drainage.',
    chemicalRemedyBn: 'কার্বেনডাজিম ২ গ্রাম/লিটার পানিতে মিশিয়ে স্প্রে করুন।',
    chemicalRemedyEn: 'Carbendazim 50% WP @ 2g/L drenching application.',
    safetyProtocol: 'Cease spraying at least 20 days prior to harvest.',
    unSdg: 'SDG 8: Decent Work'
  }
];

export const CLIMATE_ALERTS = [
  {
    id: 'sylhet-flash-flood',
    regionBn: 'সিলেট ও সুনামগঞ্জ হাওর অঞ্চল',
    regionEn: 'Sylhet & Sunamganj Haor Basin',
    alertType: 'Flash Flood Warning (পাহাড়ি ঢল ও আগাম বন্যা)',
    alertLevel: 'HIGH',
    predictedTime: 'আগামী ৩৬ ঘণ্টার মধ্যে',
    predictedTimeEn: 'Within next 36 hours',
    rainfallExpected: '150-180 mm Heavy Rainfall',
    riverLevel: 'Surma & Kushiyara projected 0.45m above danger level',
    actionPlanBn: '১. ৮০% পেকে যাওয়া বোরো ধান অবিলম্বে কেটে নিরাপদ স্থানে তুলে নিন।\n২. বীজতলা ও সারের বস্তা উঁচু ও শুকনো ঘরে সংরক্ষণ করুন।\n৩. গবাদিপশুকে বন্যা আশ্রয়কেন্দ্রে বা উঁচু বাঁধে স্থানান্তরিত করুন।',
    actionPlanEn: '1. Harvest 80% matured paddy immediately without delay.\n2. Move seeds and fertilizers to elevated dry storage.\n3. Evacuate livestock to higher ground shelters.',
    unSdg: 'SDG 13: Climate Action'
  },
  {
    id: 'rangpur-cold-wave',
    regionBn: 'রংপুর ও দিনাজপুর অঞ্চল',
    regionEn: 'Rangpur & Dinajpur Belt',
    alertType: 'Dense Fog & Cold Wave Alert (তীব্র শৈত্যপ্রবাহ ও কুয়াশা)',
    alertLevel: 'MODERATE',
    predictedTime: 'আগামী ৪৮ ঘণ্টা রাতের তাপমাত্রা ৮° সে.',
    predictedTimeEn: 'Next 48 hrs (Night temp dropping to 8°C)',
    rainfallExpected: 'No rainfall, Relative Humidity > 95%',
    riverLevel: 'Normal river flow',
    actionPlanBn: '১. আলু ও টমেটো ফসলে লেট ব্লাইট প্রতিরোধে ছাই ও বোর্দো মিশ্রণ দিন।\n২. বোরো ধানের বীজতলায় রাতে পানি দিয়ে সকালে নিষ্কাশন করুন।\n৩. পলিথিন দিয়ে বীজতলা ঢেকে রাখুন।',
    actionPlanEn: '1. Apply protective fungicidal coat against late blight for potato crops.\n2. Keep standing water in rice nurseries overnight and drain in morning.\n3. Cover nursery beds with polythene sheets during extreme chill.',
    unSdg: 'SDG 13: Climate Action'
  },
  {
    id: 'coastal-salinity-cyclone',
    regionBn: 'খুলনা ও সাতক্ষীরা উপকূল',
    regionEn: 'Khulna & Satkhira Coastal Area',
    alertType: 'Cyclone & Salinity Intrusion (ঘূর্ণিঝড় ও লবণাক্ত পানির অনুপ্রবেশ)',
    alertLevel: 'WARNING',
    predictedTime: '৭২ ঘণ্টার পূর্বাভাস',
    predictedTimeEn: '72-Hour Warning Horizon',
    rainfallExpected: 'Squally winds with moderate showers',
    riverLevel: 'Tidal surge expected 3 ft above normal astronomical tide',
    actionPlanBn: '১. মাছের ঘেরের চারপাশের নেট বা জাল উঁচু করে বাঁধুন।\n২. মিঠা পানির পুকুরের চারধারে মাটি উঁচু করুন যেন নোনা পানি ঢুকতে না পারে।\n৩. লবণাক্ততা সহনশীল জাতের বীজ প্রস্তুত রাখুন।',
    actionPlanEn: '1. Reinforce aquaculture nets to prevent fish escaping.\n2. Elevate bunds around freshwater ponds to prevent saline surge intrusion.\n3. Stage salinity-tolerant seed varieties (e.g., BRRI Dhan 67).',
    unSdg: 'SDG 13 & 14'
  }
];

export const COMMODITY_MARKET_PRICES = [
  { 
    itemBn: 'নাজিরশাইল চাল (৫০ কেজি)', 
    itemEn: 'Nazirshail Rice (50kg)', 
    wholesalePrice: '৳ 3,450 - 3,600', 
    fairFarmgatePrice: '৳ 3,300', 
    marketTrend: 'up', 
    locationBn: 'কারওয়ান বাজার, ঢাকা', 
    locationEn: 'Karwan Bazar, Dhaka' 
  },
  { 
    itemBn: 'গোল আলু (৪০ কেজি মণ)', 
    itemEn: 'Round Potato (40kg)', 
    wholesalePrice: '৳ 1,550 - 1,620', 
    fairFarmgatePrice: '৳ 1,450', 
    marketTrend: 'stable', 
    locationBn: 'মহাস্থানগড়, বগুড়া', 
    locationEn: 'Mahasthangarh, Bogura' 
  },
  { 
    itemBn: 'দেশি পাকা টমেটো (কেজি)', 
    itemEn: 'Local Red Tomato (kg)', 
    wholesalePrice: '৳ 45 - 50', 
    fairFarmgatePrice: '৳ 38', 
    marketTrend: 'down', 
    locationBn: 'যশোর পাইকারি বাজার', 
    locationEn: 'Jashore Wholesale Hub' 
  },
  { 
    itemBn: 'তোষা পাট (৪০ কেজি মণ)', 
    itemEn: 'Tossh Jute (40kg)', 
    wholesalePrice: '৳ 3,100 - 3,350', 
    fairFarmgatePrice: '৳ 3,000', 
    marketTrend: 'up', 
    locationBn: 'ফরিদপুর মোকাম', 
    locationEn: 'Faridpur Mokam' 
  },
  { 
    itemBn: 'দেশি পেঁয়াজ (৪০ কেজি মণ)', 
    itemEn: 'Domestic Onion (40kg)', 
    wholesalePrice: '৳ 3,800 - 4,100', 
    fairFarmgatePrice: '৳ 3,600', 
    marketTrend: 'up', 
    locationBn: 'পাবনা পাইকারি বাজার', 
    locationEn: 'Pabna Wholesale Market' 
  }
];

export const OUTBREAK_HOTSPOTS = [
  { 
    id: 1, 
    districtBn: 'বগুড়া (শেরপুর ও শিবগঞ্জ)', 
    districtEn: 'Bogura (Sherpur & Shibganj)', 
    diseaseBn: 'আলুর লেট ব্লাইট (Phytophthora)',
    diseaseEn: 'Potato Late Blight (Phytophthora)', 
    affectedFarms: 342, 
    riskPct: 88, 
    statusBn: 'সক্রিয় প্রাদুর্ভাব',
    statusEn: 'Active Outbreak', 
    lat: 24.8465, 
    lng: 89.3777 
  },
  { 
    id: 2, 
    districtBn: 'দিনাজপুর (বীরগঞ্জ)', 
    districtEn: 'Dinajpur (Birganj)', 
    diseaseBn: 'ধানের ব্লাস্ট ছত্রাক (Magnaporthe)',
    diseaseEn: 'Rice Blast Fungus (Magnaporthe)', 
    affectedFarms: 189, 
    riskPct: 74, 
    statusBn: 'নিয়ন্ত্রণে রয়েছে',
    statusEn: 'Contained', 
    lat: 25.6279, 
    lng: 88.6332 
  },
  { 
    id: 3, 
    districtBn: 'যশোর (ঝিকরগাছা)', 
    districtEn: 'Jashore (Jhikargachha)', 
    diseaseBn: 'টমেটো পাতা কোঁকড়ানো ভাইরাস (TYLCV)',
    diseaseEn: 'Tomato Leaf Curl Virus (TYLCV)', 
    affectedFarms: 215, 
    riskPct: 62, 
    statusBn: 'নজরদারিতে আছে',
    statusEn: 'Monitoring', 
    lat: 23.1634, 
    lng: 89.2182 
  },
  { 
    id: 4, 
    districtBn: 'সুনামগঞ্জ (তাহিরপুর)', 
    districtEn: 'Sunamganj (Tahirpur)', 
    diseaseBn: 'হাওর আগাম ঢলের ফসলহানি ঝুঁকি',
    diseaseEn: 'Flash Flood Crop Submersion', 
    affectedFarms: 520, 
    riskPct: 91, 
    statusBn: 'বন্যা সতর্কতা',
    statusEn: 'Flash Flood Threat', 
    lat: 25.0658, 
    lng: 91.4073 
  }
];
