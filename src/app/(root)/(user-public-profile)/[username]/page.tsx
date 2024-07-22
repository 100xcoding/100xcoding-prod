import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile ",
};
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getPublicProfile } from "../_data-access";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { EditProfileModal } from "../_components/edit-profile-modal";
import { SocialModal } from "../_components/social-modal";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaMedium, FaThreads, FaXTwitter } from "react-icons/fa6";
import {
  SiLeetcode,
  SiCodechef,
  SiCodeforces,
  SiGeeksforgeeks,
} from "react-icons/si";
import { IconType } from "react-icons";
import { IoMdShare } from "react-icons/io";
interface SocialLink {
  id: string;
  userId: string;
  github: string | null;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
  medium: string | null;
  threads: string | null;
  leetcode: string | null;
  gfg: string | null;
  codechef: string | null;
  codeforces: string | null;
  linkedIn: string | null;
}
type IconMap = {
  [key in keyof Omit<SocialLink, "id" | "userId">]?: IconType;
};
import { TbWorld } from "react-icons/tb";
import { EditResumeModal } from "../_components/edit-resume-modal";
import { auth } from "@/auth";
const UserPublicProfile = async ({
  params,
}: {
  params: { username: string };
}) => {
  const { user } = await getPublicProfile(params?.username);
  const session = await auth();
  const iconMap: IconMap = {
    github: FaGithub,
    instagram: FaInstagram,
    medium: FaMedium,
    youtube: FaYoutube,
    twitter: FaXTwitter,
    leetcode: SiLeetcode,
    codechef: SiCodechef,
    threads: FaThreads,
    codeforces: SiCodeforces,
    gfg: SiGeeksforgeeks,
    linkedIn: FaLinkedin,
  };

  const socialLinkResult = user?.socialLink
    ? (Object.keys(user.socialLink) as Array<keyof SocialLink>)
        .filter(
          (key) =>
            key !== "id" &&
            key !== "userId" &&
            user.socialLink![key] !== null &&
            iconMap[key as keyof IconMap],
        )
        .map((key) => ({
          icon: iconMap[key as keyof IconMap]!,
          url: user.socialLink![key] as string,
        }))
    : [];
  return (
    <section className="mx-auto container text-white">
      <Card className="w-full bg-dark-500 border-dark-600 border-opacity-50 my-2 rounded-xl shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 h-[200px]"></CardHeader>
        <div className="px-4 pb-4">
          <div className="flex flex-col md:flex-row md:items-center  justify-between relative">
            <div className="w-full">
              <div className="-translate-y-1/2">
                <Image
                  alt="profile"
                  src={
                    user?.profile?.profileImage
                      ? getImageUrl(user?.profile?.profileImage!)
                      : ""
                  }
                  width={200}
                  height={200}
                  className="rounded-full  object-cover aspect-square w-[200px] h-[200px] "
                />
              </div>

              <div className="-mt-28 md:-mt-20">
                <div className="lg:hidden space-x-4  flex items-center justify-end">
                  <Button className="rounded-full" aria-label="share">
                    {" "}
                    <IoMdShare size={22} />{" "}
                    <span className="hidden lg:inline-block">Share</span>
                  </Button>
                  {session?.user?.id === user?.id && <EditProfileModal />}
                </div>
                <h2 className="text-2xl md:text-4xl font-bold tracking-wider">
                  {user?.name}
                </h2>
                <h5 className="textsm md:text-lg text-dark-700">
                  @{user?.username}
                </h5>
                {user?.profile?.title ? (
                  <p className="mt-4 text-lg md:text-xl font-medium tracking-wide">
                    {user?.profile?.title}
                  </p>
                ) : (
                  <p className="mt-4 text-xl font-medium italic text-dark-600 tracking-wide">
                    Your Tagline
                  </p>
                )}
              </div>
            </div>
            <div className="hidden   items-center lg:flex space-x-4">
              <Button
                className="rounded-full lg:flex lg:items-center lg:gap-2"
                aria-label="share"
              >
                {" "}
                <IoMdShare size={22} />{" "}
                <span className="hidden lg:block">Share</span>
              </Button>
              {session?.user?.id === user?.id && <EditProfileModal />}
            </div>
          </div>
        </div>
      </Card>
      <Card className="w-full bg-dark-500 border-none my-2 rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center flex-row p-4">
          <h4 className="text-xl font-semibold">About</h4>
          {session?.user?.id === user?.id && (
            <SocialModal initialData={user?.socialLink} />
          )}
        </div>
        <div className="px-4">
          {user?.profile?.bio ? (
            <p>{user?.profile?.bio}</p>
          ) : (
            <p className="italic text-dark-600">Tell us about your self</p>
          )}
        </div>
        <CardFooter className="justify-between px-4 mt-4 pb-2">
          <div className="flex items-center gap-3">
            {user?.profile?.website && (
              <Link
                aria-label="website-url"
                href={user?.profile?.website}
                className="bg-blue-600 p-1  text-blue-200 rounded-full w-10 text-2xl h-10 items-center flex justify-center"
              >
                <TbWorld />
              </Link>
            )}
            {socialLinkResult &&
              socialLinkResult.map((item, idx) => (
                <LinkCard key={idx} {...item} />
              ))}
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full bg-dark-500 border-none my-2 rounded-xl shadow-lg overflow-hidden">
        <CardHeader className="flex justify-between items-center flex-row px-4 py-4">
          <h4 className="text-xl">Resume</h4>
          {session?.user?.id === user?.id && <EditResumeModal />}
        </CardHeader>
        <CardContent className="px-4">
          {user?.profile?.resume ? (
            <Link
              aria-label="resume"
              href={getImageUrl(user?.profile?.resume!)}
              className="text-blue-500 underline"
            >
              {user?.profile?.resume}
            </Link>
          ) : (
            <p className="italic text-dark-600">upload resume</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default UserPublicProfile;
const LinkCard = ({ url, icon: Icon }: any) => {
  return (
    <Link
      aria-label={Icon}
      href={url}
      className="bg-blue-600 p-1  text-blue-200 rounded-full w-10 text-2xl h-10 items-center flex justify-center"
    >
      <Icon />
    </Link>
  );
};
