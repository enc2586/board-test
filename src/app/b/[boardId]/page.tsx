import { sql } from "@vercel/postgres";
import BoardTop from "../../../components/BoardTop";
import { BoardTable } from "@/components/BoardTable";
import { Pagination } from "antd";
import { redirect } from "next/navigation";
import { BoardPagination } from "../../../components/BoardPagination";

export default async function BoardMenuPage({
  params,
  searchParams,
}: {
  params: { boardId: string };
  searchParams: { page: string; postsPerPage: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const postsPerPage = parseInt(searchParams.postsPerPage) || 10;

  if (postsPerPage < 1 || postsPerPage > 50 || page < 1) {
    console.log(page);
    const newPage = page < 1 ? 1 : page;
    const newPostsPerPage =
      postsPerPage < 1 || postsPerPage > 50 ? 10 : postsPerPage;

    redirect(
      `/b/${params.boardId}?page=${newPage}&postsPerPage=${newPostsPerPage}`
    );
  }

  const [{ rows: posts }, { rows: result }] = await Promise.all([
    sql`SELECT * FROM posts
        WHERE board = ${params.boardId} AND draft = false
        ORDER BY created_at DESC
        LIMIT ${postsPerPage} OFFSET ${(page - 1) * postsPerPage};`,
    sql`SELECT COUNT(*) FROM posts
        WHERE board = ${params.boardId} AND draft = false;`,
  ]);

  const totalCnt = parseInt(result[0].count);
  const maxPage = Math.ceil(totalCnt / postsPerPage);

  if (totalCnt > 0 && page > maxPage)
    redirect(
      `/b/${params.boardId}?page=${maxPage}&postsPerPage=${postsPerPage}`
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <BoardTop boardId={params.boardId} />
      <BoardTable posts={posts} boardId={params.boardId} showEditMenu />
      {posts.length < postsPerPage && (
        <div className="flex justify-center mt-4">
          <h4 className="text-gray-600 text-sm">마지막 페이지입니다 :-)</h4>
        </div>
      )}
      <BoardPagination
        boardId={params.boardId}
        page={page}
        total={totalCnt}
        postsPerPage={postsPerPage}
      />
    </div>
  );
}
