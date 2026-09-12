export interface ServiceCategory {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  iconName: string;
  startingPrice: number;
  popular: boolean;
  itemCount: number;
}

export interface WorkerProfile {
  id: string;
  name: string;
  category: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  hourlyRate: number;
  locality: string;
  distanceKm: number;
  verificationTier: 1 | 2 | 3; // 1: Self, 2: Skill Certified, 3: RWA Household Verified
  isWomenSafe: boolean;
  isHeritageSkill: boolean;
  isCoopMember: boolean;
  coopRole?: string;
  skills: string[];
  bio: string;
  jobsCompleted: number;
  onTimeRate: number;
  availableToday: boolean;
  dependentsCount: number;
  savingsBufferMonths: number;
  vulnerabilityScore: number; // 1-100 (for Crisis Mode equity sorting)
}

export interface ServiceAddon {
  id: string;
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  description: string;
  popularPairing: string;
}

export interface CollectiveVoteTopic {
  id: string;
  category: string;
  currentRate: number;
  proposedRate: number;
  totalEligibleVotes: number;
  currentYesVotes: number;
  daysRemaining: number;
  description: string;
}

export interface DemandForecastPoint {
  timeLabel: string;
  KoramangalaDemand: number;
  IndiranagarDemand: number;
  HSRDemand: number;
  WhitefieldDemand: number;
  recommendedWorkers: number;
}

export interface BatchPoolItem {
  id: string;
  neighborhood: string;
  rwaName: string;
  householdsCount: number;
  serviceType: string;
  scheduledTime: string;
  originalTravelKm: number;
  optimizedTravelKm: number;
  co2SavedKg: number;
  discountPerHome: number;
  assignedWorkerTeam: string[];
}

export const LOCALITIES = [
  "Koramangala 4th Block",
  "Indiranagar 100ft Road",
  "HSR Layout Sector 3",
  "Whitefield Main Road",
  "Jayanagar 4th T Block",
  "Electronic City Phase 1",
  "Malleshwaram 8th Cross",
  "MG Road Metro Station",
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "electrician",
    name: "Electrical Services",
    nameHindi: "बिजली सेवाएं",
    description: "Wiring, switchboard repair, MCB installation, heavy appliances",
    iconName: "Zap",
    startingPrice: 299,
    popular: true,
    itemCount: 42,
  },
  {
    id: "plumber",
    name: "Plumbing & Sanitary",
    nameHindi: "प्लंबिंग एवं स्वच्छता",
    description: "Pipe leaks, faucet repair, drain clearing, water heater setup",
    iconName: "Wrench",
    startingPrice: 349,
    popular: true,
    itemCount: 38,
  },
  {
    id: "carpenter",
    name: "Carpentry & Furniture",
    nameHindi: "बढ़ईगीरी एवं फर्नीचर",
    description: "Door latch, modular kitchen fix, custom woodwork, repairs",
    iconName: "Hammer",
    startingPrice: 399,
    popular: true,
    itemCount: 29,
  },
  {
    id: "painter",
    name: "Painting & Waterproofing",
    nameHindi: "पेंटिंग एवं वॉटरप्रूफिंग",
    description: "Interior wall accent, full apartment, damp treatment",
    iconName: "Paintbrush",
    startingPrice: 599,
    popular: false,
    itemCount: 31,
  },
  {
    id: "domestic_help",
    name: "Domestic & Kitchen Support",
    nameHindi: "घरेलू सहायिका एवं रसोई",
    description: "Daily house cooking, dish cleaning, deep dust sanitization",
    iconName: "Home",
    startingPrice: 249,
    popular: true,
    itemCount: 64,
  },
  {
    id: "caregiver",
    name: "Elder & Nursing Care",
    nameHindi: "बुजुर्ग एवं स्वास्थ्य देखभाल",
    description: "Certified senior patient assistance, post-surgery assistance",
    iconName: "HeartPulse",
    startingPrice: 499,
    popular: true,
    itemCount: 22,
  },
  {
    id: "driver",
    name: "Personal & Valet Driver",
    nameHindi: "व्यक्तिगत ड्राइवर",
    description: "Hourly city driver, outstation travel, automatic/manual cars",
    iconName: "Car",
    startingPrice: 299,
    popular: false,
    itemCount: 35,
  },
  {
    id: "gardener",
    name: "Balcony & Landscape Gardening",
    nameHindi: "बागवानी एवं नर्सरी",
    description: "Plant pruning, potting soil refresh, drip irrigation fix",
    iconName: "Flower2",
    startingPrice: 349,
    popular: false,
    itemCount: 18,
  },
  {
    id: "cleaner",
    name: "Deep Cleaning & Sanitization",
    nameHindi: "डीप क्लीनिंग एवं सफाई",
    description: "Sofa shampooing, bathroom deep scrub, kitchen degreasing",
    iconName: "Sparkles",
    startingPrice: 449,
    popular: true,
    itemCount: 52,
  },
  {
    id: "appliance_tech",
    name: "Appliance Technician",
    nameHindi: "उपकरण तकनीशियन",
    description: "AC servicing, washing machine repair, RO filter swap",
    iconName: "Cpu",
    startingPrice: 399,
    popular: true,
    itemCount: 46,
  },
];

