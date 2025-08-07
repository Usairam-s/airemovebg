import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href={"/"} className="text-2xl font-bold text-indigo-600">
            AI RemoveBG
          </Link>
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Remove Backgrounds from
              <span className="block text-indigo-600">Instantly and Free</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Perfect your selfies, headshots, and personal portraits! Upload
              pictures of yourself or loved ones and let our AI instantly remove
              background.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-yellow-800 font-medium">
                ✨ Ideal for: Selfies • Profile Pictures • Headshots • Personal
                Portraits
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg"
                >
                  Perfect Your Photos Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Demo Visual */}
          <div className="mt-16 p-8 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Transform Your Personal Photos
            </h3>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="space-y-4">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🤳</div>
                    <p>Your Selfie/Photo</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✨</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-full h-48 bg-transparent rounded-lg flex items-center justify-center border-2 border-dashed border-indigo-300">
                  <div className="text-center text-indigo-600">
                    <div className="text-4xl mb-2">👤</div>
                    <p>Background Removed Perfectly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800">
              Perfect For Your Personal Photos
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="text-4xl">📸</div>
                <h4 className="font-semibold">Selfies</h4>
                <p className="text-sm text-gray-600">
                  Remove messy backgrounds from your selfies
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl">👔</div>
                <h4 className="font-semibold">Headshots</h4>
                <p className="text-sm text-gray-600">
                  Professional headshots for LinkedIn & resumes
                </p>
              </div>
              {/* <div className="text-center space-y-3">
                <div className="text-4xl">👨‍👩‍👧‍👦</div>
                <h4 className="font-semibold">Family Photos</h4>
                <p className="text-sm text-gray-600">
                  Clean up family pictures and portraits
                </p>
              </div> */}
              <div className="text-center space-y-3">
                <div className="text-4xl">📱</div>
                <h4 className="font-semibold">Profile Pics</h4>
                <p className="text-sm text-gray-600">
                  Perfect profile pictures for social media
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold">Instant Results</h3>
              <p className="text-gray-600">
                AI processes your personal photos in seconds, not minutes
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💇</span>
              </div>
              <h3 className="text-xl font-semibold">Perfect Hair & Details</h3>
              <p className="text-gray-600">
                Advanced AI detects hair strands and facial features precisely
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold">Privacy First</h3>
              <p className="text-gray-600">
                Your personal photos are processed securely and privately
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-indigo-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Perfect Your Personal Photos?
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands who use our AI to create stunning selfies,
              headshots, and personal portraits
            </p>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                Start Perfecting Your Photos
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 AI RemoveBG. Made with ❤️ for your personal photos.</p>
        </div>
      </footer>
    </div>
  );
}
