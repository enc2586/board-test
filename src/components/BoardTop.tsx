import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function BoardTop({ boardId }: { boardId: string }) {
  const { rows } =
    await sql`SELECT name, rule FROM boards WHERE id = ${boardId} LIMIT 1`;

  return (
    <div className="flex items-center">
      <h1 className="text-3xl font-bold mb-4">{rows[0].name}</h1>
      <div style={{ flex: 1 }} />
      <div>
        <Link href={`/b/${boardId}/write`}>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-1 text-white text-md rounded">
            글쓰기
          </button>
        </Link>
      </div>
    </div>
  );
}
