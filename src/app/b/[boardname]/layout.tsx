import { BoardInfo } from "./BoardInfo";

export default function BoardMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <BoardInfo />
      {children}
    </div>
  );
}