export const WORKERS: WorkerProfile[] = [
  {
    id: "wrk-101",
    name: "Rajesh Kumar",
    category: "electrician",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80",
    rating: 4.92,
    reviewCount: 328,
    experienceYears: 9,
    hourlyRate: 350,
    locality: "Koramangala 4th Block",
    distanceKm: 0.8,
    verificationTier: 3,
    isWomenSafe: true,
    isHeritageSkill: false,
    isCoopMember: true,
    coopRole: "Bengaluru Electrical Union Lead",
    skills: ["MCB & Distribution Boards", "Inverter Wiring", "Smart Home Switches", "EV Charger Install"],
    bio: "Government-certified ITI Electrician with 9+ years experience. Executive committee member of Bengaluru Urban Workers Cooperative.",
    jobsCompleted: 1420,
    onTimeRate: 99.1,
    availableToday: true,
    dependentsCount: 4,
    savingsBufferMonths: 1.2,
    vulnerabilityScore: 82,
  },
  {
    id: "wrk-102",
    name: "Sunita Devi Sharma",
    category: "domestic_help",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    rating: 4.96,
    reviewCount: 412,
    experienceYears: 7,
    hourlyRate: 280,
    locality: "HSR Layout Sector 3",
    distanceKm: 1.2,
    verificationTier: 3,
    isWomenSafe: true,
    isHeritageSkill: false,
    isCoopMember: true,
    coopRole: "Women Collective Convener",
    skills: ["North/South Indian Meal Prep", "Kitchen Degreasing", "Child-Safe Cleaning", "Meal Planning"],
    bio: "Certified by NCCT in Food Safety & Hygiene. Founding member of Mahila Sahakar Seva Samiti.",
    jobsCompleted: 1890,
    onTimeRate: 99.5,
    availableToday: true,
    dependentsCount: 3,
    savingsBufferMonths: 0.8,
    vulnerabilityScore: 94,
  },
  {
    id: "wrk-103",
    name: "Master Ramesh Acharya",
    category: "carpenter",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    rating: 4.98,
    reviewCount: 240,
    experienceYears: 22,
    hourlyRate: 650,
    locality: "Jayanagar 4th T Block",
    distanceKm: 2.4,
    verificationTier: 3,
    isWomenSafe: true,
    isHeritageSkill: true,
    isCoopMember: true,
    coopRole: "Heritage Artisan Trustee",
    skills: ["Heritage Teak Carving", "Rosewood Inlay", "Modular Cabinet Fitting", "Antique Furniture Restoration"],
    bio: "3rd generation hereditary wood artisan. Recipient of State Craft Award 2019. Preserving Karnataka traditional woodwork.",
    jobsCompleted: 850,
    onTimeRate: 98.4,
    availableToday: true,
    dependentsCount: 5,
    savingsBufferMonths: 3.5,
    vulnerabilityScore: 45,
  },
  {
    id: "wrk-104",
    name: "Deepa Nair",
    category: "caregiver",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
    rating: 4.94,
    reviewCount: 184,
    experienceYears: 11,
    hourlyRate: 520,
    locality: "Indiranagar 100ft Road",
    distanceKm: 1.5,
    verificationTier: 3,
    isWomenSafe: true,
    isHeritageSkill: false,
    isCoopMember: true,
    coopRole: "Healthcare Guild Auditor",
    skills: ["Post-Op Nursing Care", "Elderly Mobility", "Diabetes & Vitals Monitor", "Dementia Support"],
    bio: "Registered General Nurse (B.Sc Nursing) specializing in compassionate geriatric care and palliative support at home.",
    jobsCompleted: 610,
    onTimeRate: 100.0,
    availableToday: true,
    dependentsCount: 2,
    savingsBufferMonths: 2.1,
    vulnerabilityScore: 62,
  },
  {
    id: "wrk-105",
    name: "Mohammad Zakir Hussain",
    category: "plumber",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    rating: 4.88,
    reviewCount: 295,
    experienceYears: 12,
    hourlyRate: 380,
    locality: "Whitefield Main Road",
    distanceKm: 3.1,
    verificationTier: 2,
    isWomenSafe: true,
    isHeritageSkill: false,
    isCoopMember: true,
    skills: ["Concealed Pipe Leakage", "Pressure Pump Fitting", "CPVC & PPR Soldering", "Solar Heater Lines"],
    bio: "Expert plumber specializing in high-pressure plumbing systems for modern apartments and independent villas.",
    jobsCompleted: 1150,
    onTimeRate: 97.8,
    availableToday: true,
    dependentsCount: 4,
    savingsBufferMonths: 1.0,
    vulnerabilityScore: 88,
  },
  {
    id: "wrk-106",
    name: "Anand Sharma",
    category: "appliance_tech",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    rating: 4.90,
    reviewCount: 215,
    experienceYears: 8,
    hourlyRate: 420,
    locality: "Koramangala 4th Block",
    distanceKm: 1.9,
    verificationTier: 3,
    isWomenSafe: true,
    isHeritageSkill: false,
    isCoopMember: true,
    skills: ["Inverter AC Gas Charge", "Front-Load Washing Machine", "RO Water Filter Overhaul"],
    bio: "Ex-Samsung Senior Field Technician with 8+ years experience in inverter ACs and smart home appliances.",
    jobsCompleted: 980,
    onTimeRate: 98.9,
    availableToday: true,
    dependentsCount: 2,
    savingsBufferMonths: 1.8,
    vulnerabilityScore: 58,
  },
  {
    id: "wrk-107",
    name: "Lakshmi Priya Murthy",
    category: "cleaner",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
    rating: 4.95,
    reviewCount: 350,
    experienceYears: 6,
    hourlyRate: 350,
    locality: "Malleshwaram 8th Cross",
    distanceKm: 0.9,
    verificationTier: 3,
    isWomenSafe: true,
    isHeritageSkill: false,
    isCoopMember: true,
    coopRole: "Sanitization Safety Inspector",
    skills: ["Upholstery Deep Extraction", "Tile Grout Steam Scrub", "Eco-friendly Degreasing"],
    bio: "Specializes in chemical-free eco-friendly deep sanitization. Certified in infection control cleaning protocols.",
    jobsCompleted: 1320,
    onTimeRate: 99.2,
    availableToday: true,
    dependentsCount: 3,
    savingsBufferMonths: 0.9,
    vulnerabilityScore: 91,
  },
  {
    id: "wrk-108",
    name: "Venkatesh Gowda",
    category: "gardener",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    rating: 4.89,
    reviewCount: 160,
    experienceYears: 15,
    hourlyRate: 360,
    locality: "Jayanagar 4th T Block",
    distanceKm: 1.8,
    verificationTier: 2,
    isWomenSafe: true,
    isHeritageSkill: true,
    isCoopMember: true,
    skills: ["Urban Terrace Gardening", "Bonsai Pruning", "Organic Compost Setup", "Vertical Garden Walls"],
    bio: "Passionate urban horticulturist helping Bangalore residents convert balconies into lush organic vegetable gardens.",
    jobsCompleted: 540,
    onTimeRate: 98.0,
    availableToday: true,
    dependentsCount: 2,
    savingsBufferMonths: 2.5,
    vulnerabilityScore: 50,
  },
  {
    id: "wrk-109",
    name: "Sanjay Rao",
    category: "driver",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    rating: 4.91,
    reviewCount: 275,
    experienceYears: 14,
    hourlyRate: 320,
    locality: "Electronic City Phase 1",
    distanceKm: 2.7,
    verificationTier: 3,
    isWomenSafe: true,
    isHeritageSkill: false,
    isCoopMember: true,
    skills: ["Luxury SUV Automatic", "Night Airport Drops", "Defensive Driving Certified", "Outstation Trips"],
    bio: "Commercial badge holder with 500,000+ accident-free kilometers driven. Polite, punctual, and non-smoking.",
    jobsCompleted: 1450,
    onTimeRate: 99.7,
    availableToday: true,
    dependentsCount: 4,
    savingsBufferMonths: 1.5,
    vulnerabilityScore: 78,
  },
  {
    id: "wrk-110",
    name: "Ustad Subhan Ali",
    category: "painter",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    rating: 4.97,
    reviewCount: 190,
    experienceYears: 18,
    hourlyRate: 580,
    locality: "Indiranagar 100ft Road",
    distanceKm: 1.1,
    verificationTier: 3,
    isWomenSafe: true,
    isHeritageSkill: true,
    isCoopMember: true,
    coopRole: "Master Artisan Craftsman",
    skills: ["Lime Wash Heritage Plaster", "Italian Stucco Finish", "Mural Wall Art", "Non-Toxic VOC Paints"],
    bio: "Master decorative painter preserving natural lime plaster techniques and lime-wash eco finishes.",
    jobsCompleted: 720,
    onTimeRate: 98.6,
    availableToday: true,
    dependentsCount: 3,
    savingsBufferMonths: 2.8,
    vulnerabilityScore: 55,
  },
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: "add-1",
    title: "MCB Safety & Earthing Inspection",
    category: "electrician",
    price: 199,
    discountPercentage: 25,
    description: "Thermal imaging check of home electrical DB board for overload risks",
    popularPairing: "Electrical Services",
  },
  {
    id: "add-2",
    title: "Anti-Bacterial Drain Sanitization",
    category: "plumber",
    price: 249,
    discountPercentage: 20,
    description: "Enzyme treatment for kitchen & bathroom sink traps to eliminate odor",
    popularPairing: "Plumbing Services",
  },
  {
    id: "add-3",
    title: "Eco-Pest Barrier Gel Application",
    category: "cleaner",
    price: 349,
    discountPercentage: 30,
    description: "Herbal cockroach and ant gel application in cabinet hinges",
    popularPairing: "Deep Cleaning Services",
  },
  {
    id: "add-4",
    title: "Door Hinge & Latch Lubrication",
    category: "carpenter",
    price: 149,
    discountPercentage: 15,
    description: "Silicone spray treatment for all squeaky wooden doors in apartment",
    popularPairing: "Carpentry Services",
  },
];

