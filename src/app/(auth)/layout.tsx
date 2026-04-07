export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-8 sm:flex sm:items-center sm:justify-center sm:p-6">
      <div className="mx-auto w-full max-w-md sm:rounded-card sm:border sm:border-[var(--color-border)] sm:bg-[var(--color-surface)] sm:p-8 sm:shadow-card dark:sm:border-gray-700">
        {children}
      </div>
    </div>
  );
}
