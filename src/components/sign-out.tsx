import { signout } from "@/actions/auth";

export function SignOut() {
  return (
    <form action={signout}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