export const COLLECTIVE_VOTE_TOPICS: CollectiveVoteTopic[] = [
  {
    id: "vote-01",
    category: "Electrical Services",
    currentRate: 350,
    proposedRate: 420,
    totalEligibleVotes: 1450,
    currentYesVotes: 1140,
    daysRemaining: 3,
    description: "Adjustment for rising material & copper wire tool cost. 82% direct take-home guarantee remains active.",
  },
  {
    id: "vote-02",
    category: "Domestic & Kitchen Support",
    currentRate: 280,
    proposedRate: 340,
    totalEligibleVotes: 2200,
    currentYesVotes: 1890,
    daysRemaining: 5,
    description: "Including mandatory 15-minute ergonomic rest interval and heat wave safety allowance.",
  },
  {
    id: "vote-03",
    category: "Plumbing Services",
    currentRate: 380,
    proposedRate: 450,
    totalEligibleVotes: 1100,
    currentYesVotes: 820,
    daysRemaining: 2,
    description: "Standardizing emergency monsoon burst pipe response rate across Bengaluru South.",
  },
];

export const DEMAND_FORECAST_DATA: DemandForecastPoint[] = [
  { timeLabel: "08:00 AM", KoramangalaDemand: 45, IndiranagarDemand: 38, HSRDemand: 52, WhitefieldDemand: 60, recommendedWorkers: 42 },
  { timeLabel: "10:00 AM", KoramangalaDemand: 88, IndiranagarDemand: 92, HSRDemand: 78, WhitefieldDemand: 95, recommendedWorkers: 85 },
  { timeLabel: "12:00 PM", KoramangalaDemand: 65, IndiranagarDemand: 70, HSRDemand: 60, WhitefieldDemand: 72, recommendedWorkers: 60 },
  { timeLabel: "02:00 PM", KoramangalaDemand: 50, IndiranagarDemand: 48, HSRDemand: 55, WhitefieldDemand: 58, recommendedWorkers: 45 },
  { timeLabel: "04:00 PM", KoramangalaDemand: 94, IndiranagarDemand: 89, HSRDemand: 98, WhitefieldDemand: 104, recommendedWorkers: 98 },
  { timeLabel: "06:00 PM", KoramangalaDemand: 112, IndiranagarDemand: 120, HSRDemand: 105, WhitefieldDemand: 130, recommendedWorkers: 115 },
  { timeLabel: "08:00 PM", KoramangalaDemand: 75, IndiranagarDemand: 80, HSRDemand: 70, WhitefieldDemand: 85, recommendedWorkers: 70 },
];

