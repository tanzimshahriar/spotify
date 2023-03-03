import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl;
  
    // If token exists continue unless login page then redirect to home
    console.log("token is:", token);
    if(token){
        if(pathname==="/login") {
            return NextResponse.redirect("/");
        } else {
            console.log("token is: ",token)
            return NextResponse.next();
        }
    }
    // token doesnt exist but is on login page then continue
    if(!token && pathname.includes("/api/auth")) {
        return NextResponse.next();
    }

    // if no token but protected route is requested redirect to login
    if(!token && pathname !== '/login' ) {
        return NextResponse.redirect("/login");
    }
    
}

