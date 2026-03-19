import { internalAction } from './_generated/server';
import { api } from './_generated/api';

export const seedAll = internalAction({
  args: {},
  handler: async (ctx) => {
    // Seed badges
    await ctx.runMutation(api.badges.seedBadges, {});
    
    // Potential other seeds (rooms, etc.)
  },
});
