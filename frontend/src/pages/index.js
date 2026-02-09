import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>NoteBookmark Manager - Login</title>
          <meta name="description" content="Personal Notes and Bookmarks Manager" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              📝 Welcome to NoteBookmark Manager
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Organize your thoughts and save your favorite links in one place
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h2>
            <div className="space-y-4">
              <Link
                href="/login"
                className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block w-full text-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>NoteBookmark Manager</title>
        <meta name="description" content="Personal Notes and Bookmarks Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            📝 Welcome to NoteBookmark Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Organize your thoughts and save your favorite links in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/notes" className="block">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition cursor-pointer">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-3xl font-bold mb-2">Notes</h2>
              <p className="text-blue-100 mb-4">
                Create and manage your personal notes with tags and search functionality
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                Go to Notes →
              </button>
            </div>
          </Link>

          <Link href="/bookmarks" className="block">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition cursor-pointer">
              <div className="text-5xl mb-4">🔖</div>
              <h2 className="text-3xl font-bold mb-2">Bookmarks</h2>
              <p className="text-purple-100 mb-4">
                Save and organize your favorite links with automatic title fetching
              </p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
                Go to Bookmarks →
              </button>
            </div>
          </Link>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">Create, edit, and delete notes and bookmarks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">Tag-based organization and filtering</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">Full-text search across notes and bookmarks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">Mark items as favorites</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">Auto-fetch bookmark titles from URLs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">Responsive and intuitive UI</span>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
