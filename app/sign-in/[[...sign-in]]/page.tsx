"use client";
import { SignIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    // Redirect to dashboard or another page if already signed in
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <Link href={"/"} className="text-2xl font-bold text-indigo-600">
            AI RemoveBG
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8 space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-2xl">✨</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">
              Sign in to start removing backgrounds with AI
            </p>
          </div>

          {/* Sign In Component */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <SignIn />
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              New here? Create your account to get started with AI background
              removal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
