import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';

// ============================================================
// WEALTHY — SVG LOGO
// ============================================================
const WealthyLogo = ({ size = 48, variant = 'default' }) => {
  const colors = {
    default: { primary: '#059669', accent: '#F59E0B', dark: '#0A0A0A' },
    white: { primary: '#FFFFFF', accent: '#FCD34D', dark: '#FFFFFF' },
    dark: { primary: '#10B981', accent: '#FBBF24', dark: '#FFFFFF' },
  }[variant];

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="wGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.accent} />
        </linearGradient>
        <filter id="wShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#wGrad)" filter="url(#wShadow)" />
      <path d="M16 22 L24 42 L32 28 L40 42 L48 22" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M42 18 L48 18 L48 24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="46" r="2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="32" cy="48" r="2" fill="#FFFFFF" opacity="0.7" />
      <circle cx="44" cy="46" r="2" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
};

// ============================================================
// ICONS (Inline SVG — zero dependency)
// ============================================================
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) => {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    receipt: <><path d="M4 2v20l3-3 3 3 3-3 3 3 3-3 3 3V2H4z"/><path d="M9 8h6M9 13h6"/></>,
    income: <><path d="M12 20V4M6 10l6-6 6 6"/></>,
    expense: <><path d="M12 4v16M6 14l6 6 6-6"/></>,
    wallet: <><path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><path d="M22 12h-4a2 2 0 0 0 0 4h4v-4z"/></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    savings: <><path d="M9 4v2M15 4v2"/><path d="M5 10c0-2 2-4 7-4s7 2 7 4v8a2 2 0 0 1-2 2h-1v2h-2v-2h-4v2H8v-2H6a2 2 0 0 1-2-2v-8z"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></>,
    chart: <><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></>,
    search: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></>,
    food: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></>,
    shopping: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></>,
    transport: <><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M7 17v2M17 17v2M7 11h.01M17 11h.01"/></>,
    fuel: <><path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M3 10h12M13 14h4a2 2 0 0 0 2-2V9l3-3M17 22h4"/></>,
    bills: <><path d="M9 2v6M15 2v6M6 8h12l1 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L6 8z"/></>,
    entertainment: <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M10 12l4-2-4-2v4z"/></>,
    health: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></>,
    gift: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M12 7V3M7 3a3 3 0 0 0 0 4h5M17 3a3 3 0 0 1 0 4h-5"/></>,
    bank: <><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/></>,
    upi: <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></>,
    cash: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    sparkle: <><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z"/></>,
    arrowUp: <><path d="M12 19V5M5 12l7-7 7 7"/></>,
    arrowDown: <><path d="M12 5v14M19 12l-7 7-7-7"/></>,
    arrowRight: <><path d="M5 12h14M12 5l7 7-7 7"/></>,
    chevronRight: <><path d="M9 6l6 6-6 6"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    chevronLeft: <><path d="M15 6l-6 6 6 6"/></>,
    close: <><path d="M18 6L6 18M6 6l12 12"/></>,
    check: <><path d="M20 6L9 17l-5-5"/></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>,
    users: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.1a4 4 0 0 1 0 7.8M23 21v-2a4 4 0 0 0-3-3.9"/></>,
    repeat: <><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    check2: <><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></>,
    trash: <><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>,
    home: <><path d="M3 12L12 3l9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 22v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff: <><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18 18 0 0 1 5-6M1 1l22 22M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-3 4M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></>,
    star: <><path d="M12 2l3 7 7 .5-5.5 5 1.5 7-6-3.5L6 21.5l1.5-7L2 9.5 9 9z"/></>,
    zap: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
    trending: <><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.dashboard}
    </svg>
  );
};

// ============================================================
// THEMES
// ============================================================
const THEMES = {
  light: {
    name: 'Light', icon: 'sun',
    bg: '#F8F9FB', card: '#FFFFFF', card2: '#F1F3F7',
    text: '#0A0A0A', text2: '#5A6172', text3: '#9CA3AF',
    border: '#E8EBF0',
    green: '#10B981', greenBg: '#ECFDF5',
    red: '#EF4444', redBg: '#FEF2F2',
    blue: '#3B82F6', blueBg: '#EFF6FF',
    gold: '#F59E0B', goldBg: '#FFFBEB',
    purple: '#8B5CF6', purpleBg: '#F5F3FF',
    shadow: '0 4px 20px rgba(15,23,42,0.06)',
    shadowLg: '0 20px 50px rgba(15,23,42,0.12)',
    gradGreen: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    gradBlue: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    gradHero: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
  },
  dark: {
    name: 'Dark', icon: 'moon',
    bg: '#0A0B0E', card: '#14161C', card2: '#1E2029',
    text: '#FFFFFF', text2: '#9CA3AF', text3: '#6B7280',
    border: '#252831',
    green: '#22C55E', greenBg: 'rgba(34,197,94,0.12)',
    red: '#F87171', redBg: 'rgba(248,113,113,0.12)',
    blue: '#60A5FA', blueBg: 'rgba(96,165,250,0.12)',
    gold: '#FBBF24', goldBg: 'rgba(251,191,36,0.12)',
    purple: '#A78BFA', purpleBg: 'rgba(167,139,250,0.12)',
    shadow: '0 4px 20px rgba(0,0,0,0.4)',
    shadowLg: '0 20px 50px rgba(0,0,0,0.5)',
    gradGreen: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
    gradBlue: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
    gradHero: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)',
  },
  ocean: {
    name: 'Ocean', icon: 'wallet',
    bg: '#F0F9FF', card: '#FFFFFF', card2: '#E0F2FE',
    text: '#0C4A6E', text2: '#0369A1', text3: '#7DD3FC',
    border: '#BAE6FD',
    green: '#0891B2', greenBg: '#CFFAFE',
    red: '#E11D48', redBg: '#FFE4E6',
    blue: '#0284C7', blueBg: '#E0F2FE',
    gold: '#D97706', goldBg: '#FEF3C7',
    purple: '#7C3AED', purpleBg: '#EDE9FE',
    shadow: '0 4px 20px rgba(2,132,199,0.08)',
    shadowLg: '0 20px 50px rgba(2,132,199,0.15)',
    gradGreen: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
    gradBlue: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    gradHero: 'linear-gradient(135deg, #0C4A6E 0%, #075985 50%, #0369A1 100%)',
  },
  sunset: {
    name: 'Sunset', icon: 'sun',
    bg: '#FFF7ED', card: '#FFFFFF', card2: '#FED7AA',
    text: '#7C2D12', text2: '#9A3412', text3: '#FDBA74',
    border: '#FED7AA',
    green: '#16A34A', greenBg: '#DCFCE7',
    red: '#DC2626', redBg: '#FEE2E2',
    blue: '#2563EB', blueBg: '#DBEAFE',
    gold: '#EA580C', goldBg: '#FFEDD5',
    purple: '#9333EA', purpleBg: '#F3E8FF',
    shadow: '0 4px 20px rgba(234,88,12,0.08)',
    shadowLg: '0 20px 50px rgba(234,88,12,0.15)',
    gradGreen: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
    gradBlue: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    gradHero: 'linear-gradient(135deg, #7C2D12 0%, #9A3412 50%, #C2410C 100%)',
  },
  forest: {
    name: 'Forest', icon: 'sparkle',
    bg: '#F0FDF4', card: '#FFFFFF', card2: '#DCFCE7',
    text: '#14532D', text2: '#166534', text3: '#86EFAC',
    border: '#BBF7D0',
    green: '#16A34A', greenBg: '#DCFCE7',
    red: '#DC2626', redBg: '#FEE2E2',
    blue: '#0891B2', blueBg: '#CFFAFE',
    gold: '#CA8A04', goldBg: '#FEF9C3',
    purple: '#7C3AED', purpleBg: '#EDE9FE',
    shadow: '0 4px 20px rgba(22,163,74,0.08)',
    shadowLg: '0 20px 50px rgba(22,163,74,0.15)',
    gradGreen: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
    gradBlue: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
    gradHero: 'linear-gradient(135deg, #14532D 0%, #166534 50%, #15803D 100%)',
  },
  royal: {
    name: 'Royal', icon: 'sparkle',
    bg: '#FAF5FF', card: '#FFFFFF', card2: '#F3E8FF',
    text: '#581C87', text2: '#6B21A8', text3: '#D8B4FE',
    border: '#E9D5FF',
    green: '#7C3AED', greenBg: '#EDE9FE',
    red: '#DB2777', redBg: '#FCE7F3',
    blue: '#6366F1', blueBg: '#E0E7FF',
    gold: '#CA8A04', goldBg: '#FEF9C3',
    purple: '#7C3AED', purpleBg: '#EDE9FE',
    shadow: '0 4px 20px rgba(124,58,237,0.08)',
    shadowLg: '0 20px 50px rgba(124,58,237,0.15)',
    gradGreen: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    gradBlue: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
    gradHero: 'linear-gradient(135deg, #581C87 0%, #6B21A8 50%, #7E22CE 100%)',
  },
};

