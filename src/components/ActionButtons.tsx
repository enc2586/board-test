"use client";

import { handleDelete, handleEdit } from "@/app/b/[boardId]/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFormStatus } from "react-dom";

export function ActionButtons({
  boardId,
  postId,
  size = "md",
  redirectTo,
}: {
  boardId: string;
  postId: number;
  size?: "xs" | "sm" | "md" | "lg";
  redirectTo?: string;
}) {
  return (
    <div className="flex gap-1">
      <EditButton boardId={boardId} postId={postId} size={size} />
      <DeleteButton size={size} postId={postId} redirectTo={redirectTo} />
    </div>
  );
}

export function EditButton({
  boardId,
  postId,
  size = "md",
}: {
  boardId: string;
  postId: number;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <Link href={`/b/${boardId}/${postId}/edit`}>
      <button
        className={`bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 text-white text-${size} rounded`}
      >
        수정
      </button>
    </Link>
  );
}

export function DeleteButton({
  size,
  postId,
  redirectTo,
}: {
  size: "xs" | "sm" | "md" | "lg";
  postId: number;
  redirectTo?: string;
}) {
  let [pending, startTransition] = useTransition();
  const router = useRouter();

  console.log(redirectTo);

  return (
    <button
      type="button"
      onClick={() => {
        startTransition(async () => {
          await handleDelete(postId);
          if (redirectTo) router.push(redirectTo);
        });
      }}
      disabled={pending}
      className={`bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-1 text-white text-${size} rounded`}
    >
      삭제
    </button>
  );
}
