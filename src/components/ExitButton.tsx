"use client";

import { Popconfirm } from "antd";
import { useRouter } from "next/navigation";

export function ExitButton({ boardId }: { boardId: string }) {
  const router = useRouter();

  return (
    <Popconfirm
      title="정말 나가시겠습니까?"
      description="저장되지 않은 변경사항은 삭제됩니다."
      onConfirm={() => router.push(`/b/${boardId}`)}
      okText="나가기"
      cancelText="취소"
    >
      <button
        className="bg-gray-500 hover:bg-gray-600 px-4 py-1 text-white text-md rounded"
        type="button"
      >
        나가기
      </button>
    </Popconfirm>
  );
}
