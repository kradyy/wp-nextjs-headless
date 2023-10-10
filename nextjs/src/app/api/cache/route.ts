import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllPages } from "@/utils/pages";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const slug = req.nextUrl.searchParams.get("slug");
  const purgeall = req.nextUrl.searchParams.get("purgeall");

  if (secret !== process.env.CACHE_CLEARING_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const pages = await getAllPages();
  const uris = pages.map((page: any) => page.uri);

  if (slug) {
    if (!uris.includes(slug)) {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    revalidatePath(slug, "page");
  }

  if (purgeall) {
    pages.forEach((page: any) => {
      revalidatePath(page.uri, "page");
    });
  }

  return new Response("Cache cleared!");
}
