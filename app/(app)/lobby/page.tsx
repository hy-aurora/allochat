import type { Metadata } from 'next';
import { LobbyView } from './_components/LobbyView';

export const metadata: Metadata = { title: 'Lobby' };

export default function LobbyPage() {
  return <LobbyView />;
}
