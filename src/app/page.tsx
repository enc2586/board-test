import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function Home() {
  const { rows: boards } = await sql`SELECT * FROM boards;`;
  return (
    <div className="flex items-center justify-center basis-1/2 gap-4">
      <div>
        <h3 className="text-2xl font-bold">게시판 목록</h3>
        <div className="flex-row gap-4">
          {boards.map(({ id, name }) => (
            <Link key={id} href={`/b/${id}`}>
              <span className="font-medium text-blue-600 hover:text-blue-800 mr-2">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
