import { v } from 'convex/values';
import { mutation, query, internalMutation, internalAction } from './_generated/server';
import { api } from './_generated/api';
import { BADGE_DEFINITIONS } from '../lib/data/badge-definitions';

// ─── Mutations ────────────────────────────────────────────────────────────────

export const seedBadges = internalMutation({
  args: {},
  handler: async (ctx) => {
    for (const badge of BADGE_DEFINITIONS) {
      const existing = await ctx.db
        .query('badges')
        .withIndex('bySlug', (q) => q.eq('slug', badge.slug))
        .unique();

      if (!existing) {
        await ctx.db.insert('badges', {
          ...badge,
          isSecret: badge.isSecret ?? false,
          isLimited: badge.isLimited ?? false,
        });
      } else {
        await ctx.db.patch(existing._id, {
          ...badge,
          isSecret: badge.isSecret ?? false,
          isLimited: badge.isLimited ?? false,
        });
      }
    }
  },
});

export const checkAndAwardBadges = internalMutation({
  args: { userId: v.id('users'), type: v.string(), value: v.optional(v.number()) },
  handler: async (ctx, args) => {
    // Basic logic for awarding badges based on certain triggers
    // This would be expanded as more complex conditions are added
    
    if (args.type === 'first_message') {
      await ctx.runMutation(api.gamification.awardBadge, {
        userId: args.userId,
        badgeSlug: 'first_steps',
      });
    }

    if (args.type === 'room_creator') {
      await ctx.runMutation(api.gamification.awardBadge, {
        userId: args.userId,
        badgeSlug: 'architect',
      });
    }
  },
});

// ─── Queries ──────────────────────────────────────────────────────────────────

export const getBadgeDefinitions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('badges').collect();
  },
});

export const getUserBadges = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const userBadges = await ctx.db
      .query('userBadges')
      .withIndex('byUser', (q) => q.eq('userId', args.userId).eq('isUnlocked', true))
      .collect();

    const results = [];
    for (const ub of userBadges) {
      const badge = await ctx.db.get(ub.badgeId);
      if (badge) {
        results.push({
          ...badge,
          unlockedAt: ub.unlockedAt,
        });
      }
    }
    return results;
  },
});
