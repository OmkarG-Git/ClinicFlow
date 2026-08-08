import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("__clinicflow_session")?.value;

  
  const pathname = request.nextUrl.pathname;
  
  console.log({
    pathname,
    token: !!token,
  });

  const protectedRoutes = [
    "/owner",
    "/doctor",
    "/receptionist",
    "/dashboard",
    "/register-clinic",
    "/super-admin"
  ];

  const authRoutes = [
    "/login",
    "/register",
  ];

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    console.log("Redirecting to unauthorized");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // if(token) {
  //   const result = await verifyToken(token);
  //   if(!result) {
  //     return NextResponse.redirect(new URL("/unauthorized", request.url));
  //   }

  //   if(authRoutes.some(route => pathname.startsWith(route))) {
  //       console.log("Redirecting to role-specific dashboard");
  //       if(result.role === "SUPER_ADMIN" && !pathname.startsWith("/super-admin")) {
  //       return NextResponse.redirect(new URL("/super-admin/dashboard", request.url));
  //     }

  //     if(result.role === "OWNER" && !pathname.startsWith("/owner")) {
  //       console.log("Redirecting OWNER");
  //       return NextResponse.redirect(new URL("/owner/dashboard", request.url));
  //     }

  //     if(result.role === "DOCTOR" && !pathname.startsWith("/doctor")) {
  //       return NextResponse.redirect(new URL("/doctor/dashboard", request.url));
  //     }
  //   }

  // }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/owner/:path*",
    "/doctor/:path*",
    "/receptionist/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };