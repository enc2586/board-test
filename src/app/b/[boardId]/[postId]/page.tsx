import { authOptions } from "@/utils/authOptions";
import { sql } from "@vercel/postgres";
import dayjs from "@/utils/dayjs";
import { getServerSession } from "next-auth";
import { BoardTable } from "@/components/BoardTable";
import { ActionButtons } from "../../../../components/ActionButtons";
import Link from "next/link";

export default async function PostPage({
  params: { boardId, postId },
}: {
  params: { boardId: string; postId: string };
}) {
  const [session, { rows: posts }, { rows: otherPosts }] = await Promise.all([
    getServerSession(authOptions),
    sql`SELECT * 
        FROM posts 
        LEFT JOIN boards ON posts.board = boards.id 
        WHERE posts.id = ${postId} LIMIT 1;`,
    sql`SELECT * FROM posts
        WHERE board = ${boardId} AND draft = false
        ORDER BY created_at DESC
        LIMIT 5;`,
  ]);

  if (!posts.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">존재하지 않는 글입니다.</h1>
        <Link
          href={`/b/${boardId}`}
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          게시판으로 돌아가기
        </Link>
      </div>
    );
  }

  const post = posts[0];
  const timeStr = dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-end">
        <div className="text-gray-600 text-sm">
          <p>작성자: {post.author_name}</p>
          <p>작성일: {timeStr}</p>
        </div>
        <div style={{ flex: 1 }} />
        {post.author_email === session?.user?.email && (
          <ActionButtons
            boardId={boardId}
            postId={parseInt(postId)}
            redirectTo={`/b/${boardId}`}
          />
        )}
      </div>
      <div
        className="my-4 border p-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <hr className="my-4" />
      <div>
        <h2 className="text-xl font-bold mb-4">{post.name}의 다른 글</h2>
        <BoardTable
          posts={otherPosts}
          boardId={boardId}
          currentPostId={parseInt(postId)}
        />
      </div>
    </div>
  );
}
