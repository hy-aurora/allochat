export type Role = 'owner' | 'admin' | 'moderator' | 'staff' | 'user' | 'guest';

export type RoleDefinition = {
  id: Role;
  label: string;
  rank: number; // Higher = more powerful
  color: string;
  badge: string;
  description: string;
  inherits: Role[]; // Inherits all permissions from these roles
};

export const ROLES: RoleDefinition[] = [
  {
    id: 'owner',
    label: 'Owner',
    rank: 999,
    color: '#ef4444',
    badge: '👑',
    description: 'Platform owner with full access',
    inherits: ['admin'],
  },
  {
    id: 'admin',
    label: 'Admin',
    rank: 100,
    color: '#f59e0b',
    badge: '🔑',
    description: 'Platform administrator',
    inherits: ['moderator'],
  },
  {
    id: 'moderator',
    label: 'Moderator',
    rank: 70,
    color: '#3b82f6',
    badge: '🛡️',
    description: 'Content moderation team',
    inherits: ['staff'],
  },
  {
    id: 'staff',
    label: 'Staff',
    rank: 50,
    color: '#8b5cf6',
    badge: '⭐',
    description: 'Platform staff member',
    inherits: ['user'],
  },
  {
    id: 'user',
    label: 'User',
    rank: 1,
    color: '#6b7280',
    badge: '',
    description: 'Regular registered user',
    inherits: ['guest'],
  },
  {
    id: 'guest',
    label: 'Guest',
    rank: 0,
    color: '#9ca3af',
    badge: '👤',
    description: 'Unauthenticated visitor',
    inherits: [],
  },
];

export const ROLE_MAP = Object.fromEntries(ROLES.map((r) => [r.id, r]));

export function hasRoleOrAbove(userRole: Role, requiredRole: Role): boolean {
  const user = ROLE_MAP[userRole];
  const required = ROLE_MAP[requiredRole];
  if (!user || !required) return false;
  return user.rank >= required.rank;
}
