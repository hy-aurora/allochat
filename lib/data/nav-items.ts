import type { Role } from './roles';
import type { SubscriptionTier } from './subscription-plans';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  emoji: string;
  section: 'main' | 'social' | 'discover' | 'admin';
  requiredRole?: Role;
  requiredTier?: SubscriptionTier;
  badge?: 'notifications' | 'friends' | 'messages';
};

export const NAV_ITEMS: NavItem[] = [
  // ─── Main ─────────────────────────────────────
  {
    id: 'lobby',
    label: 'Lobby',
    href: '/lobby',
    emoji: '🏠',
    section: 'main',
  },
  {
    id: 'messages',
    label: 'Messages',
    href: '/messages',
    emoji: '💬',
    section: 'main',
    badge: 'messages',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '/notifications',
    emoji: '🔔',
    section: 'main',
    badge: 'notifications',
  },
  {
    id: 'leaderboard',
    label: 'Leaderboard',
    href: '/leaderboard',
    emoji: '🏆',
    section: 'main',
  },
  {
    id: 'events',
    label: 'Events',
    href: '/events',
    emoji: '📅',
    section: 'main',
  },
  // ─── Social ────────────────────────────────────
  {
    id: 'friends',
    label: 'Friends',
    href: '/friends',
    emoji: '👥',
    section: 'social',
    badge: 'friends',
  },
  // ─── Discover ──────────────────────────────────
  {
    id: 'shop',
    label: 'Shop',
    href: '/shop',
    emoji: '🛍️',
    section: 'discover',
  },
  {
    id: 'plugins',
    label: 'Plugins',
    href: '/plugins/marketplace',
    emoji: '🔌',
    section: 'discover',
  },
  {
    id: 'subscription',
    label: 'Go Pro',
    href: '/subscription',
    emoji: '⚡',
    section: 'discover',
  },
  // ─── Admin ─────────────────────────────────────
  {
    id: 'admin-dashboard',
    label: 'Dashboard',
    href: '/admin/dashboard',
    emoji: '📊',
    section: 'admin',
    requiredRole: 'staff',
  },
  {
    id: 'admin-users',
    label: 'Users',
    href: '/admin/users',
    emoji: '👤',
    section: 'admin',
    requiredRole: 'moderator',
  },
  {
    id: 'admin-moderation',
    label: 'Moderation',
    href: '/admin/moderation',
    emoji: '🛡️',
    section: 'admin',
    requiredRole: 'moderator',
  },
  {
    id: 'admin-analytics',
    label: 'Analytics',
    href: '/admin/analytics',
    emoji: '📈',
    section: 'admin',
    requiredRole: 'admin',
  },
  {
    id: 'admin-settings',
    label: 'Site Settings',
    href: '/admin/settings',
    emoji: '⚙️',
    section: 'admin',
    requiredRole: 'owner',
  },
];

export function getNavItemsForUser(role: Role, tier: SubscriptionTier): NavItem[] {
  const { hasRoleOrAbove } = require('./roles');
  return NAV_ITEMS.filter((item) => {
    if (item.requiredRole && !hasRoleOrAbove(role, item.requiredRole)) return false;
    return true;
  });
}
