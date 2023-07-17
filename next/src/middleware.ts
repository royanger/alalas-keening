import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({ publicRoutes: ['/', "/gm/obs(.*)"] });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
