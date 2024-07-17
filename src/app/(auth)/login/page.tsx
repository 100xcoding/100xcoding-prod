import { MagicSignIn } from "@/components/magic-sign-in";
import { SignIn } from "@/components/sign-in";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="bg-dark-300 text-white flex max-h-screen h-screen">
      <div className="container my-auto ">
        <div className="sub-container max-w-[496px] mx-auto">
          <div className="bg-card bg-cover shadow-lg p-6 rounded-xl">
            <Link
              href="/"
              className="text-center block tracking-wider text-4xl font-bold  mt-4 mb-6"
            >
              100xCoding
            </Link>
            <p className="text-center text-lg mb-6">
              Welcome 👋
              <br />
              Login to unlock access to{" "}
              <span className="font-bold">100xCoding!</span>
            </p>
            <div className="space-y-4">
              <SignIn />
              <div className="text-center relative after:bg-white after:absolute after:top-1/2 after:left-0 after:w-full after:h-[2px] after:z-0">
                <span className="relative z-10 inline-block bg-[#1F2527] px-4 my-2">
                  OR
                </span>
              </div>
              <MagicSignIn />
            </div>
            <small className="block text-center mt-6 px-6">
              By clicking &#34;{"Login"}&#34; above, you agree to our{" "}
              <Link className="text-[#6665E5] " href="/">
                Terms of service
              </Link>{" "}
              and acknowledge our{" "}
              <Link className="text-[#6665E5]" href="/">
                Privacy Policy.
              </Link>
            </small>
          </div>
        </div>
      </div>
      <Image
        src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={1000}
        height={1000}
        className="object-cover max-w-[70%] w-full hidden md:block "
        // placeholder="blur"
        alt="poster"
      />
    </div>
  );
};

export default LoginPage;
