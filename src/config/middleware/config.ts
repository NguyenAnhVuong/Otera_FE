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
    path: "/temple",
    auth: false,
  },
  {
    path: "/verify/:path*",
    auth: false,
  },
  //   {
  //     path: "/temple-register",
  //     auth: true,
  //     role: ERole.SYSTEM,
  //   },
  {
    path: authRequireRouters,
    auth: true,
  },
];

export const redirectRouters = {
  login: "/login",
  register: "/register",
  temple: "/temple",
};
