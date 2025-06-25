"use client";

// This page is no longer directly used for login,
// as the LoginModal is now shown globally by AuthProvider.
// We can keep this as a fallback or for a dedicated /login route if needed.

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-white">Please log in to continue.</p>
    </div>
  );
} 