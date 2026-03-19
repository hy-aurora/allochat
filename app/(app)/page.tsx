import { redirect } from 'next/navigation';
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server';

export default async function AppPage() {
  const token = await convexAuthNextjsToken();
  if (!token) redirect('/sign-in');
  redirect('/lobby');
}
