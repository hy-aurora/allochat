import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

// ─── Queries ──────────────────────────────────────────────────────────────────

export const getUnread = query({
  args: {},
  returns: v.array(v.any()),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query('notifications')
      .withIndex('byUser', (q) =>
        q.eq('userId', userId).eq('isRead', false)
      )
      .order('desc')
      .take(20);
  },
});

export const getNotifications = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query('notifications')
      .withIndex('byUser', (q) => q.eq('userId', userId).eq('isRead', false))
      .order('desc')
      .take(args.limit ?? 50);
  },
});

// ─── Mutations ────────────────────────────────────────────────────────────────

export const createNotification = mutation({
  args: {
    userId: v.id('users'),
    type: v.string(),
    title: v.string(),
    body: v.string(),
    icon: v.optional(v.string()),
    link: v.optional(v.string()),
  },
  returns: v.id('notifications'),
  handler: async (ctx, args) => {
    return await ctx.db.insert('notifications', {
      ...args,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});

export const markAsRead = mutation({
  args: { notificationId: v.id('notifications') },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');
    const notif = await ctx.db.get(args.notificationId);
    if (!notif || notif.userId !== userId) throw new Error('Not authorized');
    await ctx.db.patch(args.notificationId, { isRead: true });
    return null;
  },
});

export const markAllRead = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');
    const unread = await ctx.db
      .query('notifications')
      .withIndex('byUser', (q) => q.eq('userId', userId).eq('isRead', false))
      .collect();
    await Promise.all(unread.map((n) => ctx.db.patch(n._id, { isRead: true })));
    return null;
  },
});

export const deleteNotification = mutation({
  args: { notificationId: v.id('notifications') },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');
    const notif = await ctx.db.get(args.notificationId);
    if (!notif || notif.userId !== userId) throw new Error('Not authorized');
    await ctx.db.delete(args.notificationId);
    return null;
  },
});
