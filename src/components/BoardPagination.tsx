"use client";

import { Pagination } from "antd";
import { useRouter } from "next/navigation";

export function BoardPagination({
  boardId,
  page,
  total,
  postsPerPage,
}: {
  boardId: string;
  page: number;
  total: number;
  postsPerPage: number;
}) {
  const router = useRouter();

  const onChange = (page: number) => {
    router.push(`/b/${boardId}?page=${page}&postsPerPage=${postsPerPage}`);
  };

  const onShowSizeChange = (current: number, size: number) => {
    console.log(current, size);
    const currentIdx = (page - 1) * postsPerPage;
    const newPage = Math.floor(currentIdx / size) + 1;

    router.push(`/b/${boardId}?page=${newPage}&postsPerPage=${size}`);
  };

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        current={page}
        pageSize={postsPerPage}
        total={total}
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
      />
    </div>
  );
}
