'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthField } from '@/components/auth/AuthField';
import { AuthShell } from '@/components/auth/AuthShell';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const inputClass =
  'rounded-xl border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900';

export default function LoginPage() {
  const { login } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setApiError(null);
    try {
      await login(values.email, values.password);
    } catch {
      setApiError('Invalid email or password.');
    }
  });

  return (
    <AuthShell
      variant="login"
      footer={
        <>
          No account?{' '}
          <Link
            href="/register"
            className="font-semibold text-brand-700 hover:underline dark:text-indigo-300"
          >
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <AuthField
          label="Email"
          error={form.formState.errors.email?.message}
        >
          <Input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
            {...form.register('email')}
          />
        </AuthField>

        <AuthField
          label="Password"
          error={form.formState.errors.password?.message}
          action={
            <button
              type="button"
              className="text-xs font-medium text-brand-700 hover:underline dark:text-indigo-300"
              onClick={() => setShowPw((s) => !s)}
            >
              {showPw ? 'Hide' : 'Show'}
            </button>
          }
        >
          <Input
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Your password"
            className={inputClass}
            {...form.register('password')}
          />
        </AuthField>

        {apiError ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {apiError}
          </p>
        ) : null}

        <button
          type="submit"
          className="landing-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Spinner size="sm" className="border-white border-t-transparent" />
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </AuthShell>
  );
}
