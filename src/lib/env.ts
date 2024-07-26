class Env {
  static AUTH_GITHUB_ID: string = process.env.AUTH_GITHUB_ID!;
  static AUTH_GITHUB_SECRET: string = process.env.AUTH_GITHUB_SECRET!;
  static AUTH_SECRET: string = process.env.AUTH_SECRET!;
  static CLOUDFLARE_ACCOUNT_ID: string = process.env.CLOUDFLARE_ACCOUNT_ID!;
  static CLOUDFLARE_ACCESS_KEY_ID: string =
    process.env.CLOUDFLARE_ACCESS_KEY_ID!;
  static CLOUDFLARE_SECRET_ACCESS_KEY: string =
    process.env.CLOUDFLARE_SECRET_ACCESS_KEY!;
  static BUCKET_NAME: string = process.env.BUCKET_NAME!;
  static NEXT_PUBLIC_BUCKET_URL: string = process.env.NEXT_PUBLIC_BUCKET_URL!;
  static RESEND_API_KEY: string = process.env.RESEND_API_KEY!;
  static GTM_ID: string = process.env.GTM_ID!;
  static NEXT_PUBLIC_URL: string = process.env.NEXT_PUBLIC_URL!;
}
export default Env;
