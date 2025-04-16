import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

// Define the custom middleware function
export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Exclude /admin routes from the internationalization middleware
    if (pathname.startsWith('/admin')) {
        // Check authentication for admin paths
        if ((await isAuthenticated(req)) === false) {
            return new NextResponse("Unauthorized", {
                status: 401,
                headers: { "WWW-Authenticate": "Basic" }
            });
        }
    } else {
        // For non-admin paths, apply the internationalization middleware
        const intlResponse = intlMiddleware(req);
        if (intlResponse) {
            return intlResponse;
        }
    }

    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store, max-age=0');


    return res;
}

// Authentication function
async function isAuthenticated(req: NextRequest) {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");

    if (authHeader == null) return false;

    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
    return username === process.env.ADMIN_USERNAME &&
        (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string));
}

// Config for matcher
export const config = {
    matcher: [
        '/',
        '/admin/:path*',      // Admin-specific authentication (excluded from i18n)
        '/(az|en|ru)/:path*'     // Internationalized pathnames
    ]
};
