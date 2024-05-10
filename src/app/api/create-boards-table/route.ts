import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await sql`
      DROP TABLE IF EXISTS boards`;

    await sql`
      CREATE TABLE boards (
        id varchar(255) NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        rule jsonb NOT NULL DEFAULT '{}'::jsonb
      )`;

    const result = await sql`
    INSERT INTO boards (id, name, rule) VALUES
      ('notice', '학사공지', '{"isAnonymous": false}'),
      ('club', '동아리소식', '{"isAnonymous": false}'),
      ('free', '자유게시판', '{"isAnonymous": true}')`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