// ============================================================
// HELPERS
// ============================================================
const fmt = (n) => '₹' + Math.abs(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

const demoUser = {
  id: 'demo',
  name: 'Demo User',
  email: 'demo@wealthy.app',
  password: 'demo123',
  isDemo: true,
  monthlyIncome: 85000,
  onboarded: true,
  theme: 'light',
  accentColor: null,
  accounts: [
    { id: 'a1', type: 'bank', name: 'HDFC Savings', balance: 92450 },
    { id: 'a2', type: 'cash', name: 'Cash Wallet', balance: 7150 },
    { id: 'a3', type: 'upi', name: 'UPI Wallet', balance: 2450 },
  ],
  budgets: [
    { id: 'b1', category: 'Food', amount: 8000, spent: 5420 },
    { id: 'b2', category: 'Shopping', amount: 10000, spent: 7800 },
    { id: 'b3', category: 'Transport', amount: 5000, spent: 3200 },
    { id: 'b4', category: 'Bills', amount: 4000, spent: 2549 },
  ],
  goals: [
    { id: 'g1', name: 'Laptop', target: 80000, saved: 45000 },
    { id: 'g2', name: 'Emergency Fund', target: 200000, saved: 85000 },
  ],
  transactions: [
    { id: 1, date: '2025-09-12', amount: 420, type: 'expense', category: 'Food', merchant: 'Swiggy', method: 'UPI' },
    { id: 2, date: '2025-09-12', amount: 180, type: 'expense', category: 'Transport', merchant: 'Uber', method: 'UPI' },
    { id: 3, date: '2025-09-12', amount: 2000, type: 'income', category: 'Freelance', merchant: 'Acme', method: 'Bank Transfer' },
    { id: 4, date: '2025-09-11', amount: 1250, type: 'expense', category: 'Shopping', merchant: 'Amazon', method: 'Credit Card' },
    { id: 5, date: '2025-09-11', amount: 85000, type: 'income', category: 'Salary', merchant: 'TechCorp India', method: 'Bank Transfer' },
    { id: 6, date: '2025-09-10', amount: 649, type: 'expense', category: 'Bills', merchant: 'Netflix', method: 'Credit Card' },
    { id: 7, date: '2025-09-10', amount: 320, type: 'expense', category: 'Food', merchant: 'Zomato', method: 'UPI' },
    { id: 8, date: '2025-09-09', amount: 5000, type: 'expense', category: 'Bills', merchant: 'Rent', method: 'Bank Transfer' },
  ],
};

// ============================================================
// STORAGE
// ============================================================
const STORAGE_KEY = 'wealthy_users_v1';
const SESSION_KEY = 'wealthy_session_v1';

const loadUsers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveUsers = (users) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(users)); } catch {}
};

const loadSession = () => {
  try { return localStorage.getItem(SESSION_KEY); } catch { return null; }
};

const saveSession = (id) => {
  try {
    if (id) localStorage.setItem(SESSION_KEY, id);
    else localStorage.removeItem(SESSION_KEY);
  } catch {}
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState('welcome'); // welcome | signup | signin | forgot | onboarding
  const [themeName, setThemeName] = useState('light');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = THEMES[themeName] || THEMES.light;

  // Load session on mount
  useEffect(() => {
    const sessionId = loadSession();
    const stored = loadUsers();
    setUsers(stored);

    if (sessionId === 'demo') {
      setUser(demoUser);
      setThemeName(demoUser.theme);
    } else if (sessionId) {
      const found = stored.find(u => u.id === sessionId);
      if (found) {
        setUser(found);
        setThemeName(found.theme || 'light');
      }
    }
    setLoading(false);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.margin = '0';
    document.body.style.fontFamily = "'Inter', -apple-system, system-ui, sans-serif";
    document.body.style.transition = 'background 0.4s ease, color 0.4s ease';
    
    if (!document.getElementById('wealthy-font')) {
      const l = document.createElement('link');
      l.id = 'wealthy-font'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
      document.head.appendChild(l);
    }
  }, [t]);

  const handleDemoLogin = () => {
    setUser(demoUser);
    setThemeName(demoUser.theme);
    saveSession('demo');
  };

  const handleSignup = (data) => {
    const newUser = {
      id: 'u_' + Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      isDemo: false,
      monthlyIncome: 0,
      onboarded: false,
      theme: 'light',
      accounts: [],
      budgets: [],
      goals: [],
      transactions: [],
    };
    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    setUser(newUser);
    saveSession(newUser.id);
    setAuthScreen('onboarding');
  };

  const handleSignin = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { error: 'Invalid email or password' };
    setUser(found);
    setThemeName(found.theme || 'light');
    saveSession(found.id);
    return { success: true };
  };

  const updateUser = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    if (user.isDemo) {
      // Demo user — just update state
      return;
    }
    const updatedUsers = users.map(u => u.id === user.id ? updated : u);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const handleLogout = () => {
    setUser(null);
    saveSession(null);
    setAuthScreen('welcome');
  };

  const handleOnboardingComplete = (data) => {
    const updated = {
      ...user,
      ...data,
      onboarded: true,
      transactions: [
        { id: Date.now() + 1, date: new Date().toISOString().slice(0,10), amount: data.monthlyIncome, type: 'income', category: 'Salary', merchant: 'Monthly Income', method: 'Bank Transfer' },
      ],
    };
    updateUser(updated);
    setAuthScreen('app');
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9FB' }}>
      <WealthyLogo size={64} />
    </div>
  );

  // Not logged in — show auth flow
  if (!user) {
    return (
      <>
        <GlobalStyles t={t} />
        {authScreen === 'welcome' && <WelcomeScreen t={t} onDemo={handleDemoLogin} onSignup={() => setAuthScreen('signup')} onSignin={() => setAuthScreen('signin')} themeName={themeName} setThemeName={setThemeName} />}
        {authScreen === 'signup' && <SignupScreen t={t} onBack={() => setAuthScreen('welcome')} onSignup={handleSignup} onSwitch={() => setAuthScreen('signin')} />}
        {authScreen === 'signin' && <SigninScreen t={t} onBack={() => setAuthScreen('welcome')} onSignin={handleSignin} onSwitch={() => setAuthScreen('signup')} onForgot={() => setAuthScreen('forgot')} onDemo={handleDemoLogin} />}
        {authScreen === 'forgot' && <ForgotScreen t={t} onBack={() => setAuthScreen('signin')} />}
      </>
    );
  }

  // Onboarding
  if (!user.onboarded && authScreen === 'onboarding') {
    return (
      <>
        <GlobalStyles t={t} />
        <OnboardingScreen t={t} user={user} onComplete={handleOnboardingComplete} onSkip={() => { updateUser({ onboarded: true }); setAuthScreen('app'); }} />
      </>
    );
  }

  // Main app
  return (
    <>
      <GlobalStyles t={t} />
      <MainApp user={user} updateUser={updateUser} t={t} themeName={themeName} setThemeName={setThemeName} onLogout={handleLogout} />
    </>
  );
}

