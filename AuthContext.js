import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from './supabaseclient';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          setIsLoggedIn(true);
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setIsLoggedIn(true);
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    // Unsubscribe on unmount
    return () => {
      if (listener?.unsubscribe) {
        listener.unsubscribe();
      }
    };
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  }, []);

  const signup = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error resetting password:", error.message);
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      const { data, error } = await supabase.from('profiles').upsert({
        id: user.id,
        ...updates
      });
      if (error) throw error;
      setUser({ ...user, ...updates });
      return data;
    } catch (error) {
      console.error("Error updating profile:", error.message);
      throw error;
    }
  }, [user]);

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
