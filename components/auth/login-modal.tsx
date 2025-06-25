"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaGoogle } from "react-icons/fa"
import { FaCheckCircle } from "react-icons/fa"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthMode = "login" | "signup" | "reset"

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  // Sign up fields
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState("")
  const [signupError, setSignupError] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [resetMessage, setResetMessage] = useState("")
  const [resetError, setResetError] = useState("")
  const [isVisible, setIsVisible] = useState(isOpen)
  // For animated reset message
  const [showResetMessage, setShowResetMessage] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    if (password.length < 4) {
      setError("Password must be at least 4 characters long.")
      setLoading(false)
      return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onClose() // Close modal on success
    } catch (err: any) {
      if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please wait a few minutes and try again.")
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Invalid email or password.")
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")
    // Add validation and Firebase sign-up logic here later
    if (!name.trim() || !surname.trim()) {
      setSignupError("Please enter your name and surname.")
      return
    }
    if (signupPassword.length < 4) {
      setSignupError("Password must be at least 4 characters long.")
      return
    }
    if (signupPassword !== signupPasswordConfirm) {
      setSignupError("Passwords do not match.")
      return
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      // Update displayName with name and surname
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${name} ${surname}`
        })
      }
      // Optionally, you can close the modal or switch to login
      setAuthMode("login")
      setSignupError("")
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        // Auto-send password reset email
        try {
          await sendPasswordResetEmail(auth, signupEmail)
          setSignupError("This email is already registered. We've sent you a link to set your password.")
        } catch (resetErr: any) {
          setSignupError("This email is already registered. Please use 'Forgot password?' to set your password.")
        }
      } else if (err.code === "auth/invalid-email") {
        setSignupError("Invalid email address.")
      } else if (err.code === "auth/weak-password") {
        setSignupError("Password is too weak.")
      } else {
        setSignupError(err.message)
      }
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError("")
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      onClose() // Close modal on success
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetMessage("")
    setResetError("")
    try {
      await sendPasswordResetEmail(auth, resetEmail)
      setResetMessage("Password reset email sent! Check your inbox.")
      setShowResetMessage(true)
      setTimeout(() => setShowResetMessage(false), 3000)
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setResetError("No account found with that email.")
      } else if (err.code === "auth/invalid-email") {
        setResetError("Invalid email address.")
      } else {
        setResetError(err.message)
      }
    }
  }

  // Animate out then call onClose
  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
      setIsVisible(true)
    }, 400) // match animation duration
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="relative w-full max-w-md rounded-2xl bg-transparent border-2 border-black p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait" initial={false}>
              {authMode === "login" ? (
                <motion.div
                  key="login"
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, type: "spring" }}
                >
                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-white">Login</h2>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2"
                    >
                      <FaGoogle />
                      Sign in with Google
                    </Button>
                    {error && <p className="text-red-300">{error}</p>}
                  </form>
                  <div className="mt-2 text-center">
                    <button
                      className="text-xs text-blue-400 underline hover:text-blue-200"
                      onClick={() => setAuthMode("reset")}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-300">Don't have an account? </span>
                    <button
                      className="text-sm text-blue-400 underline hover:text-blue-200"
                      onClick={() => setAuthMode("signup")}
                    >
                      Create account
                    </button>
                  </div>
                </motion.div>
              ) : authMode === "reset" ? (
                <motion.div
                  key="reset"
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, type: "spring" }}
                >
                  <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Button type="submit" className="w-full">Send Reset Email</Button>
                    <AnimatePresence>
                      {showResetMessage && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col items-center justify-center gap-2 text-green-300 font-semibold"
                        >
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-400" />
                            {resetMessage}
                          </div>
                          <span className="text-xs text-blue-200 font-normal mt-1">
                            If you don't see the email, check your spam or junk folder and mark it as "Not Spam."
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {resetError && <p className="text-red-300">{resetError}</p>}
                  </form>
                  <div className="mt-4 text-center">
                    <button
                      className="text-sm text-blue-400 underline hover:text-blue-200"
                      onClick={() => setAuthMode("login")}
                    >
                      Back to login
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, type: "spring" }}
                >
                  <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <Input
                      type="text"
                      placeholder="First name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Input
                      type="text"
                      placeholder="Surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                      className="bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      value={signupPasswordConfirm}
                      onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                      required
                      className="bg-white/90 text-black placeholder:text-gray-500"
                    />
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                    {signupError && <p className="text-red-300">{signupError}</p>}
                  </form>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-300">Already have an account? </span>
                    <button
                      className="text-sm text-blue-400 underline hover:text-blue-200"
                      onClick={() => setAuthMode("login")}
                    >
                      Sign in
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 