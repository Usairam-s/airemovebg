import { Button } from "@/components/ui/button";
import { SignIn, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
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
              Remove Backgrounds
              <span className="block text-indigo-600">Instantly with AI</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload any image and let our AI instantly remove the background.
              Perfect for product photos, portraits, and creative projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Demo Visual */}
          <div className="mt-16 p-8 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="space-y-4">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">📷</div>
                    <p>Original Image</p>
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
                    <div className="text-4xl mb-2">🎯</div>
                    <p>Background Removed</p>
                  </div>
                </div>
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
                AI processes your images in seconds, not minutes
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold">Precise Edges</h3>
              <p className="text-gray-600">
                Advanced AI detects even the finest details and hair strands
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-xl font-semibold">High Quality</h3>
              <p className="text-gray-600">
                Download in original resolution with transparent background
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-indigo-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Remove Backgrounds?
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of users who trust our AI for professional results
            </p>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                Start Removing Backgrounds
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 AI RemoveBG. Made with ❤️ for creators everywhere.</p>
        </div>
      </footer>
    </div>
  );
}