export const BATCH_POOL_ITEMS: BatchPoolItem[] = [
  {
    id: "pool-01",
    neighborhood: "HSR Sector 3 - Green Glen Apartments",
    rwaName: "Green Glen Owners Association",
    householdsCount: 4,
    serviceType: "Electrical AC & DB Overhaul",
    scheduledTime: "Saturday, 10:00 AM - 01:00 PM",
    originalTravelKm: 18.4,
    optimizedTravelKm: 3.2,
    co2SavedKg: 4.8,
    discountPerHome: 120,
    assignedWorkerTeam: ["Rajesh Kumar", "Anand Sharma"],
  },
  {
    id: "pool-02",
    neighborhood: "Indiranagar - Defence Colony RWA",
    rwaName: "Defence Colony Welfare Society",
    householdsCount: 6,
    serviceType: "Deep Kitchen Degreasing & Sanitization",
    scheduledTime: "Sunday, 09:00 AM - 12:00 PM",
    originalTravelKm: 26.0,
    optimizedTravelKm: 4.5,
    co2SavedKg: 7.2,
    discountPerHome: 150,
    assignedWorkerTeam: ["Sunita Devi Sharma", "Lakshmi Priya Murthy"],
  },
];

// ==========================================
// ABC.MD INNOVATION 1: FLEXIBLE SERVICE UNITS
// ==========================================

