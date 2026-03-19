export type XPAction = {
  key: string;
  label: string;
  amount: number;
  dailyCap?: number; // Max XP from this action per day
  description: string;
};

export const XP_ACTIONS: XPAction[] = [
  {
    key: 'send_message',
    label: 'Send Message',
    amount: 1,
    dailyCap: 100,
    description: 'Earn 1 XP per message sent (up to 100/day)',
  },
  {
    key: 'send_voice_note',
    label: 'Send Voice Note',
    amount: 3,
    dailyCap: 30,
    description: 'Earn 3 XP per voice note',
  },
  {
    key: 'call_per_minute',
    label: 'Call Minutes',
    amount: 5,
    dailyCap: 300,
    description: 'Earn 5 XP per minute on calls',
  },
  {
    key: 'make_friend',
    label: 'Make a Friend',
    amount: 10,
    description: 'Earn 10 XP when a friend request is accepted',
  },
  {
    key: 'send_gift',
    label: 'Send a Gift',
    amount: 5,
    dailyCap: 50,
    description: 'Earn 5 XP when you send a gift',
  },
  {
    key: 'daily_login',
    label: 'Daily Login',
    amount: 20,
    dailyCap: 20,
    description: 'Earn 20 XP for your first login each day',
  },
  {
    key: 'create_room',
    label: 'Create a Room',
    amount: 50,
    description: 'Earn 50 XP the first time you create a room',
  },
  {
    key: 'room_verified',
    label: 'Room Verified',
    amount: 500,
    description: 'Earn 500 XP when your room gets verified by staff',
  },
  {
    key: 'badge_unlocked',
    label: 'Badge Unlocked',
    amount: 0, // Per-badge reward, see badge-definitions.ts
    description: 'Earn XP when unlocking badges (varies by rarity)',
  },
  {
    key: 'week_streak',
    label: '7-Day Streak Bonus',
    amount: 200,
    description: 'Bonus XP for maintaining a 7-day login streak',
  },
  {
    key: 'month_streak',
    label: '30-Day Streak Bonus',
    amount: 1000,
    description: 'Bonus XP for maintaining a 30-day login streak',
  },
  {
    key: 'event_participation',
    label: 'Event Participation',
    amount: 0, // Varies per event
    description: 'Earn XP for attending events (varies by event)',
  },
];

export const XP_ACTION_MAP = Object.fromEntries(XP_ACTIONS.map((a) => [a.key, a]));

// Leveling curve: XP needed per level
// Level N requires: base * N^exponent XP total
export const XP_CONFIG = {
  baseXP: 100,
  exponent: 1.5,
  maxLevel: 100,
};

export function xpForLevel(level: number): number {
  return Math.floor(XP_CONFIG.baseXP * Math.pow(level, XP_CONFIG.exponent));
}

export function totalXPForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i <= level; i++) {
    total += xpForLevel(i);
  }
  return total;
}

export function getLevelFromXP(totalXP: number): {
  level: number;
  xpInCurrentLevel: number;
  xpToNextLevel: number;
} {
  let level = 1;
  let cumulativeXP = 0;

  while (level < XP_CONFIG.maxLevel) {
    const xpForThisLevel = xpForLevel(level);
    if (cumulativeXP + xpForThisLevel > totalXP) {
      return {
        level,
        xpInCurrentLevel: totalXP - cumulativeXP,
        xpToNextLevel: xpForThisLevel - (totalXP - cumulativeXP),
      };
    }
    cumulativeXP += xpForThisLevel;
    level++;
  }

  return { level: XP_CONFIG.maxLevel, xpInCurrentLevel: 0, xpToNextLevel: 0 };
}
