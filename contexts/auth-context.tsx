"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import GlobalLoader from '@/components/GlobalLoader';
import { LoginModal } from '@/components/auth/login-modal';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <div className="relative min-h-screen">
        {user ? children : null}
        {!user && <LoginModal isOpen={true} onClose={() => {}} />}
      </div>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 