// A. Hourly Time Blocks (Instahelp)
export interface InstahelpBlock {
  id: string;
  durationHours: number;
  title: string;
  subtitle: string;
  tagline: string;
  priceINR: number;
  workerGuaranteedTakeHome: number;
  arrivalMinutes: number;
  icon: string;
  popularTasks: string[];
  explicitExclusions: string[];
  isPopular?: boolean;
}

export const INSTAHELP_BLOCKS: InstahelpBlock[] = [
  {
    id: "block-1hr",
    durationHours: 1,
    title: "1-Hour Quick Fix",
    subtitle: "Urgent Single-Problem Resolution",
    tagline: "Ideal for 1-2 small immediate repairs",
    priceINR: 179,
    workerGuaranteedTakeHome: 150,
    arrivalMinutes: 12,
    icon: "Zap",
    popularTasks: ["Switchboard spark repair", "Single tap washer leak", "Door handle fix", "Bulb/holder replacement"],
    explicitExclusions: ["Full house rewiring", "Structural masonry", "Appliance motor winding"],
  },
  {
    id: "block-2hr",
    durationHours: 2,
    title: "2-Hour Handyman",
    subtitle: "Multi-Task Punchlist Blitz",
    tagline: "Clear 4-6 pending household fixes in one go",
    priceINR: 299,
    workerGuaranteedTakeHome: 255,
    arrivalMinutes: 15,
    icon: "Wrench",
    isPopular: true,
    popularTasks: ["Drill & mount 4 shelves/curtains", "Fix 2 leaking faucets", "Ceiling fan regulator replacement", "Kitchen sink drain unclog"],
    explicitExclusions: ["Full bathroom renovation", "Balcony tiling", "Major civil works"],
  },
  {
    id: "block-3hr",
    durationHours: 3,
    title: "3-Hour Home Helper",
    subtitle: "Deep Domestic & Clean Reset",
    tagline: "Intensive help for cleaning, prep, or reorganization",
    priceINR: 449,
    workerGuaranteedTakeHome: 385,
    arrivalMinutes: 20,
    icon: "Sparkles",
    popularTasks: ["Deep kitchen degreasing", "Wardrobe reorganization", "Balcony wash & scrubbing", "Post-party cleanup"],
    explicitExclusions: ["Hazardous chemical handling", "Exterior facade climbing"],
  },
  {
    id: "block-4hr",
    durationHours: 4,
    title: "4-Hour Half-Day Pro",
    subtitle: "Comprehensive Maintenance Shift",
    tagline: "Full half-day dedicated craftsman at co-op rates",
    priceINR: 599,
    workerGuaranteedTakeHome: 520,
    arrivalMinutes: 25,
    icon: "HardHat",
    popularTasks: ["Complete electrical checkup", "Furniture repair & hinge tuning", "Water pressure pump check", "Door lock overhauls"],
    explicitExclusions: ["Commercial industrial machinery", "3-phase power line tapping"],
  },
];

