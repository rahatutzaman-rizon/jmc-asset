// src/app/register/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from "react-firebase-hooks/auth";
import auth from "../firebase/config";
import Spinner from "../Reusable/Spinner";


const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // React Firebase hooks
  const [createUserWithEmailAndPassword, user, userLoading, userError] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification, sending, verificationError] = useSendEmailVerification(auth);

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Password structure validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(email, password);

      // Send email verification
      if (user) {
        await sendEmailVerification();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle user state change
  useEffect(() => {
    if (user) {
      // Save user data to local storage
      const userInfo = {
        uid: user.user.uid,
        email: user.user.email,
        firstName,
        lastName
      };
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Redirect to dashboard
      router.push("/dashboard");
    }
  }, [user, router, firstName, lastName]);

  // Handle errors from React Firebase hooks
  useEffect(() => {
    if (userError) setError(userError.message);
    if (verificationError) setError(verificationError.message);
  }, [userError, verificationError]);
console.log(user)
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading || userLoading || sending}
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md font-semibold 
              hover:bg-blue-600 transition-colors ${loading || userLoading || sending ? 'cursor-not-allowed' : ''}`}
          >
            {loading || userLoading || sending ? <Spinner loading={loading || userLoading || sending} /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
