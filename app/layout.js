"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import MotherLayout from "./MotherLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children}) { // Accept isLoading prop
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
      

     
        <MotherLayout>
          <main className="flex-grow mt-[header-height] bg-white">
          <QueryClientProvider client={queryClient}>
            {children} {/* Display Spinner or children based on isLoading */}
</QueryClientProvider>

          </main>
        </MotherLayout>

      </body>
    </html>
  );
}
