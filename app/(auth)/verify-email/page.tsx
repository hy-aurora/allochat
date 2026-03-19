'use client';

import { useState, useRef } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';

const OTP_LENGTH = 6;

export default function VerifyEmailPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    // Auto-advance
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // Auto-submit when complete
    if (newOtp.every(Boolean) && newOtp.length === OTP_LENGTH) {
      handleVerify(newOtp.join(''));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (text.length === OTP_LENGTH) {
      setOtp(text.split(''));
      handleVerify(text);
    }
  }

  async function handleVerify(code: string) {
    setLoading(true);
    try {
      await signIn('resend-otp', { code });
      router.push('/onboarding');
    } catch {
      toast.error('Invalid or expired code. Please try again.');
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    try {
      toast.success('A new code has been sent to your email.');
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((c) => {
          if (c <= 1) { clearInterval(interval); return 0; }
          return c - 1;
        });
      }, 1000);
    } catch {
      toast.error('Could not resend. Please try again.');
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-blue-100 text-3xl dark:bg-blue-900">
          <Icon icon="solar:letter-unread-linear" className="size-8 text-blue-700 dark:text-blue-200" />
        </div>
        <h2 className="text-2xl font-bold">Check your inbox</h2>
        <p className="text-muted-foreground text-sm">
          We&apos;ve sent a 6-digit code to your email address. Enter it below.
        </p>
      </div>

      <div className="flex gap-2" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <Input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-14 w-12 text-center text-xl font-bold tracking-widest"
            aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
          />
        ))}
      </div>

      <Button
        className="h-11 w-full font-semibold"
        disabled={loading || otp.some((d) => !d)}
        onClick={() => handleVerify(otp.join(''))}
      >
        {loading ? 'Verifying…' : 'Verify Email'}
      </Button>

      <button
        onClick={handleResend}
        disabled={resendCooldown > 0}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        {resendCooldown > 0
          ? `Resend code in ${resendCooldown}s`
          : "Didn't get the code? Resend"}
      </button>
    </div>
  );
}
