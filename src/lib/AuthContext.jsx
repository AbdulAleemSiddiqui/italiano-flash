import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';

const AuthContext = createContext();

// Map a Supabase user onto the app-wide user shape: { id, email, full_name }.
// Google sign-in supplies names in user_metadata; email sign-ups have none.
const toAppUser = (supabaseUser) => {
  if (!supabaseUser) return null;
  const meta = supabaseUser.user_metadata || {};
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    full_name:
      meta.full_name || meta.name || meta.user_name || '',
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Resolve the current session (also picks up the session embedded in the
    // URL by email-confirmation / password-recovery / OAuth redirect links).
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(toAppUser(session?.user ?? null));
        setIsAuthenticated(Boolean(session));
      })
      .catch((error) => {
        console.error('Session check failed:', error);
      })
      .finally(() => setIsLoadingAuth(false));

    // Keep auth state in sync across tabs, token refreshes, sign-in/out.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(toAppUser(session?.user ?? null));
        setIsAuthenticated(Boolean(session));
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const logout = async (shouldRedirect = true) => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    if (shouldRedirect) {
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
