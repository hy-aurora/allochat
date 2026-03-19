export type RoomCategory = {
  id: string;
  label: string;
  emoji: string;
  color: string;
  description: string;
};

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: 'general',
    label: 'General',
    emoji: '💬',
    color: '#6366f1',
    description: 'General conversation',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    emoji: '🎮',
    color: '#8b5cf6',
    description: 'Video games & esports',
  },
  {
    id: 'music',
    label: 'Music',
    emoji: '🎵',
    color: '#ec4899',
    description: 'Music, artists & playlists',
  },
  {
    id: 'coding',
    label: 'Coding',
    emoji: '💻',
    color: '#14b8a6',
    description: 'Programming & development',
  },
  {
    id: 'language',
    label: 'Language',
    emoji: '🌍',
    color: '#f59e0b',
    description: 'Language learning & exchange',
  },
  {
    id: 'study',
    label: 'Study',
    emoji: '📚',
    color: '#3b82f6',
    description: 'Study groups & academics',
  },
  {
    id: 'art',
    label: 'Art & Design',
    emoji: '🎨',
    color: '#f97316',
    description: 'Art, design & creativity',
  },
  {
    id: 'sports',
    label: 'Sports',
    emoji: '⚽',
    color: '#22c55e',
    description: 'Sports & fitness',
  },
  {
    id: 'movies',
    label: 'Movies & TV',
    emoji: '🎬',
    color: '#ef4444',
    description: 'Films, shows & anime',
  },
  {
    id: 'tech',
    label: 'Technology',
    emoji: '🔬',
    color: '#06b6d4',
    description: 'Tech news & gadgets',
  },
  {
    id: 'food',
    label: 'Food',
    emoji: '🍕',
    color: '#f59e0b',
    description: 'Cooking, recipes & food',
  },
  {
    id: 'travel',
    label: 'Travel',
    emoji: '✈️',
    color: '#0ea5e9',
    description: 'Travel & adventure',
  },
  {
    id: 'dating',
    label: 'Social',
    emoji: '❤️',
    color: '#f43f5e',
    description: 'Social interactions & friendship',
  },
  {
    id: 'crypto',
    label: 'Crypto',
    emoji: '₿',
    color: '#d97706',
    description: 'Crypto & web3',
  },
  {
    id: 'other',
    label: 'Other',
    emoji: '🌟',
    color: '#a855f7',
    description: 'Everything else',
  },
];

export const ROOM_CATEGORY_MAP = Object.fromEntries(
  ROOM_CATEGORIES.map((c) => [c.id, c])
);