// B. Pre-Formed Multi-Skill Crews
export interface CrewMemberSplit {
  role: string;
  name: string;
  avatar: string;
  rating: number;
  percentageSplit: number;
  payoutINR: number;
}

export interface MultiSkillCrew {
  id: string;
  name: string;
  tagline: string;
  totalPriceINR: number;
  durationHours: number;
  responseGuaranteeMin: number;
  teamLead: string;
  leadAvatar: string;
  totalCompletedJobs: number;
  crewRating: number;
  category: string;
  members: CrewMemberSplit[];
  scopeDeliverables: string[];
}

export const MULTI_SKILL_CREWS: MultiSkillCrew[] = [
  {
    id: "crew-movein",
    name: "New Home Move-In Crew",
    tagline: "Electrician + Plumber + Sanitization Lead deployed simultaneously",
    totalPriceINR: 1499,
    durationHours: 3,
    responseGuaranteeMin: 30,
    teamLead: "Rajesh Kumar (Lead Electrician)",
    leadAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    totalCompletedJobs: 148,
    crewRating: 4.94,
    category: "Move-In Readiness",
    members: [
      {
        role: "Lead Electrician",
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
        rating: 4.95,
        percentageSplit: 45,
        payoutINR: 675,
      },
      {
        role: "Sanitary Plumber",
        name: "Mohammad Arif",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 4.90,
        percentageSplit: 35,
        payoutINR: 525,
      },
      {
        role: "Deep Hygiene Tech",
        name: "Sunita Devi",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        rating: 4.98,
        percentageSplit: 20,
        payoutINR: 299,
      },
    ],
    scopeDeliverables: [
      "Total DB & MCB safety tripping check",
      "Geyser, RO & overhead tank pressure seal test",
      "Bathroom antibacterial steam sanitization",
      "Lock cylinders & door latch alignment",
    ],
  },
  {
    id: "crew-monsoon",
    name: "Monsoon Leak & Drain Defense Crew",
    tagline: "Dual-expert squad: Roofer/Mason + High-Pressure Drain Specialist",
    totalPriceINR: 1199,
    durationHours: 2.5,
    responseGuaranteeMin: 20,
    teamLead: "Mohammad Arif (Drain Specialist)",
    leadAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    totalCompletedJobs: 215,
    crewRating: 4.91,
    category: "Weather Protection",
    members: [
      {
        role: "Lead Drain Specialist",
        name: "Mohammad Arif",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 4.90,
        percentageSplit: 55,
        payoutINR: 660,
      },
      {
        role: "Mason & Waterproofing Pro",
        name: "Gopal Prasad",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        rating: 4.88,
        percentageSplit: 45,
        payoutINR: 539,
      },
    ],
    scopeDeliverables: [
      "Roof drain pipe camera & clearance check",
      "Balcony waterproofing grout seal inspection",
      "Sump pump switch & automatic float sensor test",
    ],
  },
  {
    id: "crew-festival",
    name: "Festival Sparkle & Appliance Crew",
    tagline: "3-craftsmen team: 2 Deep Cleaners + 1 Appliance Electrical Tech",
    totalPriceINR: 1899,
    durationHours: 4,
    responseGuaranteeMin: 45,
    teamLead: "Lakshmi Priya (Senior Hygiene Lead)",
    leadAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    totalCompletedJobs: 340,
    crewRating: 4.97,
    category: "Seasonal Renewal",
    members: [
      {
        role: "Senior Hygiene Lead",
        name: "Lakshmi Priya",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
        rating: 4.97,
        percentageSplit: 40,
        payoutINR: 760,
      },
      {
        role: "Appliance & Light Tech",
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
        rating: 4.95,
        percentageSplit: 30,
        payoutINR: 570,
      },
      {
        role: "Glass & Floor Polisher",
        name: "Sunita Devi",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        rating: 4.98,
        percentageSplit: 30,
        payoutINR: 569,
      },
    ],
    scopeDeliverables: [
      "Exhaust, chimney & microwave degrease",
      "Festive lighting setup & decorative switchboard check",
      "Floor high-speed scrubbing & stain extraction",
    ],
  },
];

