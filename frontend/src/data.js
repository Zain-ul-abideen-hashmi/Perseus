export const COHORTS = {
  hero: {
    key: 'hero', name: 'Left at the hero', trust: 0.24, urg: 0.66, skep: 0.87, bud: 0.52, dist: 0.31,
    trend: 'closest group',
    note: 'They wanted it. Nothing on the page proved the claim, so skepticism held and they left while still interested. Fixing this is worth more than fixing any later step.',
  },
  email: {
    key: 'email', name: 'Left at welcome email', trust: 0.51, urg: 0.38, skep: 0.44, bud: 0.49, dist: 0.58,
    trend: 'stalled, not lost',
    note: 'Attention scattered across equal-looking options and never settled. A recommendation instead of a menu would move this group.',
  },
  price: {
    key: 'price', name: 'Left at pricing', trust: 0.58, urg: 0.55, skep: 0.41, bud: 0.88, dist: 0.44,
    trend: 'close, price-blocked',
    note: 'Trust was fine. The number arrived with no frame around it, and financing sits below where most people stop reading.',
  },
  cal: {
    key: 'cal', name: 'Left at the calendar', trust: 0.67, urg: 0.19, skep: 0.31, bud: 0.44, dist: 0.79,
    trend: 'no reason to act',
    note: 'Convinced but unhurried. They intended to come back, and mostly did not. Lowest-value group to chase.',
  },
  won: {
    key: 'won', name: 'Booked', trust: 0.83, urg: 0.71, skep: 0.18, bud: 0.36, dist: 0.09,
    trend: 'converted',
    note: 'Trust cleared the bar before patience ran out. This is the state vector every fix is trying to reach.',
  },
};

export const NAV = [
  { group: 'FUNNEL', items: [
    { key: 'funnel', label: 'Touchpoint map', ref: '§6.2' },
    { key: 'variants', label: 'Variants & gate', ref: '§6.1' },
    { key: 'replay', label: 'Simulation replay', ref: '§10' },
    { key: 'persona', label: 'Who converts', ref: '§7' },
  ]},
  { group: 'SHARED', items: [
    { key: 'gaze', label: "Medusa's Gaze", ref: '§15' },
    { key: 'cal', label: "Bernard's Loop", ref: '§5' },
    { key: 'bottle', label: 'Bottlenecks', ref: '§9' },
  ]},
];

export const TITLES = {
  funnel:   ['§6.2 · TOUCHPOINT INGESTION', 'Funnel touchpoint map'],
  variants: ['§6.1 · PROPOSE, NEVER COMMIT', 'Variants & the promotion gate'],
  replay:   ['§10 · SIMULATION REPLAY', 'Where the 100 go'],
  persona:  ['§7 · PERSONA CONVERTIBILITY', 'Who converts, and who nearly did'],
  gaze:     ["ADDENDUM · §16 MEDUSA'S GAZE", 'Attention, entropy & perceived time'],
  cal:      ['§5 · BERNARD’S LOOP', "Bernard's Loop — layered calibration"],
  bottle:   ['§10 + §16.7 · SIXTEEN TRACKED ITEMS', 'Bottlenecks & open problems'],
};

export const LOAD_STEPS = [
  'Reading the funnel · 22 touchpoints tagged',
  'Building a buyer population matched to your traffic',
  'Walking every buyer through the funnel',
  "Ranking what's costing you the most",
];

export const LOAD_COPY = [
  ['Reading your funnel', 'Tagging each page and email by what kind of friction it carries.'],
  ['Building the buyers', 'Personas drawn to match where your traffic actually comes from, each with its own patience and skepticism.'],
  ['Running the passes', 'Every buyer walks the funnel. Most of them leave somewhere.'],
  ['Ranking the damage', 'Sorting the drop-off by how much of the loss each step owns.'],
];

export const BOTTLENECKS = [
  { id: 'B1', tone: 'red', problem: 'No numeric promotion policy for variant winners', status: 'OPEN', statusTone: 'red', blocks: 'promotion gate' },
  { id: 'B2', tone: 'red', problem: 'Funnel-stage normalization across different businesses', status: 'OPEN · NOW FIRST', statusTone: 'red2', blocks: '§6.3 pooling' },
  { id: 'B3', tone: 'blush', problem: 'Niche clustering: industry label vs. empirical traits', status: 'DIRECTION SET', statusTone: 'blush', blocks: 'Layer 2' },
  { id: 'B4', tone: 'red', problem: 'Resistance decay needs a way to recognise repeated tactics', status: 'REDUCED IN v3', statusTone: 'blush', blocks: '§7.4 · pre-tagged' },
  { id: 'B5', tone: 'red', problem: 'Pooling between directly competing businesses', status: 'OPEN · MORE URGENT', statusTone: 'red2', blocks: 'query-layer rule' },
  { id: 'B6', tone: 'red', problem: '10⁵ personas in <15 s within the per-job memory budget', status: 'UNVERIFIED', statusTone: 'red', blocks: '§11 · de-risked by §4.2' },
  { id: 'B7', tone: 'pink', problem: 'Synthetic significance never reported as real evidence', status: 'DISCIPLINE', statusTone: 'pink', blocks: 'every screen' },
  { id: 'B8', tone: 'mute', problem: 'Voice/call channel ingestion', status: 'REMOVED §8', statusTone: 'mute', blocks: 'consent law', struck: true },
  { id: 'B9', tone: 'red', problem: 'Gaze network has no training signal', status: 'OPEN', statusTone: 'red', blocks: '§15 entire' },
  { id: 'B10', tone: 'red', problem: 'Entropy ↔ time constants (k, τ) uncalibrated', status: 'OPEN', statusTone: 'red', blocks: '§15.4' },
  { id: 'B11', tone: 'blush', problem: 'Attention temperature as function of drive-state', status: 'DIRECTION SET', statusTone: 'blush', blocks: '§15.3' },
  { id: 'B12', tone: 'red', problem: 'Hunger → food-cue bias effect size contested', status: 'CONTESTED', statusTone: 'red', blocks: 'prior only' },
];

export const pc = (n) => Math.round(n * 100);

// hex (not CSS vars) so chart components can append opacity suffixes like `${c}66`
export const distColor = (d) => (d < 0.6 ? '#ff69b4' : d < 0.8 ? '#f7b7cd' : '#ff4d6d');
