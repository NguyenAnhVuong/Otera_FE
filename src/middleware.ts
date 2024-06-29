import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match } from "path-to-regexp";
import {
  authorizer,
  canAccess,
  redirectRouters,
} from "./config/middleware/config";
import { validateJwtToken } from "./utils/jwt";

// TODO protect route by role
export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const path = req.nextUrl.pathname;

  const config = authorizer.find((config) => match(config.path)(path));
  if (config) {
    const token = req.cookies.get("refreshToken")?.value;
    try {
      const validToken = token && validateJwtToken(token);
      if ((!validToken || !canAccess(validToken, config.role)) && config.auth) {
        const absoluteURL = new URL(redirectRouters.login, req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
      }
      if (validToken && match(config.path)(redirectRouters.login)) {
        const absoluteURL = new URL(redirectRouters.home, req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
      }
      // if (validToken) {
      //   // const accessToken = JWTManager.getToken();
      //   const accessToken = sessionStorage.getItem("accessToken");
      //   console.log("accessToken: ", accessToken);
      //   if (!accessToken) {
      //     const response = await fetch(
      //       "http://localhost:3008/api/user/refresh-token",
      //       {
      //         method: "POST",
      //         credentials: "include",
      //         headers: {
      //           Cookie: "refreshToken=" + token,
      //         },
      //       }
      //     );
      //     const data = await response.json();
      //     if (data) {
      //       JWTManager.setToken(data.accessToken);
      //     }
      //   }
      // }
    } catch (error) {
      console.error(error);
    }
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - register
     * - temple
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|register|temple).*)",
  ],
};
