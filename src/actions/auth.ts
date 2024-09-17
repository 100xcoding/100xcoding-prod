"use server";
import { signOut, signIn } from "@/auth";

export async function signout() {
  await signOut({
    redirectTo: "/",
  });
}
export async function signin(value: string) {
  await signIn(value);
}
export async function magicLinkSignIn(formData: FormData) {
  await signIn("resend", {
    email: formData.get("email") as string,
    callbackUrl: "/verify",
    redirect: false,
  });
}
