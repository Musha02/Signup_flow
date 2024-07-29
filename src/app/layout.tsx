import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
//import { UserProvider } from '@auth0/nextjs-auth0/client';


export const metadata: Metadata = {
  title: "Signup flow",
  description: "Design by: Ahamed Musharraf"
};

export default function RootLayout({
  children
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
        <body className="flex flex-col min-h-screen">

          <main className="flex-grow">
            {children}
          </main>

        </body>
    </html>
  );
}
