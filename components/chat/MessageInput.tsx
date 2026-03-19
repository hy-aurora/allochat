'use client';

import { useState, useRef, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type Props = { roomId: Id<'rooms'> };

export function MessageInput({ roomId }: Props) {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const sendMessage = useMutation(api.messages.sendMessage);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(async () => {
    const text = content.trim();
    if (!text || sending) return;

    setSending(true);
    try {
      await sendMessage({ roomId, content: text });
      setContent('');
      textareaRef.current?.focus();
    } catch (err: any) {
      if (err.message?.includes('FLOOD_LIMIT_REACHED')) {
        toast.error('Slow down! You\'re sending messages too fast.');
      } else if (err.message?.includes('muted')) {
        toast.error('You are muted in this room.');
      } else {
        toast.error('Failed to send message.');
      }
    } finally {
      setSending(false);
    }
  }, [content, sending, sendMessage, roomId]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // Auto-resize textarea
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  }

  return (
    <div className="border-border bg-background border-t p-3">
      <div className="border-border focus-within:border-primary focus-within:ring-primary/20 flex items-end gap-2 rounded-xl border px-3 py-2 transition-all focus-within:ring-2">
        {/* Attach file */}
        <button
          className="text-muted-foreground hover:text-foreground mb-1 transition-colors"
          aria-label="Attach file"
          title="Attach file (coming soon)"
        >
          📎
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Shift+Enter for new line)"
          rows={1}
          className="scrollbar-none text-foreground placeholder:text-muted-foreground max-h-48 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm outline-none"
          aria-label="Message input"
        />

        {/* Emoji */}
        <button
          className="text-muted-foreground hover:text-foreground mb-1 transition-colors"
          aria-label="Emoji picker"
          title="Emoji (coming soon)"
        >
          😊
        </button>

        {/* Send button */}
        <Button
          size="sm"
          className="mb-0.5 h-8 px-3"
          onClick={handleSend}
          disabled={!content.trim() || sending}
          aria-label="Send message"
        >
          {sending ? '…' : '↑'}
        </Button>
      </div>
      <p className="text-muted-foreground mt-1 text-center text-xs">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
