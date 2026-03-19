'use client';

import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';

type Props = {
  roomId: Id<'rooms'>;
  roomName: string;
  onLeave: () => void;
};

export function CallRoom({ roomId, roomName, onLeave }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const generateToken = useAction(api.actions.generateToken);

  useEffect(() => {
    (async () => {
      try {
        const t = await generateToken({ roomId, roomName });
        setToken(t);
      } catch (err) {
        console.error('Failed to get call token:', err);
      }
    })();
  }, [generateToken, roomId, roomName]);

  if (!token) {
    return (
      <div className="bg-muted flex h-full flex-col items-center justify-center gap-4 rounded-xl border">
        <div className="border-primary size-8 animate-spin rounded-full border-2 border-t-transparent" />
        <p className="text-muted-foreground text-sm font-medium italic">Preparing secure voice/video link…</p>
      </div>
    );
  }

  return (
    <div className="border-border bg-card relative flex h-full flex-col overflow-hidden rounded-xl border shadow-2xl">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        onDisconnected={onLeave}
        data-lk-theme="default"
        className="h-full"
      >
        <VideoConference />
        <RoomAudioRenderer />
        <ControlBar />
        
        {/* Custom close button */}
        <Button 
          variant="destructive" 
          size="sm"
          className="absolute top-4 right-4 z-50 h-8 px-3 shadow-lg"
          onClick={onLeave}
        >
          Exit Call
        </Button>
      </LiveKitRoom>
    </div>
  );
}
