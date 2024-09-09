import { NextRequest, NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";

const middleware: NextMiddleware = async (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("token");

  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export default middleware;
