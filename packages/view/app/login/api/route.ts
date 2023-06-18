import { cookies } from 'next/headers'
import {NextResponse} from "next/server";
import * as process from "process";

export async function GET(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  return NextResponse.json('Hello, Next.js!')
}

// sign-in
export async function POST(req: Request) {
  const { username, email, password } = await req.json()

  const res = await fetch(`${process.env.BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password }),
  })

  return NextResponse.json(await res.json())
}
