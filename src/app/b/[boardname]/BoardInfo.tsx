"use client";

import { useParams } from "next/navigation";

export function BoardInfo() {
  const { boardname } = useParams();

  return (
    <div>
      <h1>{boardname} 게시판입니다.</h1>
    </div>
  );
}
