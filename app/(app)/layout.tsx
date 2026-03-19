import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { TopBar } from '@/components/layout/top-bar';

export const metadata: Metadata = {
  title: {
    default: 'AlloChat',
    template: '%s | AlloChat',
  },
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      {/* Sidebar — desktop only */}
      <AppSidebar />

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="min-h-0 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
