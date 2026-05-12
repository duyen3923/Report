import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Report Management System",
  description: "Modern premium internal report management dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          font-sans
          antialiased
          bg-white
          text-slate-900
        `}
      >
        <div className="flex h-screen overflow-hidden bg-white">
          
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main
              className="
                flex-1
                overflow-y-auto
                bg-white
                p-4
                md:p-6
              "
            >
              <div
                className="
                  min-h-full
                  rounded-2xl
                  bg-white
                  p-4
                  md:p-8
                "
              >
                {children}
              </div>
            </main>
          </div>
        </div>

        <Toaster />
      </body>
    </html>
  )
}