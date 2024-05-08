import Link from "next/link";

export function NavBar() {
  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            <Link href="/">게시판</Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <Link href="/b/notice" className="text-gray-300 hover:text-white">
                학사공지
              </Link>
              <Link href="/b/club" className="text-gray-300 hover:text-white">
                동아리소식
              </Link>
            </div>
            <Link href="/u/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
