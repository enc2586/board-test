import { Tooltip } from "antd";
import { ExitButton } from "../../../../components/ExitButton";
import { handleWrite } from "../actions";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

export default async function WritePage({
  params,
}: {
  params: { boardId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const result =
    await sql`SELECT name FROM boards WHERE id = ${params.boardId} LIMIT 1`;
  const { name } = result.rows[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{name}에 글쓰기</h1>
      <form className="w-full max-w-3xl">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              제목
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="제목을 입력하세요"
              name="title"
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              내용
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-password"
              placeholder="내용을 입력하세요"
              name="content"
            />
          </div>
        </div>
        <input type="hidden" name="boardId" value={params.boardId} />
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 font-bold text-white text-md rounded"
            type="submit"
            formAction={handleWrite}
          >
            발행
          </button>

          <ExitButton boardId={params.boardId} />
        </div>
      </form>
    </div>
  );
}