// C. Outcome-Based Service Packs & Pack Studio Tasks
export interface PackTaskItem {
  id: string;
  name: string;
  craft: string;
  defaultIncluded: boolean;
  priceDeltaINR: number;
  durationMinutes: number;
}

export interface OutcomePack {
  id: string;
  title: string;
  outcomeHeadline: string;
  description: string;
  basePriceINR: number;
  workerGuaranteedCut: number;
  estimatedHours: number;
  badge: string;
  tasks: PackTaskItem[];
}

export const OUTCOME_PACKS: OutcomePack[] = [
  {
    id: "pack-festival",
    title: "Festival-Ready Home Pack",
    outcomeHeadline: "Complete festive shine & electrical safety in one booking",
    description: "Designed by the Craftsmen Guild for Diwali, Pongal, and celebrations. Guaranteed 100% itemized wages.",
    basePriceINR: 1299,
    workerGuaranteedCut: 1065,
    estimatedHours: 3.5,
    badge: "Most Popular",
    tasks: [
      { id: "t1", name: "Living room & Puja room deep clean", craft: "Cleaning", defaultIncluded: true, priceDeltaINR: 350, durationMinutes: 60 },
      { id: "t2", name: "Exhaust fan & ceiling fan blade degrease", craft: "Electrical", defaultIncluded: true, priceDeltaINR: 250, durationMinutes: 40 },
      { id: "t3", name: "Decorative string lights safely routed to MCB", craft: "Electrical", defaultIncluded: true, priceDeltaINR: 300, durationMinutes: 45 },
      { id: "t4", name: "Kitchen counter & chimney degreasing", craft: "Cleaning", defaultIncluded: true, priceDeltaINR: 399, durationMinutes: 50 },
      { id: "t5", name: "Front door brass handle polish & lock lubrication", craft: "Carpentry", defaultIncluded: false, priceDeltaINR: 200, durationMinutes: 25 },
    ],
  },
  {
    id: "pack-eldercare",
    title: "Elder Care Weekly Assurance Pack",
    outcomeHeadline: "Home safety inspection + compassionate caregiver shift",
    description: "Bathroom anti-skid check, medicine organizer review, mobility support, and emergency bell check.",
    basePriceINR: 999,
    workerGuaranteedCut: 840,
    estimatedHours: 3,
    badge: "Certified Pros",
    tasks: [
      { id: "e1", name: "3-Hour Certified Geriatric Caregiver Companion", craft: "Caregiver", defaultIncluded: true, priceDeltaINR: 450, durationMinutes: 180 },
      { id: "e2", name: "Bathroom grab-bar tightness & anti-slip mat check", craft: "Handyman", defaultIncluded: true, priceDeltaINR: 250, durationMinutes: 30 },
      { id: "e3", name: "Night light installation / corridor lighting check", craft: "Electrical", defaultIncluded: true, priceDeltaINR: 299, durationMinutes: 30 },
      { id: "e4", name: "Emergency bedside call button test & battery renewal", craft: "Tech", defaultIncluded: false, priceDeltaINR: 180, durationMinutes: 20 },
    ],
  },
  {
    id: "pack-movein",
    title: "Fresh Move-In Deep Prep Pack",
    outcomeHeadline: "Move into a 100% sanitized, verified safe dwelling",
    description: "Full sanitization, lock replacements, electrical grounding test, and plumbing flow audit.",
    basePriceINR: 1599,
    workerGuaranteedCut: 1320,
    estimatedHours: 4,
    badge: "Zero Hassle",
    tasks: [
      { id: "m1", name: "All bathroom steam sanitization & WC descaling", craft: "Cleaning", defaultIncluded: true, priceDeltaINR: 500, durationMinutes: 90 },
      { id: "m2", name: "Main door safety lock cylinder change", craft: "Carpentry", defaultIncluded: true, priceDeltaINR: 400, durationMinutes: 45 },
      { id: "m3", name: "Earthing & polarity check on all power sockets", craft: "Electrical", defaultIncluded: true, priceDeltaINR: 400, durationMinutes: 45 },
      { id: "m4", name: "Kitchen sink trap replacement & leak check", craft: "Plumbing", defaultIncluded: true, priceDeltaINR: 299, durationMinutes: 40 },
    ],
  },
];

