import { cookies } from "next/headers";

import {
  createToken,
  verifyToken,
  SessionPayload,
} from "./jwt";

const COOKIE_NAME = "__clinicflow_session";

export async function createSession(
  payload: SessionPayload
) {
  const token = await createToken(payload);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}