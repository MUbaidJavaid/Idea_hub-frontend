'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

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
    <div>
      <h1 className="text-2xl font-bold text-[var(--text)]">Welcome back</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Sign in to Ideas Hub
      </p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="text-sm font-medium text-[var(--text)]">
            Email
          </label>
          <Input
            type="email"
            autoComplete="email"
            className="mt-1"
            {...form.register('email')}
          />
          {form.formState.errors.email ? (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text)]">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-brand"
              onClick={() => setShowPw((s) => !s)}
            >
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>
          <Input
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            className="mt-1"
            {...form.register('password')}
          />
          {form.formState.errors.password ? (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>
        {apiError ? (
          <p className="text-sm text-red-600" role="alert">
            {apiError}
          </p>
        ) : null}
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Spinner size="sm" className="border-white border-t-transparent" />
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
        No account?{' '}
        <Link href="/register" className="font-medium text-brand">
          Register
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        <Link
          href="/admin/login"
          className="font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          Super admin console →
        </Link>
      </p>
    </div>
  );
}