// ==========================================
// ABC.MD INNOVATION 2: EXPLAINABLE AI (XAI)
// ==========================================

export interface SHAPFeature {
  feature: string;
  shapValue: number; // positive = pushes toward selection
  description: string;
  category: "skill" | "availability" | "proximity" | "fairness";
}

export interface XAIMatchExplanation {
  workerId: string;
  workerName: string;
  craft: string;
  confidenceScore: number; // 0-1
  shapFeatures: SHAPFeature[];
  giniFairnessIndex: number;
  hoursWorkedThisWeek: number;
  arbitrationAppealAvailable: boolean;
}

export const SAMPLE_XAI_EXPLANATION: XAIMatchExplanation = {
  workerId: "w-01",
  workerName: "Rajesh Kumar",
  craft: "Certified Electrician",
  confidenceScore: 0.94,
  shapFeatures: [
    { feature: "NSDC Tier-3 Skill Certification", shapValue: +0.32, description: "Master Electrician certification from Karnataka Skill Dev Corp", category: "skill" },
    { feature: "Shift & Availability Alignment", shapValue: +0.28, description: "Instant 15-minute response slot available in Indiranagar", category: "availability" },
    { feature: "Hyper-Local Proximity (1.2 km)", shapValue: +0.15, description: "Reduced travel time and low carbon transit footprint", category: "proximity" },
    { feature: "Welfare Workload Balance (+0.12)", shapValue: +0.12, description: "Within optimal weekly limit (26/36 hrs), preventing worker burnout", category: "fairness" },
  ],
  giniFairnessIndex: 0.24,
  hoursWorkedThisWeek: 26,
  arbitrationAppealAvailable: true,
};

// ==========================================
// ABC.MD INNOVATION 3: WORKER PASSPORT & TRUST
// ==========================================

export interface WorkerPassportData {
  uanNumber: string; // e-Shram UAN
  aadhaarKycStatus: "Verified" | "Pending";
  nsdcCertificateId: string;
  gnnTrustScore: number; // 0-100
  multiHopNeighboursCount: number;
  separateQualityRating: number;
  separateWomenSafetyRating: number;
  federatedLearningOptIn: boolean;
  minimumEarningsFloorINR: number;
  activeInsuranceCoverINR: number;
}

export const SAMPLE_WORKER_PASSPORT: WorkerPassportData = {
  uanNumber: "UAN-8821-4401-9012",
  aadhaarKycStatus: "Verified",
  nsdcCertificateId: "NSDC/2023/ELEC/KA-99120",
  gnnTrustScore: 94,
  multiHopNeighboursCount: 38,
  separateQualityRating: 4.94,
  separateWomenSafetyRating: 5.0,
  federatedLearningOptIn: true,
  minimumEarningsFloorINR: 10000,
  activeInsuranceCoverINR: 200000,
};

// ==========================================
// PARAMETRIC MICRO-INSURANCE & LIVE DISRUPTION
// ==========================================

export interface ParametricAlert {
  id: string;
  weatherStation: string;
  triggerCondition: string;
  currentValue: string;
  status: "ACTIVE_DISRUPTION" | "NORMAL";
  autoPayoutAmountINR: number;
  beneficiariesCount: number;
  lastPayoutTime: string;
}

export const ACTIVE_PARAMETRIC_ALERT: ParametricAlert = {
  id: "disrupt-blr-east",
  weatherStation: "Bengaluru East IMD Automated Sensor",
  triggerCondition: "Heavy Rainfall > 45mm/hr",
  currentValue: "52 mm/hr (Level 2 Monsoon Alert)",
  status: "ACTIVE_DISRUPTION",
  autoPayoutAmountINR: 850,
  beneficiariesCount: 42,
  lastPayoutTime: "12 mins ago directly via UPI Lite",
};

