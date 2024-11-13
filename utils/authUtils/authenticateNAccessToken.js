import { useRouter } from "next/navigation";


export const authenticateNAccessToken = async (auth) => {
  const userInfo = {
    name:auth?.user?.name,
    photo:auth?.user?.photo,
    role:auth?.user?.role,
  }
  localStorage.setItem("user", userInfo);
  const token=auth?.token 
//   localStorage.setItem("token", token);


  // Set the token in a cookie
  // document.cookie = `token=${token}; path=/; max-age=3600; Secure; SameSite=Strict`; // expires in 1 hour
  document.cookie = `token=${token}; path=/; max-age=${process.env.NEXT_PUBLIC_COOKIE_EXPIRY*3600};`; // expires in NEXT_PUBLIC_COOKIE_EXPIRY hour
};




export const logout = async () => {

  try {
    const response = await fetch("https://jmctl-api.bdcare.vip/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
console.log("response from logout",response)
    if (response.ok) {
      // Clear user data from local storage or cookies if necessary
      localStorage.removeItem("user"); // Remove user info
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear token cookie
return response.status
    } else {
      console.error("Logout failed:", await response.text());
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};
