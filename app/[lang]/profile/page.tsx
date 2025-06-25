"use client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { updateProfile, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth, storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [editingName, setEditingName] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhoto, setNewPhoto] = useState(user?.photoURL || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [resetMsg, setResetMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.metadata && user.metadata.creationTime) {
      const date = new Date(user.metadata.creationTime);
      setCreatedAt(date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  }, [user]);

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleNameSave = async () => {
    setLoading(true);
    setError("");
    try {
      await updateProfile(auth.currentUser!, { displayName: newName });
      setEditingName(false);
      window.location.reload();
    } catch (err: any) {
      setError("Failed to update name.");
    }
    setLoading(false);
  };

  const handlePhotoSave = async () => {
    setLoading(true);
    setError("");
    try {
      await updateProfile(auth.currentUser!, { photoURL: newPhoto });
      setEditingPhoto(false);
      window.location.reload();
    } catch (err: any) {
      setError("Failed to update photo.");
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handlePasswordReset = async () => {
    setResetMsg(null);
    try {
      await sendPasswordResetEmail(auth, user.email!);
      setResetMsg("Password reset email sent!");
    } catch (err: any) {
      setResetMsg("Failed to send password reset email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md border border-white/30 sm:rounded-2xl rounded-xl" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}>
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={user.photoURL || "/placeholder-user.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-lg object-cover"
          />
          {editingName ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                placeholder="Enter new name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                disabled={loading}
              />
              <div className="flex gap-2">
                <button className="text-xs text-purple-600 hover:underline" onClick={handleNameSave} disabled={loading}>Save</button>
                <button className="text-xs text-gray-500 hover:underline" onClick={() => setEditingName(false)} disabled={loading}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center">{user.displayName || "No Name"}</h2>
              <button className="text-xs text-purple-600 hover:underline" onClick={() => setEditingName(true)}>Edit Name</button>
            </>
          )}
          <p className="text-gray-700 text-center break-all">{user.email}</p>
          {createdAt && (
            <p className="text-xs text-gray-500 text-center mt-1">Account created: {createdAt}</p>
          )}
          <button
            onClick={handlePasswordReset}
            className="w-full mt-4 py-3 rounded-xl border-2 border-black/40 text-black font-bold text-lg hover:bg-black/10 transition"
          >
            Change Password
          </button>
          {resetMsg && (
            <p className={`text-center mt-2 text-sm ${resetMsg.includes('sent') ? 'text-green-600' : 'text-red-500'}`}>{resetMsg}</p>
          )}
          <Link href={`/${router.locale || 'en'}/contact`} className="w-full">
            <button className="w-full h-12 mt-4 rounded-xl border-2 border-black/40 text-black font-bold text-lg hover:bg-black/10 transition flex items-center justify-center">
              Contact Support
            </button>
          </Link>
        </div>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <div className="flex flex-col gap-3 mt-6">
          <Link href="/wishlist" className="w-full">
            <span className="w-full h-12 flex items-center justify-center text-center rounded-xl border-2 border-black/40 text-black font-bold text-lg hover:bg-black/10 transition">My Wishlist</span>
          </Link>
        </div>
        <button onClick={handleSignOut} className="w-full mt-6 h-12 rounded-xl border-2 border-black/40 text-black font-bold text-lg hover:bg-black/10 transition flex items-center justify-center">Sign Out</button>
      </div>
    </div>
  );
} 