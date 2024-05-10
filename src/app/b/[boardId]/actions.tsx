"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleWrite(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const boardId = formData.get("boardId") as string;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { message: "로그인이 필요합니다." };
  }

  if (title.length < 3) return;

  const result = await sql`
      INSERT INTO posts
      (board, author_email, author_name, title, content) VALUES
      (${boardId}, ${session.user.email}, ${session.user.name}, ${title}, ${content})
      RETURNING id;`;

  redirect(`/b/${boardId}`);
}

export async function handleEdit(formData: FormData) {
  const postId = parseInt(formData.get("postId") as string);
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { message: "로그인이 필요합니다." };
  }

  if (title.length < 3) return;

  const result = await sql`
      UPDATE posts
      SET title = ${title}, content = ${content}, created_at = NOW()
      WHERE id = ${postId} AND author_email = ${session.user.email}
      RETURNING board;`;

  redirect(`/b/${result.rows[0].board}/${postId}`);
}

type FormState = {
  message: string;
  errors: object;
  fieldValues: object;
};

export async function handleDelete(postId: number): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { message: "error", errors: {}, fieldValues: {} };
  }

  const result = await sql`
      DELETE FROM posts WHERE id = ${postId} AND author_email = ${session.user.email} RETURNING board;`;

  revalidatePath(`/b/${result.rows[0].board}`);

  return { message: "success", errors: {}, fieldValues: {} };
}

// export async function handlePublish(postId: number, formData?: FormData) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user) {
//     return { message: "로그인이 필요합니다." };
//   }

//   if (formData) await handleEdit(postId, formData, false);

//   const result = await sql`
//     UPDATE posts
//     SET draft = false
//     WHERE id = ${postId} AND author_email = ${session.user.email}
//     RETURNING board;
//   `;

//   if (result.rowCount === 0) {
//     return { message: "권한이 없습니다." };
//   }

//   redirect(`/b/${result.rows[0].board}`);
// }
