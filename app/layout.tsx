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
          bg-background
          text-foreground
        `}
      >
        <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a]">
          
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
                bg-gradient-to-br
                from-white
                via-slate-50
                to-slate-100
                dark:from-slate-950
                dark:via-slate-900
                dark:to-slate-950
                p-4
                md:p-6
                transition-all
                duration-300
              "
            >
              <div
                className="
                  h-full
                  rounded-3xl
                  border
                  border-white/20
                  bg-white/60
                  dark:bg-white/5
                  backdrop-blur-xl
                  shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                  p-4
                  md:p-6
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