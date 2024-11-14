// src/app/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
 // Adjust the path as needed
import Link from "next/link";
import Image from "next/image";
import auth from "../firebase/config";
import Spinner from "../Reusable/Spinner";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // State to store user information

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Store user information
        setUserInfo({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
        // You can redirect if needed
        // router.push("/dashboard");
      } else {
        // Clear user information if not logged in
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, [router]);




  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('https://asset-server.bdcare.vip/login', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token
      router.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Redirect will be handled by the onAuthStateChanged listener
    } catch (err) {
      setError(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle password reset
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {userInfo ? (
          <div className="text-center mb-4">
          <Image
        src={userInfo.photoURL || "/default-avatar.png"} // Fallback to default image
        alt="User Avatar"
        width={64} // Set the width of the image
        height={64} // Set the height of the image
        className="rounded-full" // Add styling classes
        onError={(e) => e.target.src = '/default-avatar.png'} // Handle error to fallback if image fails to load
      />
            <p className="text-lg font-semibold">{userInfo.displayName || "User"}</p>
            <p className="text-sm text-gray-600">{userInfo.email}</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md font-semibold 
                hover:bg-blue-600 transition-colors ${loading ? "cursor-not-allowed" : ""}`}
            >
              {loading ? <Spinner /> : "Sign in"}
            </button>
          </form>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
          <Link href="/register">
            <p className="text-sm text-blue-500 hover:underline">
              Didn&apos;t sign up yet?
            </p>
          </Link>
        </div>

        {!userInfo && (
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md font-semibold 
                hover:bg-red-600 transition-colors flex justify-center items-center"
            >
              {googleLoading ? (
                <Spinner/>
              ) : (
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    {/* Google icon SVG path */}
                  </svg>
                  <span>Sign in with Google</span>
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
