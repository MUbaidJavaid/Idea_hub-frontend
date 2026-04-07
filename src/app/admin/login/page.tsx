'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Atom, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { authApi } from '@/lib/api/auth.api';
import { extractApiError } from '@/lib/api/errors';
import { useAuthStore } from '@/store/authStore';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type Form = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [showPw, setShowPw] = useState(false);

  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'ubaid@gmail.com',
      password: 'ubaid123',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { user, tokens } = await authApi.login({
        email: values.email,
        password: values.password,
      });
      if (user.role !== 'super_admin' && user.role !== 'moderator') {
        toast.error('Yeh portal sirf admin / moderator ke liye hai.');
        return;
      }
      setAuth(user, tokens);
      toast.success(`Welcome, ${user.fullName}`);
      router.replace('/admin/dashboard');
    } catch (err) {
      const msg = extractApiError(err);
      toast.error(msg);
      if (
        msg.toLowerCase().includes('invalid') ||
        msg.toLowerCase().includes('401')
      ) {
        toast(
          'Pehli baar? API folder se chalao: npm run seed:admin -w @ideahub/api',
          { duration: 6000, icon: 'ℹ️' }
        );
      }
    }
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070d16] px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,242,255,0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0,242,255,0.08), transparent)',
        }}
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_40px_rgba(0,242,255,0.25)]">
            <Atom className="h-9 w-9 text-[#00f2ff]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Ideas Hub
          </h1>
          <p className="mt-1 text-sm text-cyan-100/60">Super Admin Console</p>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-8 shadow-[0_0_60px_rgba(0,242,255,0.08)] backdrop-blur-xl">
          <p className="mb-6 text-center text-sm text-slate-400">
            Secure access — moderator &amp; super admin only
          </p>
          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cyan-200/70">
                <Mail className="h-3.5 w-3.5" />
                Email
              </label>
              <Input
                type="email"
                autoComplete="email"
                className="border-cyan-500/20 bg-[#0b111b]/80 text-white placeholder:text-slate-500 focus-visible:ring-cyan-400/50"
                {...form.register('email')}
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cyan-200/70">
                  <Lock className="h-3.5 w-3.5" />
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[#00f2ff] hover:underline"
                  onClick={() => setShowPw((s) => !s)}
                >
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              <Input
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                className="border-cyan-500/20 bg-[#0b111b]/80 text-white placeholder:text-slate-500 focus-visible:ring-cyan-400/50"
                {...form.register('password')}
              />
            </div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full border-0 bg-gradient-to-r from-cyan-500 to-cyan-400 font-semibold text-[#070d16] shadow-[0_0_24px_rgba(0,242,255,0.35)] hover:from-cyan-400 hover:to-cyan-300"
            >
              {form.formState.isSubmitting ? (
                <Spinner size="sm" className="border-[#070d16] border-t-transparent" />
              ) : (
                'Enter console'
              )}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-500">
            Pehli baar? API par chalao:{' '}
            <code className="rounded bg-black/40 px-1.5 py-0.5 text-cyan-300/80">
              npm run seed:admin -w @ideahub/api
            </code>
            <br />
            <span className="mt-2 inline-block text-[10px] leading-relaxed text-slate-500">
              Seed ke baad dummy backup:{' '}
              <span className="font-mono text-cyan-400/90">
                backup.admin@ideahub.local
              </span>{' '}
              /{' '}
              <span className="font-mono text-cyan-400/90">BackupAdmin123!</span>
            </span>
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          <Link href="/login" className="text-cyan-400/80 hover:text-cyan-300">
            ← Normal user login
          </Link>
        </p>
      </div>
    </div>
  );
}
