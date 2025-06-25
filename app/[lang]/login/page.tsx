"use client";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCvj2kVNe6PORfhoGtLFobc0Z-BNCZzqxU",
  authDomain: "gstay-5f8cf.firebaseapp.com",
  projectId: "gstay-5f8cf",
  storageBucket: "gstay-5f8cf.appspot.com",
  messagingSenderId: "609330023871",
  appId: "1:609330023871:web:6357e0d0c2e9c00dc9250a",
  measurementId: "G-KR00W3QX7N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mountain background with overlay */}
      <div className="absolute inset-0 -z-10">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Bakuriani Mountains" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-700/80 via-blue-900/80 to-blue-950/90" />
      </div>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="form flex flex-col gap-4 bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900 hover:from-blue-900 hover:to-sky-400 transition-all duration-300 p-6 sm:p-10 w-full max-w-xs sm:max-w-md rounded-2xl shadow-2xl border border-blue-200/30 backdrop-blur-md"
        style={{ fontFamily: 'Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif' }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-white drop-shadow">Sign In</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white font-semibold">Email</label>
          <div className="inputForm flex items-center bg-transparent rounded-full h-10 sm:h-12 border border-gray-200 focus-within:border-orange-400 transition">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="input border-none outline-none bg-white flex-1 text-gray-900 placeholder-gray-400 rounded-full h-full px-4 focus:ring-0 focus:border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-white font-semibold">Password</label>
          <div className="inputForm flex items-center bg-transparent rounded-full h-10 sm:h-12 border border-gray-200 focus-within:border-orange-400 transition">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="input border-none outline-none bg-white flex-1 text-gray-900 placeholder-gray-400 rounded-full h-full px-4 focus:ring-0 focus:border-none focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="button-submit mt-4 w-full h-10 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 text-white font-semibold text-base sm:text-lg shadow-lg border-2 border-blue-200 transition-all duration-300 hover:from-sky-400 hover:to-blue-600 hover:shadow-xl active:scale-95"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {error && <div className="p text-red-200 text-center">{error}</div>}
        {success && <div className="p text-green-200 text-center">Signed in! Redirecting...</div>}
        <div className="flex flex-col gap-3 mt-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full h-10 sm:h-12 rounded-full bg-white text-gray-800 font-semibold text-base sm:text-lg shadow border border-gray-200 hover:bg-blue-50 transition-all duration-200"
          >
            <svg width="22" height="22" viewBox="0 0 48 48" className="inline-block"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.2 4.5 29.4 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5c10.5 0 20-8.1 20-20 0-1.3-.1-2.1-.3-3.5z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.2 4.5 29.4 2.5 24 2.5c-7.2 0-13 5.8-13 13 0 2.1.5 4.1 1.3 5.7z"/><path fill="#FBBC05" d="M24 43.5c5.8 0 10.7-1.9 14.3-5.2l-6.6-5.4c-2.1 1.5-4.8 2.4-7.7 2.4-5.8 0-10.7-3.9-12.5-9.2l-7 5.1C7.2 39.1 14.7 43.5 24 43.5z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-5.8 0-10.7-3.9-12.5-9.2l-7 5.1C7.2 39.1 14.7 43.5 24 43.5c10.5 0 20-8.1 20-20 0-1.3-.1-2.1-.3-3.5z"/></g></svg>
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full h-10 sm:h-12 rounded-full bg-gray-900 text-white font-semibold text-base sm:text-lg shadow border border-gray-800 hover:bg-gray-800 transition-all duration-200"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="inline-block"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" fill="currentColor"/></svg>
            Sign in with GitHub
          </button>
        </div>
      </motion.form>
    </div>
  );
} 