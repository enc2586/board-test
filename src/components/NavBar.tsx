import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { Tooltip } from "antd";
import Link from "next/link";

export async function NavBar() {
  const [session, { rows: boards }] = await Promise.all([
    getServerSession(authOptions),
    sql`SELECT id, name FROM boards;`,
  ]);

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            <Link href="/">BOARD-TEST</Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              {boards.map(({ id, name }) => (
                <Link
                  key={id}
                  href={`/b/${id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {name}
                </Link>
              ))}
            </div>
            {session ? (
              <Tooltip title={session.user?.email} placement="bottomRight">
                <Link href="/api/auth/signout">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Logout
                  </button>
                </Link>
              </Tooltip>
            ) : (
              <Link href="/api/auth/signin">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </Link>
            )}
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
