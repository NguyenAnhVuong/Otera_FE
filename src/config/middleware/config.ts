import { ERole } from "@/utils/enum";
import { IJwtPayload } from "@/utils/jwt";

export const canAccess = (jwtPayload?: IJwtPayload, role?: ERole) => {
  if (!jwtPayload) return false;
  if (role) {
    return jwtPayload.role === role;
  }
  return true;
};

interface PageAuthorizeConfig {
  path: string;
  auth?: boolean;
  role?: ERole;
  ssr?: boolean;
  redirect?: string;
}

const authRequireRouters =
  "/((?!api|_next/static|_next/image|favicon.ico|images|login|register|temple).*)";

export const authorizer: PageAuthorizeConfig[] = [
  {
    path: "/login",
    auth: false,
  },
  {
    path: "/register",
    auth: false,
  },
  {
    path: "/",
    auth: false,
  },
  {
    path: "/verify/:path*",
    auth: false,
  },
  {
    path: "/forgot-password",
    auth: false,
  },
  {
    path: "/reset-password",
    auth: false,
  },
  {
    path: "/event",
    auth: false,
  },
  {
    path: "/event/:id",
    auth: false,
  },
  {
    path: authRequireRouters,
    auth: true,
  },
];

export const redirectRouters = {
  login: "/login",
  register: "/register",
  temple: "/temple",
  home: "/",
};
