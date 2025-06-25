"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";

export default function SignUpPage() {
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
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="bg-muted/50 p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign Up</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">Account created! You can now sign in.</div>}
      </form>
    </div>
  );
} 