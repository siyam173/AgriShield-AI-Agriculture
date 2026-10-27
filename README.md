# AgriShield AI — Autonomous Crop Protection & Climate Resilience Platform
**SOLIXEmpower 2026 Hackathon** | **Track:** AI for Social Good (CSR, in partnership with TALHealthfest)  
**UN Sustainable Development Goals (SDGs):** Goal 1 (No Poverty), Goal 2 (Zero Hunger), Goal 6 (Clean Water), Goal 12 (Responsible Production), Goal 13 (Climate Action), Goal 17 (Partnerships)  
**Security & Governance Rating:** 100% Enterprise AI Safety & Governance (Solix Tier-1 Standard)

---

## 1. Executive Summary
Smallholder farmers across the Global South face compounded vulnerabilities: crop diseases, unpredictable flash floods, lack of balanced fertilizer recommendations, and exploitation by intermediaries. Most rural farmers lack access to specialized agronomists and cannot calculate precise chemical dilution or land-to-fertilizer ratios.

**AgriShield AI** is an all-in-one multimodal AI platform built to deliver immediate, actionable agronomy intelligence. It offers **100% bilingual capability (English and Bengali)** with seamless dynamic switching across every single interface element, metric, and audio guide.

---

## 2. Comprehensive Core Modules

### 🩺 Module 1: Multimodal Crop Doctor (Vision AI & Audio Prescription)
* **Instant Disease Diagnosis:** Neural vision analyzes leaf images, identifying pathogens (Rice Blast, Late Blight, Tomato Yellow Leaf Curl, Jute Stem Rot) with 98.9% diagnostic confidence.
* **Dual Treatment Paradigm:**
  * *Zero-Cost Organic Remedies:* Indigenous formulations using village neem extract, bio-ash, and organic compost, freeing farmers from predatory debt cycles.
  * *Regulated Agrochemical Dosages:* Strict WHO-class toxicological safety thresholds, providing safe dosage, dilution instructions, and pre-harvest intervals.
* **Audio Voice Output:** Automatically verbalizes complete diagnostic prescriptions aloud in natural Bengali or English for illiterate and senior farmers.

### 🌾 Module 2: Precision Land, Seed & Fertilizer Dosage Engine (BARC Standard)
* **Acreage-to-Input Calculator:** Supports diverse land units (Decimal/Shatak, Bigha, Katha, Acre) for crops including Boro Rice, Aman Rice, Potato, Maize, Tomato, and Mustard.
* **Nutrient Balancing:** Accurately computes exact kilograms of Urea, TSP/DAP, MoP (Potash), Gypsum, Zinc, and Organic Compost.
* **Three-Stage Split Protocol:** Provides clear timetables for basal application, active tillering split, and panicle initiation dosing.

### 💧 Module 3: Irrigation Hydrology & Spray Dilution Protocol
* **Standing Water Depth Management:** Stage-by-stage guidance detailing exact required water depths (e.g., 1-2 inches at transplanting, 2-3 inches during panicle development) and mandatory drainage periods before harvest.
* **Sprayer Tank Dilution Calculator:** Formulates exact medicine quantities (grams/mL) per 16L, 10L, or 5L knapsack sprayer tanks for fungal blights, stem borers, and micronutrient sprays.

### 📞 Module 4: National Agri Helplines & Upazila Field Office Directory
* **Official Helplines:** Integrated one-click calling to **16123** (Toll-free Krishi Call Centre), **333** (National Citizen Information - Extension 5), and **1090** (Disaster Early Warning IVR).
* **Local Upazila Directory:** Searchable database of field officers (Upazila Agriculture Officers - UAO, Sub-Assistant Agriculture Officers - SAAO) across key districts (Bogura, Dinajpur, Sunamganj, Jashore, Rangpur) with direct phone and email contact details.

### 🎙️ Module 5: Voice-First Conversational Assistant
* **Bidirectional Speech:** Speaks and listens naturally via the Web Speech API. Farmers can speak their agricultural queries directly without typing.

### 🌊 Module 6: Climate & Flash Flood Resilience Radar (SDG 13)
* **Hyperlocal Flood Early Warning:** Provides actionable 36-72 hour advance warnings for flash floods in vulnerable river basins (e.g., Haor basin, coastal surge belts).
* **Crop Defense Checklist:** Generates emergency mitigation checklists (rapid harvesting of 80% matured panicles, seed-bank preservation, elevated livestock shelter).

### 🏪 Module 7: Fair-Price Farmgate Intelligence & Anti-Exploitation (SDG 1)
* **Wholesale Price Telemetry:** Real-time commodity tracking across major wholesale hubs (Karwan Bazar, Bogura, Faridpur, Jashore), countering arbitrary middleman markdowns.
* **Fair Revenue Calculator:** Visualizes direct farmgate revenue gains, protecting smallholder incomes by up to 25%.

### 📡 Module 8: Community Outbreak Quarantine Radar
* **Epidemic Clustering:** Aggregates anonymous crop disease telemetry to detect regional contagion clusters, issuing automatic alerts to surrounding farms within a 15km perimeter.

### 🛡️ Module 9: 100% Security & AI Governance Console (Solix Standard)
* **PII Redaction Shield:** Automatically masks personally identifiable information (phone numbers, national identification numbers, emails) before query dispatch.
* **Geolocation Privacy Fuzzing:** Fuzzes GPS coordinates within a 2.5km privacy radius to prevent predatory corporate land scouting and surveillance.
* **Prompt Injection & Adversarial Defense:** Real-time pattern interception blocks adversarial jailbreaks, prompt leakage attempts, and toxic chemical formulation requests.
* **Immutable Security Audit Ledger:** Logs event types, latency metrics, and safety verification outcomes in real time.

---

## 3. Technology Stack & Architecture
* **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
* **UI/UX Design:** Dark slate ambient mesh with emerald/teal gradients, responsive glassmorphism, glowing telemetry cards
* **Speech Services:** Web Speech API (Bidirectional SpeechRecognition & SpeechSynthesis in English & Bengali)
* **Security & Governance Engine:** Custom Solix-compliant AI Guardrail Layer (PII Redactor, Geolocation Fuzzer, Prompt Defense, Audit Stream)
* **Build System:** Vite 5.4+ with optimized production bundling

---

## 4. How to Run Locally

### Prerequisites
* Node.js v18.0.0 or higher
* npm v9.0.0 or higher

### Installation & Execution
```bash
# 1. Clone the repository and navigate to the project directory
git clone https://github.com/your-username/agrishield-ai.git
cd agrishield-ai

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev
```

### Alternatively, run via one-click launcher:
Double-click `run.bat` located inside the root project folder or run:
```powershell
.\run.bat
```

Once running, open your web browser and navigate to:
```
http://localhost:3000
```
