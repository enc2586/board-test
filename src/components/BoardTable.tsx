import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dayjs from "@/utils/dayjs";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ActionButtons } from "./ActionButtons";

export async function BoardTable({
  posts,
  boardId,
  showEditMenu = false,
  currentPostId,
}: {
  posts: any[];
  boardId: string;
  showEditMenu?: boolean;
  currentPostId?: number;
}) {
  if (showEditMenu) {
    const session = await getServerSession(authOptions);
    return (
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">번호</th>
            <th className="py-3 px-6 text-left">제목</th>
            <th className="py-3 px-6 text-left">작성자</th>
            <th className="py-3 px-6 text-center">작성일</th>
            <th className="py-3 px-6 text-center" />
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {posts.map((post) => {
            const dateStr =
              dayjs(post.created_at).format("YYYY-MM-DD") ==
              dayjs().format("YYYY-MM-DD")
                ? dayjs(post.created_at).format("HH:mm")
                : dayjs(post.created_at).format("YYYY-MM-DD");
            return (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={post.id}
              >
                <td className="py-3 px-6 text-center">{post.id}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <Link
                    href={`/b/${boardId}/${post.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left">{post.author_name}</td>
                <td className="py-3 px-6 text-center">{dateStr}</td>
                <td className="py-3 px-6 text-center">
                  {post.author_email === session?.user?.email && (
                    <ActionButtons
                      boardId={boardId}
                      postId={post.id}
                      size={"xs"}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-center">번호</th>
          <th className="py-3 px-6 text-left">제목</th>
          <th className="py-3 px-6 text-left">작성자</th>
          <th className="py-3 px-6 text-center">작성일</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm">
        {posts.map((post) => {
          const dateStr =
            dayjs(post.created_at).format("YYYY-MM-DD") ==
            dayjs().format("YYYY-MM-DD")
              ? dayjs(post.created_at).format("HH:mm")
              : dayjs(post.created_at).format("YYYY-MM-DD");
          return (
            <tr
              className="border-b border-gray-200 hover:bg-gray-100"
              key={post.id}
            >
              <td className="py-3 px-6 text-center">{post.id}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <Link
                  href={`/b/${boardId}/${post.id}`}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  {currentPostId === post.id && (
                    <span className="text-red-500 mr-2">[현재글]</span>
                  )}
                  {post.title}
                </Link>
              </td>
              <td className="py-3 px-6 text-left">{post.author_name}</td>
              <td className="py-3 px-6 text-center">{dateStr}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
