import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            📝 NoteBookmark
          </Link>
          <div className="flex gap-6 items-center">
            {isAuthenticated ? (
              <>
                <Link
                  href="/notes"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Notes
                </Link>
                <Link
                  href="/bookmarks"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Bookmarks
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    Welcome, <span className="font-semibold">{user?.username}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
