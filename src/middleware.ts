import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

// Define the custom middleware function
export async function middleware(req: NextRequest) {
    // Run the internationalization middleware first
    const intlResponse = intlMiddleware(req);
    if (intlResponse) {
        return intlResponse;
    }

    // Check authentication for specific paths
    if ((await isAuthenticated(req)) === false) {
        return new NextResponse("Unauthorized", {
            status: 401,
            headers: { "WWW-Authenticate": "Basic" }
        });
    }
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
        '/(az|en)/:path*',  // Internationalized pathnames
        '/admin/:path*'     // Admin-specific authentication
    ]
};
