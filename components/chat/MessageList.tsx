'use client';

import { usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

type Props = { roomId: Id<'rooms'> };

export function MessageList({ roomId }: Props) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.listMessages,
    { roomId },
    { initialNumItems: 50 }
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [results.length]);

  const messages = [...results].reverse();

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-4">
      {/* Load more */}
      {status === 'CanLoadMore' && (
        <button
          onClick={() => loadMore(50)}
          className="text-primary hover:underline mb-4 self-center text-sm"
        >
          Load older messages
        </button>
      )}

      {status === 'LoadingFirstPage' && (
        <div className="flex flex-1 items-center justify-center">
          <div className="border-primary size-6 animate-spin rounded-full border-2 border-t-transparent" />
        </div>
      )}

      {messages.length === 0 && status !== 'LoadingFirstPage' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <span className="text-4xl">👋</span>
          <p className="font-medium">Be the first to say something!</p>
          <p className="text-muted-foreground text-sm">This room is quiet. Start a conversation.</p>
        </div>
      )}

      <div className="flex flex-col gap-1">
        {messages.map((message, i) => {
          const prev = messages[i - 1];
          const isGrouped = prev && prev.senderId === message.senderId &&
            message.createdAt - prev.createdAt < 60_000;
          return (
            <MessageBubble key={message._id} message={message} grouped={isGrouped} />
          );
        })}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
