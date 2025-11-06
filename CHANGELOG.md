# Changelog: Architectural Fixes for Stability & Next.js 15 Compatibility

This document summarizes the critical architectural changes implemented to resolve recurring "Internal Server Errors," hydration mismatches, and build failures related to the upgrade to Next.js 15.

## 1. Hydration Error & Race Condition Fix (`ProtectedRoute`)

**Problem:** A persistent "Internal Server Error" was caused by a hydration mismatch. The server would render a protected page for an authenticated user, but the client-side `useAuth` hook would initialize with `user: null`, causing the initial client render to mismatch the server's HTML.

**Solution:**
- **`src/hooks/useAuth.tsx`**: An `isInitialized` state was added to the `useAuth` hook. This flag is `false` until the client has finished checking for an active user session.
- **`src/components/auth/ProtectedRoute.tsx`**: A new `ProtectedRoute` component was created. This component acts as a gatekeeper for all protected pages. It checks the `isInitialized` flag from `useAuth` and shows a loading spinner, preventing the page's content from rendering on the client until authentication is confirmed.
- **Wrapping All Protected Pages**: Every page within the role-specific directories (e.g., `/student`, `/tutor`, `/super-admin`) was wrapped with `<ProtectedRoute>`. This ensures the safe rendering logic is applied consistently, eliminating the root cause of the hydration errors.

This pattern guarantees that the client-side render will only occur after the auth state is synchronized, thus matching the server-rendered HTML.

## 2. Next.js 15 Dynamic Route Parameter Fix

**Problem:** The application failed to build, citing an error with `useSearchParams()` on dynamic pages like `[classId]/page.tsx`. This is because Next.js 15 changed how route parameters are passed to client components; they are now `Promise` objects.

**Solution:**
- All dynamic route pages (those with brackets in their filename, like `[classId]`) that are also client components (`'use client'`) were updated.
- The `params` prop type was changed from a plain object to a `Promise`.
- The hook `React.use(params)` was used at the beginning of the component to correctly and synchronously unwrap the `classId` (or other parameters) from the `params` promise. This is the new, required pattern in React 19 / Next.js 15 for handling asynchronous props in client components.

These combined changes have made the application architecture more robust, resilient to race conditions, and compatible with the latest version of Next.js.