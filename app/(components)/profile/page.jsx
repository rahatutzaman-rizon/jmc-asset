// src/app/profile/page.js
"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import auth from "../../(components)/firebase/config"; // Ensure this path is correct
import { useEffect, useState } from "react";
import Spinner from "../../(components)/Reusable/Spinner"; // Adjust path as needed
import Image from "next/image";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (loading) return; // Show spinner while loading

    if (!user) {
      // Redirect to login if not authenticated
      router.push("/login");
    } else {
      // Extract user information and set it to state
      setUserData({
        displayName: user.displayName || "N/A",
        email: user.email || "N/A",
        photoURL: user.photoURL || "/default-profile.png", // Provide a default profile image
        uid: user.uid,
        emailVerified: user.emailVerified ? "Verified" : "Not Verified",
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      });
    }
  }, [user, loading, router]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">Error: {error.message}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        <div className="flex flex-col items-center space-y-4">
        <Image
        src={src}
        alt={alt}
        width={96}  // Width in pixels (matches w-24)
        height={96} // Height in pixels (matches h-24)
        className="object-cover"
      />
          <div className="text-center">
            <h3 className="text-xl font-semibold">{userData.displayName}</h3>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-500">User ID: {userData.uid}</p>
            <p className={`text-sm ${userData.emailVerified === 'Verified' ? 'text-green-500' : 'text-red-500'}`}>
              Email: {userData.emailVerified}
            </p>
            <p className="text-gray-500">
              Account Created: {userData.creationTime}
            </p>
            <p className="text-gray-500">
              Last Sign In: {userData.lastSignInTime}
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/logout")}
          className="mt-6 w-full py-2 px-4 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