// ============================================================
// GLOBAL STYLES
// ============================================================
function GlobalStyles({ t }) {
  return (
    <style>{`
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
      @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes floatUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      
      .fade-up { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
      .fade-in { animation: fadeIn 0.4s ease both; }
      .scale-in { animation: scaleIn 0.45s cubic-bezier(0.16,1,0.3,1) both; }
      .slide-up { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
      .float { animation: float 6s ease-in-out infinite; }
      .spin { animation: spin 1s linear infinite; }
      
      .hover-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1); }
      .hover-lift:hover { transform: translateY(-4px); box-shadow: ${t.shadowLg}; }
      .hover-lift:active { transform: translateY(-1px) scale(0.99); }
      
      .btn { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s, background 0.3s; cursor: pointer; border: none; font-family: inherit; }
      .btn:active { transform: scale(0.96); }
      .btn:disabled { opacity: 0.5; cursor: not-allowed; }
      
      input, select, textarea { font-family: inherit; }
      input:focus, select:focus, textarea:focus { outline: none; }
      
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
      
      @media (min-width: 1025px) { .mobile-only { display: none !important; } }
      @media (max-width: 1024px) { .desktop-only { display: none !important; } }
    `}</style>
  );
}

// ============================================================
// AUTH: WELCOME
// ============================================================
function WelcomeScreen({ t, onDemo, onSignup, onSignin, themeName, setThemeName }) {
  return (
    <div style={{ minHeight: '100vh', background: t.gradHero, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)', animation: 'float 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.25), transparent 70%)', animation: 'float 7s ease-in-out infinite' }} />

      <div className="scale-in" style={{ maxWidth: 420, width: '100%', background: 'rgba(255,255,255,0.98)', borderRadius: 28, padding: 40, boxShadow: '0 30px 80px rgba(0,0,0,0.3)', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div className="float"><WealthyLogo size={72} /></div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', color: '#0A0A0A', marginBottom: 8 }}>
            Wealthy
          </h1>
          <div style={{ fontSize: 13, color: '#059669', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>
            BY MONEY3D
          </div>
          <p style={{ fontSize: 14.5, color: '#5A6172', lineHeight: 1.6, marginTop: 12 }}>
            Know Where Your Money Goes.<br />
            Track. Understand. Save.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onDemo} className="btn" style={{ padding: 16, borderRadius: 14, background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 12px 28px rgba(16,185,129,0.4)' }}>
            <Icon name="zap" size={18} color="#fff" strokeWidth={2.5} />
            Try Demo (No Signup)
          </button>

          <button onClick={onSignup} className="btn" style={{ padding: 16, borderRadius: 14, background: '#0A0A0A', color: '#fff', fontWeight: 700, fontSize: 15 }}>
            Create Account
          </button>

          <button onClick={onSignin} className="btn" style={{ padding: 16, borderRadius: 14, background: 'transparent', color: '#0A0A0A', fontWeight: 600, fontSize: 14, border: '1.5px solid #E8EBF0' }}>
            I already have an account
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 11.5, color: '#9CA3AF' }}>
          🔒 Your data stays on your device
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AUTH: SIGNUP
// ============================================================
function SignupScreen({ t, onBack, onSignup, onSwitch }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return setError('Please enter your name');
    if (!email.includes('@')) return setError('Please enter a valid email');
    if (password.length < 6) return setError('Password must be 6+ characters');
    if (password !== confirm) return setError('Passwords do not match');
    onSignup({ name: name.trim(), email: email.trim().toLowerCase(), password });
  };

  return (
    <AuthLayout t={t} onBack={onBack} title="Create Account" sub="Start your wealth journey today">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <InputField t={t} icon="user" label="Full Name" value={name} onChange={setName} placeholder="Arjun Kumar" />
        <InputField t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
        <InputField t={t} icon="lock" label="Password" value={password} onChange={setPassword} placeholder="At least 6 characters" type={showPass ? 'text' : 'password'} rightIcon={showPass ? 'eyeOff' : 'eye'} onRightClick={() => setShowPass(!showPass)} />
        <InputField t={t} icon="lock" label="Confirm Password" value={confirm} onChange={setConfirm} placeholder="Re-enter password" type="password" />

        {error && <div style={{ padding: 12, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, color: '#DC2626', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="close" size={14} color="#DC2626" /> {error}</div>}

        <button onClick={handleSubmit} className="btn" style={{ padding: 16, borderRadius: 14, background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff', fontWeight: 800, fontSize: 15, boxShadow: '0 12px 28px rgba(16,185,129,0.35)', marginTop: 4 }}>
          Create Account →
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: '#5A6172', marginTop: 8 }}>
          Already have an account?{' '}
          <button onClick={onSwitch} className="btn" style={{ color: '#059669', fontWeight: 700, background: 'transparent', fontSize: 13 }}>
            Sign In
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

// ============================================================
// AUTH: SIGNIN
// ============================================================
function SigninScreen({ t, onBack, onSignin, onSwitch, onForgot, onDemo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) return setError('Please fill all fields');
    const res = onSignin(email.trim().toLowerCase(), password);
    if (res?.error) setError(res.error);
  };

  return (
    <AuthLayout t={t} onBack={onBack} title="Welcome Back" sub="Sign in to continue">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <InputField t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
        <InputField t={t} icon="lock" label="Password" value={password} onChange={setPassword} placeholder="Your password" type={showPass ? 'text' : 'password'} rightIcon={showPass ? 'eyeOff' : 'eye'} onRightClick={() => setShowPass(!showPass)} />

        {error && <div style={{ padding: 12, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, color: '#DC2626', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="close" size={14} color="#DC2626" /> {error}</div>}

        <button onClick={handleSubmit} className="btn" style={{ padding: 16, borderRadius: 14, background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff', fontWeight: 800, fontSize: 15, boxShadow: '0 12px 28px rgba(16,185,129,0.35)', marginTop: 4 }}>
          Sign In →
        </button>

        <button onClick={onDemo} className="btn" style={{ padding: 14, borderRadius: 12, background: '#F1F3F7', color: '#0A0A0A', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Icon name="zap" size={16} color="#0A0A0A" strokeWidth={2.5} />
          Try Demo Instead
        </button>

        <button onClick={onForgot} className="btn" style={{ fontSize: 13, color: '#5A6172', fontWeight: 600, padding: 8, background: 'transparent' }}>
          Forgot password?
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: '#5A6172' }}>
          New here?{' '}
          <button onClick={onSwitch} className="btn" style={{ color: '#059669', fontWeight: 700, background: 'transparent', fontSize: 13 }}>
            Create Account
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

// ============================================================
// AUTH: FORGOT
// ============================================================
function ForgotScreen({ t, onBack }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout t={t} onBack={onBack} title="Reset Password" sub="We'll send you a reset link">
      {!sent ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <InputField t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
          <button onClick={() => email.includes('@') && setSent(true)} className="btn" style={{ padding: 16, borderRadius: 14, background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff', fontWeight: 800, fontSize: 15, boxShadow: '0 12px 28px rgba(16,185,129,0.35)' }}>
            Send Reset Link
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Icon name="check" size={30} color="#10B981" strokeWidth={3} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0A0A', marginBottom: 6 }}>Check your email</div>
          <div style={{ fontSize: 13, color: '#5A6172', lineHeight: 1.6 }}>Reset link sent to {email}</div>
          <button onClick={onBack} className="btn" style={{ marginTop: 20, padding: '12px 20px', borderRadius: 12, background: '#F1F3F7', color: '#0A0A0A', fontWeight: 700, fontSize: 13 }}>
            Back to Sign In
          </button>
        </div>
      )}
    </AuthLayout>
  );
}

// ============================================================
// AUTH LAYOUT + INPUT
// ============================================================
function AuthLayout({ t, onBack, title, sub, children }) {
  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="scale-in" style={{ maxWidth: 420, width: '100%', background: t.card, borderRadius: 26, padding: 32, boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button onClick={onBack} className="btn" style={{ padding: 8, borderRadius: 10, background: t.card2 }}>
            <Icon name="chevronLeft" size={18} color={t.text} />
          </button>
          <WealthyLogo size={32} />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6, color: t.text }}>{title}</h1>
        <p style={{ fontSize: 13.5, color: t.text2, marginBottom: 24 }}>{sub}</p>
        {children}
      </div>
    </div>
  );
}

function InputField({ t, icon, label, value, onChange, placeholder, type = 'text', rightIcon, onRightClick }) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 700, color: t.text3, letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>{label.toUpperCase()}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.card2, border: `1.5px solid ${t.border}`, borderRadius: 12, padding: '12px 14px', transition: 'border-color 0.2s' }}>
        <Icon name={icon} size={16} color={t.text3} />
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 14, fontWeight: 500 }} />
        {rightIcon && (
          <button onClick={onRightClick} className="btn" style={{ padding: 4, background: 'transparent' }}>
            <Icon name={rightIcon} size={16} color={t.text3} />
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ONBOARDING
// ============================================================
function OnboardingScreen({ t, user, onComplete, onSkip }) {
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState('');
  const [accounts, setAccounts] = useState([
    { id: 'a1', type: 'bank', name: 'Bank Account', balance: '', enabled: true },
    { id: 'a2', type: 'cash', name: 'Cash Wallet', balance: '', enabled: true },
    { id: 'a3', type: 'upi', name: 'UPI Wallet', balance: '', enabled: false },
  ]);
  const [budgets, setBudgets] = useState([
    { id: 'b1', category: 'Food', amount: '8000', enabled: true },
    { id: 'b2', category: 'Shopping', amount: '10000', enabled: true },
    { id: 'b3', category: 'Transport', amount: '5000', enabled: true },
    { id: 'b4', category: 'Bills', amount: '4000', enabled: true },
  ]);
  const [goalName, setGoalName] = useState('Emergency Fund');
  const [goalTarget, setGoalTarget] = useState('200000');

  const totalBudget = budgets.filter(b => b.enabled).reduce((s, b) => s + (parseFloat(b.amount) || 0), 0);
  const incomeNum = parseFloat(income) || 0;

  const canProceed = () => {
    if (step === 1) return incomeNum > 0;
    return true;
  };

  const handleFinish = () => {
    const finalAccounts = accounts.filter(a => a.enabled).map(a => ({
      id: a.id, type: a.type, name: a.name, balance: parseFloat(a.balance) || 0,
    }));
    const finalBudgets = budgets.filter(b => b.enabled).map(b => ({
      id: b.id, category: b.category, amount: parseFloat(b.amount) || 0, spent: 0,
    }));
    const finalGoals = goalName && goalTarget ? [{ id: 'g1', name: goalName, target: parseFloat(goalTarget) || 0, saved: 0 }] : [];

    onComplete({
      monthlyIncome: incomeNum,
      accounts: finalAccounts,
      budgets: finalBudgets,
      goals: finalGoals,
    });
  };

  const steps = [
    { title: `Hi ${user.name}! 👋`, sub: "Let's set up your Wealthy account in 4 quick steps.", icon: 'sparkle' },
    { title: 'Monthly Income', sub: 'What\'s your typical monthly income?', icon: 'income' },
    { title: 'Your Accounts', sub: 'Add your accounts with starting balances.', icon: 'wallet' },
    { title: 'Monthly Budgets', sub: 'Set budgets for your main categories.', icon: 'target' },
    { title: 'First Goal', sub: 'What are you saving for?', icon: 'savings' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="scale-in" style={{ maxWidth: 480, width: '100%', background: t.card, borderRadius: 26, padding: 32, boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 28 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i <= step ? t.green : t.border, transition: 'background 0.4s' }} />
          ))}
        </div>

        {/* Header */}
        <div style={{ width: 64, height: 64, borderRadius: 18, background: t.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Icon name={steps[step].icon} size={28} color={t.green} strokeWidth={2.2} />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6, color: t.text }}>{steps[step].title}</h1>
        <p style={{ fontSize: 13.5, color: t.text2, marginBottom: 24, lineHeight: 1.6 }}>{steps[step].sub}</p>

        {/* Step Content */}
        {step === 1 && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: t.text3, letterSpacing: '0.06em' }}>MONTHLY INCOME</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, background: t.card2, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '16px 18px' }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: t.text3 }}>₹</span>
              <input type="number" inputMode="numeric" value={income} onChange={e => setIncome(e.target.value)} placeholder="85000" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {accounts.map((a, i) => (
              <div key={a.id} style={{ background: a.enabled ? t.greenBg : t.card2, border: `1.5px solid ${a.enabled ? t.green : t.border}`, borderRadius: 12, padding: 14, transition: 'all 0.25s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: a.enabled ? 12 : 0 }}>
                  <button onClick={() => setAccounts(accounts.map(x => x.id === a.id ? { ...x, enabled: !x.enabled } : x))} className="btn" style={{ width: 24, height: 24, borderRadius: 7, background: a.enabled ? t.green : t.card, border: `1.5px solid ${a.enabled ? t.green : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {a.enabled && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
                  </button>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: t.text }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: t.text3, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>{a.type}</div>
                </div>
                {a.enabled && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.card, borderRadius: 10, padding: '10px 14px', border: `1px solid ${t.border}` }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: t.text3 }}>₹</span>
                    <input type="number" value={a.balance} onChange={e => setAccounts(accounts.map(x => x.id === a.id ? { ...x, balance: e.target.value } : x))} placeholder="Starting balance" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 14, fontWeight: 600 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div style={{ marginBottom: 20 }}>
            {budgets.map((b) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: t.text }}>{b.category}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: t.card2, border: `1.5px solid ${t.border}`, borderRadius: 10, padding: '8px 12px', width: 130 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.text3 }}>₹</span>
                  <input type="number" value={b.amount} onChange={e => setBudgets(budgets.map(x => x.id === b.id ? { ...x, amount: e.target.value } : x))} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 13, fontWeight: 600, width: '100%' }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 14, background: totalBudget > incomeNum ? '#FEF2F2' : t.greenBg, borderRadius: 12, fontSize: 13, color: totalBudget > incomeNum ? '#DC2626' : '#059669', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Budget</span>
              <span>{fmt(totalBudget)} / {fmt(incomeNum)}</span>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: t.text3, letterSpacing: '0.06em' }}>GOAL NAME</label>
              <input value={goalName} onChange={e => setGoalName(e.target.value)} style={{ width: '100%', marginTop: 8, padding: '13px 16px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 14, fontWeight: 600, outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: t.text3, letterSpacing: '0.06em' }}>TARGET AMOUNT</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, background: t.card2, border: `1.5px solid ${t.border}`, borderRadius: 12, padding: '13px 16px' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: t.text3 }}>₹</span>
                <input type="number" value={goalTarget} onChange={e => setGoalTarget(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 16, fontWeight: 700 }} />
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="btn" style={{ padding: '14px 20px', borderRadius: 12, background: t.card2, color: t.text2, fontWeight: 700, fontSize: 14 }}>
              Back
            </button>
          )}
          <button onClick={onSkip} className="btn" style={{ padding: '14px 16px', borderRadius: 12, color: t.text3, fontSize: 13, fontWeight: 600, background: 'transparent' }}>
            Skip
          </button>
          {step < 4 ? (
            <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()} className="btn" style={{ flex: 1, padding: 14, borderRadius: 12, background: canProceed() ? t.gradGreen : t.card2, color: canProceed() ? '#fff' : t.text3, fontWeight: 800, fontSize: 14, boxShadow: canProceed() ? '0 10px 24px rgba(16,185,129,0.35)' : 'none' }}>
              Continue →
            </button>
          ) : (
            <button onClick={handleFinish} className="btn" style={{ flex: 1, padding: 14, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 800, fontSize: 14, boxShadow: '0 10px 24px rgba(16,185,129,0.35)' }}>
              🎉 Finish Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP (post-login)
// ============================================================
function MainApp({ user, updateUser, t, themeName, setThemeName, onLogout }) {
  const [page, setPage] = useState('dashboard');
  const [mobileNav, setMobileNav] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const transactions = user.transactions || [];
  const accounts = user.accounts || [];
  const budgets = user.budgets || [];
  const goals = user.goals || [];

  const totals = useMemo(() => {
    const income = transactions.filter(x => x.type === 'income').reduce((s, x) => s + x.amount, 0);
    const expense = transactions.filter(x => x.type === 'expense').reduce((s, x) => s + x.amount, 0);
    const savings = income - expense;
    const rate = income > 0 ? (savings / income) * 100 : 0;
    const balance = accounts.reduce((s, a) => s + (a.balance || 0), 0);
    return { income, expense, savings, rate, balance };
  }, [transactions, accounts]);

  const addTransaction = (tx) => {
    updateUser({ transactions: [{ ...tx, id: Date.now() }, ...transactions] });
    setAddOpen(false);
  };

  const deleteTransaction = (id) => {
    updateUser({ transactions: transactions.filter(x => x.id !== id) });
  };

  const nav = [
    { section: 'MAIN', items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'transactions', label: 'Transactions', icon: 'receipt' },
      { id: 'analytics', label: 'Analytics', icon: 'chart' },
    ]},
    { section: 'MONEY', items: [
      { id: 'accounts', label: 'Accounts', icon: 'wallet' },
      { id: 'budgets', label: 'Budgets', icon: 'target' },
      { id: 'savings', label: 'Savings', icon: 'savings' },
    ]},
    { section: 'SYSTEM', items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ]},
  ];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, transition: 'background 0.4s, color 0.4s' }}>
      {/* Sidebar */}
      <aside className="desktop-only" style={{ width: 260, position: 'fixed', top: 0, left: 0, bottom: 0, background: t.card, borderRight: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', zIndex: 40, transition: 'background 0.4s' }}>
        <div style={{ padding: '20px 18px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <WealthyLogo size={38} />
          <div>
            <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: '-0.02em' }}>Wealthy</div>
            <div style={{ fontSize: 9.5, color: t.text3, letterSpacing: '0.1em', fontWeight: 700 }}>BY MONEY3D</div>
          </div>
        </div>

        <div style={{ padding: '0 14px 12px' }}>
          <button onClick={() => setAddOpen(true)} className="btn" style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 800, fontSize: 13.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 20px rgba(16,185,129,0.35)' }}>
            <Icon name="plus" size={17} strokeWidth={2.5} color="#fff" /> Add Transaction
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 12px 16px' }}>
          {nav.map(group => (
            <div key={group.section} style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: t.text3, letterSpacing: '0.12em', padding: '8px 8px 6px' }}>{group.section}</div>
              {group.items.map(item => {
                const active = page === item.id;
                return (
                  <button key={item.id} onClick={() => setPage(item.id)} className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, fontSize: 13.5, fontWeight: active ? 700 : 500, background: active ? t.greenBg : 'transparent', color: active ? t.green : t.text2, marginBottom: 2, textAlign: 'left' }}>
                    <Icon name={item.icon} size={17} color={active ? t.green : t.text2} strokeWidth={active ? 2.4 : 2} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Profile bottom */}
        <div style={{ padding: 12, borderTop: `1px solid ${t.border}` }}>
          <button onClick={() => setProfileOpen(true)} className="btn" style={{ width: '100%', padding: 10, borderRadius: 12, background: t.card2, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
              <div style={{ fontSize: 10.5, color: t.text3 }}>{user.isDemo ? 'Demo Account' : 'Personal'}</div>
            </div>
            {user.isDemo && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: t.goldBg, color: t.gold, fontWeight: 800, letterSpacing: '0.05em' }}>DEMO</span>}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="mobile-only" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30, background: t.card, borderBottom: `1px solid ${t.border}`, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <WealthyLogo size={30} />
          <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: '-0.02em' }}>Wealthy</div>
        </div>
        <button onClick={() => setMobileNav(!mobileNav)} className="btn" style={{ padding: 8 }}>
          <Icon name="menu" size={22} color={t.text} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileNav && (
        <div className="mobile-only fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 50 }} onClick={() => setMobileNav(false)}>
          <div className="slide-up" onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: t.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' }} />
            {nav.flatMap(g => g.items).map(item => {
              const active = page === item.id;
              return (
                <button key={item.id} onClick={() => { setPage(item.id); setMobileNav(false); }} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, textAlign: 'left', background: active ? t.greenBg : 'transparent', color: active ? t.green : t.text, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <Icon name={item.icon} size={18} color={active ? t.green : t.text2} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="main-area" style={{ marginLeft: 260, padding: '28px 32px 100px', minHeight: '100vh' }}>
        <style>{`@media (max-width: 1024px) { .main-area { margin-left: 0 !important; padding: 76px 16px 100px !important; } }`}</style>

        <div className="desktop-only" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 4, textTransform: 'capitalize' }}>{page}</h1>
          <p style={{ fontSize: 13.5, color: t.text2 }}>Welcome back, {user.name.split(' ')[0]} 👋</p>
        </div>

        <div key={page} className="fade-up">
          {page === 'dashboard' && <DashboardPage t={t} user={user} totals={totals} transactions={transactions} setPage={setPage} onAdd={() => setAddOpen(true)} />}
          {page === 'transactions' && <TransactionsPage t={t} transactions={transactions} onDelete={deleteTransaction} />}
          {page === 'analytics' && <AnalyticsPage t={t} transactions={transactions} totals={totals} />}
          {page === 'accounts' && <AccountsPage t={t} accounts={accounts} onUpdate={(updated) => updateUser({ accounts: updated })} />}
          {page === 'budgets' && <BudgetsPage t={t} budgets={budgets} onUpdate={(updated) => updateUser({ budgets: updated })} />}
          {page === 'savings' && <SavingsPage t={t} goals={goals} onUpdate={(updated) => updateUser({ goals: updated })} />}
          {page === 'settings' && <SettingsPage t={t} user={user} updateUser={updateUser} themeName={themeName} setThemeName={setThemeName} onLogout={onLogout} />}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="mobile-only" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: t.card, borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 8px 18px', backdropFilter: 'blur(20px)' }}>
        {[
          { id: 'dashboard', label: 'Home', icon: 'dashboard' },
          { id: 'transactions', label: 'Activity', icon: 'receipt' },
        ].map(i => {
          const active = page === i.id;
          return (
            <button key={i.id} onClick={() => setPage(i.id)} className="btn" style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Icon name={i.icon} size={22} color={active ? t.green : t.text3} strokeWidth={active ? 2.5 : 2} />
              <span style={{ fontSize: 10, fontWeight: 700, color: active ? t.green : t.text3 }}>{i.label}</span>
            </button>
          );
        })}
        <button onClick={() => setAddOpen(true)} className="btn" style={{ width: 56, height: 56, borderRadius: '50%', background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(16,185,129,0.5)', marginTop: -20 }}>
          <Icon name="plus" size={26} color="#fff" strokeWidth={2.5} />
        </button>
        {[
          { id: 'analytics', label: 'Stats', icon: 'chart' },
          { id: 'settings', label: 'Profile', icon: 'settings' },
        ].map(i => {
          const active = page === i.id;
          return (
            <button key={i.id} onClick={() => setPage(i.id)} className="btn" style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Icon name={i.icon} size={22} color={active ? t.green : t.text3} strokeWidth={active ? 2.5 : 2} />
              <span style={{ fontSize: 10, fontWeight: 700, color: active ? t.green : t.text3 }}>{i.label}</span>
            </button>
          );
        })}
      </div>

      {addOpen && <AddTransactionModal t={t} onClose={() => setAddOpen(false)} onSave={addTransaction} />}
      {profileOpen && <ProfileModal t={t} user={user} updateUser={updateUser} onClose={() => setProfileOpen(false)} onLogout={onLogout} />}
    </div>
  );
}

// ============================================================
// PAGES
// ============================================================
function DashboardPage({ t, user, totals, transactions, setPage, onAdd }) {
  const recent = transactions.slice(0, 6);
  return (
    <div>
      <div className="hover-lift" style={{ borderRadius: 24, padding: '30px 26px', background: t.gradHero, color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: 20, boxShadow: t.shadowLg }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 6 }}>TOTAL BALANCE</div>
          <div style={{ fontSize: 'clamp(30px, 8vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 4 }}>{fmt(totals.balance)}</div>
          <div style={{ fontSize: 12.5, opacity: 0.75, marginBottom: 24 }}>September 2025</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: 'Income', value: totals.income, icon: 'arrowDown', color: '#4ADE80' },
              { label: 'Expense', value: totals.expense, icon: 'arrowUp', color: '#F87171' },
              { label: 'Savings', value: totals.savings, icon: 'savings', color: '#60A5FA' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6, fontSize: 10.5, opacity: 0.85, fontWeight: 600 }}>
                  <Icon name={s.icon} size={12} color={s.color} />
                  {s.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em' }}>{fmt(s.value)}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <button onClick={onAdd} className="btn" style={{ padding: '12px 20px', borderRadius: 12, background: '#fff', color: '#059669', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
              <Icon name="plus" size={16} strokeWidth={2.5} color="#059669" /> Add Transaction
            </button>
            <button onClick={() => setPage('analytics')} className="btn" style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 7 }}>
              <Icon name="chart" size={14} color="#fff" /> Analytics
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: 12, marginBottom: 20 }}>
        <StatCard t={t} label="Savings Rate" value={totals.rate.toFixed(1) + '%'} sub="Of income" color={t.green} icon="target" />
        <StatCard t={t} label="Transactions" value={transactions.length} sub="This month" color={t.blue} icon="receipt" />
        <StatCard t={t} label="Daily Avg" value={fmt(totals.expense / 30)} sub="Per day" color={t.gold} icon="clock" />
      </div>

      <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow }}>
        <div style={{ padding: '18px 22px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15.5, fontWeight: 800 }}>Recent Transactions</div>
          <button onClick={() => setPage('transactions')} className="btn" style={{ fontSize: 12, color: t.green, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 3, background: 'transparent' }}>
            View all <Icon name="chevronRight" size={14} color={t.green} />
          </button>
        </div>
        {recent.length === 0 ? (
          <EmptyState t={t} icon="receipt" title="No transactions yet" sub="Add your first transaction to get started" onAdd={onAdd} />
        ) : (
          recent.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === recent.length - 1} />)
        )}
      </div>
    </div>
  );
}

function TransactionsPage({ t, transactions, onDelete }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? transactions : transactions.filter(x => x.type === filter);
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {[{ id: 'all', label: 'All' }, { id: 'income', label: 'Income' }, { id: 'expense', label: 'Expense' }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className="btn" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: filter === f.id ? t.gradGreen : t.card, color: filter === f.id ? '#fff' : t.text2, border: `1px solid ${filter === f.id ? 'transparent' : t.border}`, whiteSpace: 'nowrap', boxShadow: filter === f.id ? '0 6px 16px rgba(16,185,129,0.3)' : 'none' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow }}>
        {filtered.length === 0 ? (
          <EmptyState t={t} icon="receipt" title="No transactions" sub="Nothing to show here yet" />
        ) : (
          filtered.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === filtered.length - 1} onDelete={onDelete} />)
        )}
      </div>
    </div>
  );
}

function AnalyticsPage({ t, transactions, totals }) {
  const byCategory = useMemo(() => {
    const m = {};
    transactions.filter(x => x.type === 'expense').forEach(x => { m[x.category] = (m[x.category] || 0) + x.amount; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  const byMethod = useMemo(() => {
    const m = {};
    transactions.filter(x => x.type === 'expense').forEach(x => { m[x.method] = (m[x.method] || 0) + x.amount; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  const maxCat = byCategory[0]?.[1] || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 18 }}>Spending by Category</div>
        {byCategory.length === 0 ? <EmptyState t={t} icon="chart" title="No data yet" sub="Add expenses to see analytics" /> : (
          byCategory.map(([cat, amt]) => (
            <div key={cat} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12.5 }}>
                <span style={{ fontWeight: 700 }}>{cat}</span>
                <span style={{ color: t.text2, fontWeight: 800 }}>{fmt(amt)}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: t.card2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(amt / maxCat) * 100}%`, background: t.gradGreen, borderRadius: 4, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 18 }}>Payment Methods</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          {byMethod.map(([method, amt]) => (
            <div key={method} style={{ background: t.card2, borderRadius: 14, padding: 16, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 11, color: t.text2, fontWeight: 700, marginBottom: 6 }}>{method}</div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>{fmt(amt)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountsPage({ t, accounts, onUpdate }) {
  const [editing, setEditing] = useState(null);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
      {accounts.map(a => (
        <div key={a.id} className="hover-lift" style={{ background: t.card, borderRadius: 18, padding: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10.5, color: t.text3, fontWeight: 800, letterSpacing: '0.08em' }}>{a.type.toUpperCase()}</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 3 }}>{a.name}</div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: t.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={a.type === 'bank' ? 'bank' : a.type === 'cash' ? 'cash' : a.type === 'upi' ? 'upi' : 'wallet'} size={18} color={t.green} />
            </div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>{fmt(a.balance)}</div>
          <button onClick={() => setEditing(a)} className="btn" style={{ padding: '8px 14px', borderRadius: 9, background: t.card2, color: t.text2, fontSize: 12, fontWeight: 700 }}>
            ✏️ Edit Balance
          </button>
        </div>
      ))}
      {editing && (
        <EditModal t={t} title={`Edit ${editing.name}`} onClose={() => setEditing(null)} onSave={(val) => {
          const updated = accounts.map(x => x.id === editing.id ? { ...x, balance: parseFloat(val) || 0 } : x);
          onUpdate(updated);
          setEditing(null);
        }} fields={[{ key: 'balance', label: 'Balance (₹)', value: editing.balance, type: 'number' }]} />
      )}
    </div>
  );
}

function BudgetsPage({ t, budgets, onUpdate }) {
  const [editing, setEditing] = useState(null);
  const totalBudget = budgets.reduce((s, b) => s + b.amount, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const pct = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div>
      <div style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: t.text2, fontWeight: 800, letterSpacing: '0.06em', marginBottom: 5 }}>TOTAL BUDGET</div>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em' }}>{fmt(totalSpent)} <span style={{ fontSize: 14, color: t.text3, fontWeight: 500 }}>/ {fmt(totalBudget)}</span></div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: pct > 75 ? t.gold : t.green }}>{pct.toFixed(0)}%</div>
        </div>
        <div style={{ height: 10, borderRadius: 5, background: t.card2, overflow: 'hidden', marginTop: 14 }}>
          <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: pct > 75 ? t.gold : t.gradGreen, borderRadius: 5, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {budgets.map(b => {
          const p = b.amount > 0 ? (b.spent / b.amount) * 100 : 0;
          const rem = b.amount - b.spent;
          return (
            <div key={b.id} className="hover-lift" style={{ background: t.card, borderRadius: 18, padding: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{b.category}</div>
                <div style={{ fontSize: 11, padding: '3px 9px', borderRadius: 6, background: p > 80 ? t.redBg : t.greenBg, color: p > 80 ? t.red : t.green, fontWeight: 800 }}>{p.toFixed(0)}%</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: t.text2, marginBottom: 9 }}>
                <span><b style={{ color: t.text }}>{fmt(b.spent)}</b> spent</span>
                <span>{fmt(b.amount)}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: t.card2, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ height: '100%', width: `${Math.min(p, 100)}%`, background: p > 80 ? `linear-gradient(90deg, ${t.gold}, ${t.red})` : t.gradGreen, borderRadius: 4 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 12, color: rem > 0 ? t.green : t.red, fontWeight: 800 }}>{rem > 0 ? `${fmt(rem)} left` : `${fmt(-rem)} over`}</div>
                <button onClick={() => setEditing(b)} className="btn" style={{ padding: '6px 10px', borderRadius: 8, background: t.card2, color: t.text2, fontSize: 11, fontWeight: 700 }}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <EditModal t={t} title={`Edit ${editing.category} Budget`} onClose={() => setEditing(null)} onSave={(data) => {
          const updated = budgets.map(x => x.id === editing.id ? { ...x, amount: parseFloat(data.amount) || 0, spent: parseFloat(data.spent) || 0 } : x);
          onUpdate(updated);
          setEditing(null);
        }} fields={[
          { key: 'amount', label: 'Budget Amount (₹)', value: editing.amount, type: 'number' },
          { key: 'spent', label: 'Spent So Far (₹)', value: editing.spent, type: 'number' },
        ]} />
      )}
    </div>
  );
}

function SavingsPage({ t, goals, onUpdate }) {
  const [editing, setEditing] = useState(null);
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {goals.map(g => {
          const p = g.target > 0 ? (g.saved / g.target) * 100 : 0;
          const r = 52, c = 2 * Math.PI * r;
          return (
            <div key={g.id} className="hover-lift" style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
              <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                  <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="60" cy="60" r={r} fill="none" stroke={t.card2} strokeWidth="10" />
                    <circle cx="60" cy="60" r={r} fill="none" stroke={t.green} strokeWidth="10" strokeDasharray={c} strokeDashoffset={c - (c * p / 100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }} />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="savings" size={22} color={t.green} />
                    <div style={{ fontSize: 14, fontWeight: 900, marginTop: 4 }}>{p.toFixed(0)}%</div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{g.name}</div>
                  <div style={{ fontSize: 12.5, color: t.text2, marginBottom: 10 }}><b style={{ color: t.text }}>{fmt(g.saved)}</b> / {fmt(g.target)}</div>
                  <button onClick={() => setEditing(g)} className="btn" style={{ padding: '8px 14px', borderRadius: 9, background: t.card2, color: t.text2, fontSize: 12, fontWeight: 700 }}>✏️ Edit</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {editing && (
        <EditModal t={t} title={`Edit ${editing.name}`} onClose={() => setEditing(null)} onSave={(data) => {
          const updated = goals.map(x => x.id === editing.id ? { ...x, saved: parseFloat(data.saved) || 0, target: parseFloat(data.target) || 0 } : x);
          onUpdate(updated);
          setEditing(null);
        }} fields={[
          { key: 'saved', label: 'Saved Amount (₹)', value: editing.saved, type: 'number' },
          { key: 'target', label: 'Target Amount (₹)', value: editing.target, type: 'number' },
        ]} />
      )}
    </div>
  );
}

function SettingsPage({ t, user, updateUser, themeName, setThemeName, onLogout }) {
  const [name, setName] = useState(user.name);
  const themes = Object.keys(THEMES);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Profile */}
      <div style={{ background: t.card, borderRadius: 18, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 16 }}>Profile</div>
        <label style={{ fontSize: 11, fontWeight: 800, color: t.text3, letterSpacing: '0.06em' }}>NAME</label>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input value={name} onChange={e => setName(e.target.value)} style={{ flex: 1, padding: '12px 16px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 14, fontWeight: 600, outline: 'none' }} />
          <button onClick={() => name.trim() && updateUser({ name: name.trim() })} className="btn" style={{ padding: '12px 20px', borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 800, fontSize: 13 }}>Save</button>
        </div>
        <div style={{ marginTop: 16, padding: 12, background: t.card2, borderRadius: 10, fontSize: 12.5, color: t.text2 }}>
          <b style={{ color: t.text }}>Email:</b> {user.email}
        </div>
        <div style={{ marginTop: 8, padding: 12, background: t.goldBg, borderRadius: 10, fontSize: 12.5, color: t.gold, fontWeight: 700 }}>
          {user.isDemo ? '⚡ Demo Account — data will not be saved permanently' : '✓ Your data is saved on this device'}
        </div>
      </div>

      {/* Theme */}
      <div style={{ background: t.card, borderRadius: 18, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 16 }}>Theme</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 10 }}>
          {themes.map(name => {
            const th = THEMES[name];
            const active = themeName === name;
            return (
              <button key={name} onClick={() => { setThemeName(name); updateUser({ theme: name }); }} className="btn" style={{ padding: 14, borderRadius: 14, background: th.bg, border: `2px solid ${active ? th.green : 'transparent'}`, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: active ? `0 0 0 4px ${th.green}25` : 'none' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: th.green }} />
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: th.gold }} />
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: th.text }} />
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: th.text }}>{th.name}</div>
                {active && <div style={{ fontSize: 10, color: th.green, fontWeight: 800 }}>✓ ACTIVE</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Security */}
      <div style={{ background: t.card, borderRadius: 18, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 14 }}>🔒 Privacy & Security</div>
        <div style={{ padding: 14, background: t.greenBg, borderRadius: 12, fontSize: 12.5, color: t.text2, lineHeight: 1.7 }}>
          <b style={{ color: t.text }}>Your data is protected.</b> All data is stored locally on your device. We never store full account numbers, CVV, PIN, or passwords.
        </div>
      </div>

      {/* Logout */}
      <button onClick={onLogout} className="btn" style={{ padding: 16, borderRadius: 14, background: t.redBg, color: t.red, fontWeight: 800, fontSize: 14, border: `1.5px solid ${t.red}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Icon name="logout" size={16} color={t.red} />
        Logout
      </button>
    </div>
  );
}

// ============================================================
// COMPONENTS
// ============================================================
function StatCard({ t, label, value, sub, color, icon }) {
  return (
    <div className="hover-lift" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16, boxShadow: t.shadow }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: t.text2, fontWeight: 700 }}>{label}</div>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={15} color={color} strokeWidth={2.3} />
        </div>
      </div>
      <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 3 }}>{value}</div>
      <div style={{ fontSize: 11, color: t.text3 }}>{sub}</div>
    </div>
  );
}

function TxRow({ tx, t, last, onDelete }) {
  const isIncome = tx.type === 'income';
  const color = isIncome ? t.green : t.red;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 22px', borderBottom: last ? 'none' : `1px solid ${t.border}` }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={isIncome ? 'arrowDown' : 'arrowUp'} size={18} color={color} strokeWidth={2.5} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.merchant}</div>
        <div style={{ fontSize: 11, color: t.text3 }}>
          {tx.category} · {tx.method} · {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 900, color, letterSpacing: '-0.01em' }}>{isIncome ? '+' : '-'}{fmt(tx.amount)}</div>
        {onDelete && (
          <button onClick={() => onDelete(tx.id)} className="btn" style={{ fontSize: 10, color: t.red, fontWeight: 700, background: 'transparent', marginTop: 2 }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyState({ t, icon, title, sub, onAdd }) {
  return (
    <div style={{ padding: 50, textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: 18, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <Icon name={icon} size={28} color={t.text3} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: t.text3, marginBottom: onAdd ? 16 : 0 }}>{sub}</div>
      {onAdd && (
        <button onClick={onAdd} className="btn" style={{ padding: '10px 20px', borderRadius: 10, background: t.gradGreen, color: '#fff', fontWeight: 800, fontSize: 13 }}>
          + Add Transaction
        </button>
      )}
    </div>
  );
}

function EditModal({ t, title, onClose, onSave, fields }) {
  const [values, setValues] = useState(() => {
    const v = {};
    fields.forEach(f => v[f.key] = f.value);
    return v;
  });

  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="scale-in" style={{ background: t.card, borderRadius: 20, padding: 24, maxWidth: 400, width: '100%', boxShadow: t.shadowLg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>{title}</div>
          <button onClick={onClose} className="btn" style={{ padding: 6, borderRadius: 8, background: t.card2 }}>
            <Icon name="close" size={16} color={t.text} />
          </button>
        </div>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 800, color: t.text3, letterSpacing: '0.06em' }}>{f.label.toUpperCase()}</label>
            <input type={f.type} value={values[f.key]} onChange={e => setValues({ ...values, [f.key]: e.target.value })} style={{ width: '100%', marginTop: 6, padding: '12px 16px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 14, fontWeight: 600, outline: 'none' }} />
          </div>
        ))}
        <button onClick={() => onSave(values)} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 800, fontSize: 14, marginTop: 8, boxShadow: '0 10px 24px rgba(16,185,129,0.35)' }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

function AddTransactionModal({ t, onClose, onSave }) {
  const [kind, setKind] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [merchant, setMerchant] = useState('');
  const [method, setMethod] = useState('UPI');

  const expenseCats = ['Food', 'Shopping', 'Transport', 'Bills', 'Health', 'Entertainment', 'Fuel', 'Other'];
  const incomeCats = ['Salary', 'Freelance', 'Business', 'Other'];
  const methods = ['UPI', 'Debit Card', 'Credit Card', 'Cash', 'Bank Transfer'];
  const cats = kind === 'income' ? incomeCats : expenseCats;

  const handleSave = () => {
    if (!amount || !merchant) return;
    onSave({
      amount: parseFloat(amount),
      type: kind,
      category,
      merchant: merchant.trim(),
      method,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
    });
  };

  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="slide-up" style={{ background: t.card, borderTopLeftRadius: 26, borderTopRightRadius: 26, width: '100%', maxWidth: 540, maxHeight: '94vh', overflowY: 'auto', padding: 24 }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div style={{ fontSize: 19, fontWeight: 900, letterSpacing: '-0.02em' }}>Add Transaction</div>
          <button onClick={onClose} className="btn" style={{ padding: 8, borderRadius: 8, background: t.card2 }}>
            <Icon name="close" size={18} color={t.text} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          {[
            { id: 'expense', label: 'MONEY OUT', icon: 'arrowUp', color: t.red, bg: t.redBg },
            { id: 'income', label: 'MONEY IN', icon: 'arrowDown', color: t.green, bg: t.greenBg },
          ].map(k => {
            const active = kind === k.id;
            return (
              <button key={k.id} onClick={() => { setKind(k.id); setCategory(k.id === 'income' ? 'Salary' : 'Food'); }} className="btn" style={{ flex: 1, padding: 14, borderRadius: 12, background: active ? k.bg : t.card2, border: `1.5px solid ${active ? k.color : t.border}`, color: active ? k.color : t.text2, fontWeight: 800, fontSize: 12, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <Icon name={k.icon} size={15} color={active ? k.color : t.text2} strokeWidth={2.4} />
                {k.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 11, fontWeight: 800, color: t.text3, letterSpacing: '0.06em' }}>AMOUNT</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, background: t.card2, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '16px 18px' }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: t.text3 }}>₹</span>
            <input type="number" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 800, color: t.text3, letterSpacing: '0.06em' }}>CATEGORY</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', marginTop: 8, padding: '13px 14px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 13.5, fontWeight: 700, outline: 'none' }}>
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 800, color: t.text3, letterSpacing: '0.06em' }}>METHOD</label>
            <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', marginTop: 8, padding: '13px 14px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 13.5, fontWeight: 700, outline: 'none' }}>
              {methods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 11, fontWeight: 800, color: t.text3, letterSpacing: '0.06em' }}>MERCHANT / SOURCE</label>
          <input value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Swiggy, Salary" style={{ width: '100%', marginTop: 8, padding: '13px 16px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 14, outline: 'none', fontWeight: 600 }} />
        </div>

        <button onClick={handleSave} disabled={!amount || !merchant} className="btn" style={{ width: '100%', padding: 17, borderRadius: 14, background: (!amount || !merchant) ? t.card2 : t.gradGreen, color: (!amount || !merchant) ? t.text3 : '#fff', fontSize: 15, fontWeight: 900, boxShadow: (!amount || !merchant) ? 'none' : '0 10px 25px rgba(16,185,129,0.35)' }}>
          Save Transaction
        </button>
      </div>
    </div>
  );
}

function ProfileModal({ t, user, updateUser, onClose, onLogout }) {
  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="scale-in" style={{ background: t.card, borderRadius: 20, padding: 26, maxWidth: 400, width: '100%', boxShadow: t.shadowLg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 900 }}>Profile</div>
          <button onClick={onClose} className="btn" style={{ padding: 6, borderRadius: 8, background: t.card2 }}>
            <Icon name="close" size={16} color={t.text} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: t.card2, borderRadius: 14, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: '#fff' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: t.text3, marginTop: 2 }}>{user.email}</div>
          </div>
        </div>

        {user.isDemo && (
          <div style={{ padding: 12, background: t.goldBg, borderRadius: 10, fontSize: 12, color: t.gold, fontWeight: 700, marginBottom: 14 }}>
            ⚡ You're using a Demo account. Sign up to save your data!
          </div>
        )}

        <button onClick={() => { onLogout(); onClose(); }} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: t.redBg, color: t.red, fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Icon name="logout" size={16} color={t.red} />
          Logout
        </button>
      </div>
    </div>
  );
}