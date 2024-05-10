import { Tooltip } from "antd";
import { ExitButton } from "../../../../../components/ExitButton";
import { handleDelete, handleEdit } from "../../actions";
import { sql } from "@vercel/postgres";
import { DeleteButton } from "@/components/ActionButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function WritePage({
  params: { boardId, postId },
}: {
  params: { boardId: string; postId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const { rows } =
    await sql`SELECT title, content, board FROM posts WHERE id = ${postId} AND author_email = ${session.user.email} LIMIT 1`;

  if (!rows.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">수정 권한이 없는 글입니다.</h1>
        <Link
          href={`/b/${boardId}`}
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          게시판으로 돌아가기
        </Link>
      </div>
    );
  }

  const { title, content, board } = rows[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">글 수정하기</h1>
      <form className="w-full max-w-3xl" action="#">
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
              defaultValue={title}
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
              defaultValue={content}
            />
          </div>
        </div>
        <input type="hidden" name="boardId" value={boardId} />
        <input type="hidden" name="postId" value={postId} />
        <div className="flex items-center gap-2">
          {/* <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 font-bold text-white text-md rounded"
            style={{ display: draft ? "block" : "none" }}
            type="submit"
            // formAction={handlePublishWithId}
          >
            발행
          </button> */}

          <button
            formAction={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 font-bold text-white text-md rounded"
          >
            저장
          </button>

          <DeleteButton
            postId={parseInt(postId)}
            size="md"
            redirectTo={`/b/${board}`}
          />

          <ExitButton boardId={boardId} />
        </div>
      </form>
    </div>
  );
}
