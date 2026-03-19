import type { Metadata } from 'next';
import { RoomView } from './_components/RoomView';

type Props = { params: Promise<{ roomId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomId } = await params;
  return { title: `Room ${roomId}` };
}

export default async function RoomPage({ params }: Props) {
  const { roomId } = await params;
  return <RoomView roomId={roomId as any} />;
}
