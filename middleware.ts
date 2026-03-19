import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';

const isAuthPage = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)',
  '/reset-password(.*)',
  '/verify-email(.*)',
  '/magic-link(.*)',
  '/onboarding(.*)',
]);

const isAdminPage = createRouteMatcher(['/admin(.*)']);
const isPublicPage = createRouteMatcher([
  '/',
  '/about',
  '/privacy',
  '/terms',
  '/cookies',
  '/refund',
  '/community-rules',
  '/contact',
]);

export default convexAuthNextjsMiddleware(async (request, ctx) => {
  const authenticated = await isAuthenticatedNextjs();

  // Redirect unauthenticated users away from protected pages
  if (!isAuthPage(request) && !isPublicPage(request) && !authenticated) {
    return nextjsMiddlewareRedirect(request, '/sign-in');
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage(request) && authenticated) {
    return nextjsMiddlewareRedirect(request, '/lobby');
  }
});

export const config = {
  // Run middleware on all routes except static files
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
