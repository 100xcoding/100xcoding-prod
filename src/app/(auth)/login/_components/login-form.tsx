"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { signin } from "@/actions/auth";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { magicLinkSignIn } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { LoadingButton } from "@/components/ui/loading-button";
const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required!",
    })
    .email("Email is not valid"),
});
type FormSchema = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const seacrhParams = useSearchParams();
  const message = seacrhParams.get("msg");
  const router = useRouter();
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signin("github");
  };
  const handleSubmitDiscord = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signin("discord");
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as keyof FormSchema]);
    });
    await magicLinkSignIn(formData);
    // console.log("LOGINPAGE", result);
    toast.success("Check your email for sign in link");
    router.push("/");
  };
  return (
    <div className="bg-dark-300 text-white flex  h-screen overflow-hidden">
      <div className="container py-10 my-auto remove-scrollbar overflow-y-scroll">
        <div className="sub-container max-w-[496px]  mx-auto">
          <div className="bg-card bg-cover shadow-lg p-6 rounded-xl ">
            <Link
              aria-label="100xcoding"
              href="/"
              className="flex justify-center  mt-4 mb-6"
            >
              <Logo />
            </Link>
            <p className="text-center text-lg mb-6">
              Welcome 👋
              <br />
              Login to unlock access to{" "}
              <span className="font-bold">100xCoding!</span>
            </p>
            <div className="space-y-4">
              {/* <SignIn /> */}
              <form onSubmit={handleSubmit}>
                <LoadingButton
                  aria-label="Log in using GitHub"
                  type="submit"
                  variant={"secondary"}
                  disabled={isLoading}
                  loading={isLoading}
                  className="w-full tracking-wide bg-dark-200 flex items-center gap-4 text-base py-6"
                >
                  <FaGithub className="text-2xl" />
                  <span>Log in using GitHub</span>
                </LoadingButton>
              </form>
              {/* <DiscordSignIn /> */}
              <form onSubmit={handleSubmitDiscord}>
                <LoadingButton
                  aria-label="Log in using Discord"
                  type="submit"
                  variant={"secondary"}
                  disabled={isLoading}
                  loading={isLoading}
                  className="w-full tracking-wide bg-[#5865F2] flex items-center gap-4 text-base py-6"
                >
                  <FaDiscord className="text-2xl" />
                  <span>Log in using Discord</span>
                </LoadingButton>
              </form>
              <div className="text-center relative after:bg-white after:absolute after:top-1/2 after:left-0 after:w-full after:h-[2px] after:z-0">
                <span className="relative z-10 inline-block bg-[#1F2527] px-4 my-2">
                  OR
                </span>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base ">Email</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-dark-400 ring-offset-green-500  focus-visible:ring-green-500 border-none py-6 text-base"
                            placeholder="Enter your email"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton
                    aria-label="Log in using magic link"
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    className="w-full tracking-wider font-poppins flex gap-4  capitalize py-6 text-base"
                  >
                    Log in using magic link
                  </LoadingButton>
                </form>
              </Form>
            </div>
            <small className="block text-center mt-6 px-6">
              By clicking &#34;{"Login"}&#34; above, you agree to our{" "}
              <Link
                aria-label="terms-of-service"
                className="text-[#6665E5] "
                href="/terms"
              >
                Terms of service
              </Link>{" "}
              and acknowledge our{" "}
              <Link
                aria-label="privacy-policy"
                className="text-[#6665E5]"
                href="/privacy-policy"
              >
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
