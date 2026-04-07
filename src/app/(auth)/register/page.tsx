'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-z0-9][a-z0-9_-]*$/i, 'Invalid username'),
    fullName: z.string().min(1).max(120),
    email: z.string().email(),
    password: z.string().min(8, 'At least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setApiError(null);
    try {
      await registerUser({
        username: values.username.toLowerCase(),
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
    } catch (err) {
      const msg =
        isAxiosError(err) &&
        err.response?.data &&
        typeof (err.response.data as { message?: string }).message === 'string'
          ? (err.response.data as { message: string }).message
          : null;
      setApiError(
        msg ?? 'Registration failed. Try a different email or username.'
      );
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text)]">Create account</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Join Ideas Hub today
      </p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="text-sm font-medium">Username</label>
          <Input className="mt-1" {...form.register('username')} />
          {form.formState.errors.username ? (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.username.message}
            </p>
          ) : null}
        </div>
        <div>
          <label className="text-sm font-medium">Full name</label>
          <Input className="mt-1" {...form.register('fullName')} />
          {form.formState.errors.fullName ? (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.fullName.message}
            </p>
          ) : null}
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" className="mt-1" {...form.register('email')} />
          {form.formState.errors.email ? (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>
        <div>
          <div className="flex justify-between">
            <label className="text-sm font-medium">Password</label>
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
            className="mt-1"
            {...form.register('password')}
          />
          {form.formState.errors.password ? (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>
        <div>
          <label className="text-sm font-medium">Confirm password</label>
          <Input
            type={showPw ? 'text' : 'password'}
            className="mt-1"
            {...form.register('confirmPassword')}
          />
          {form.formState.errors.confirmPassword ? (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.confirmPassword.message}
            </p>
          ) : null}
        </div>
        {apiError ? (
          <p className="text-sm text-red-600" role="alert">
            {apiError}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Spinner size="sm" className="border-white border-t-transparent" />
          ) : (
            'Register'
          )}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-brand">
          Log in
        </Link>
      </p>
    </div>
  );
}
