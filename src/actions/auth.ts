"use server";
import { signOut, signIn } from "@/auth";

export async function signout() {
  await signOut({
    redirectTo: "/",
  });
}
export async function signin() {
  await signIn("github", { redirectTo: "/" });
}
export async function magicLinkSignIn(formData: FormData) {
  await signIn("resend", formData);
}
