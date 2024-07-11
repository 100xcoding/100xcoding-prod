import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getChallenge } from "../_data-access";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Play } from "lucide-react";

const SingleChallenge = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  // console.log(slug)
  const { challenge } = await getChallenge(slug);
  // console.log(challenge);
  if (!challenge) {
    return;
  }
  return (
    <section className="container mx-auto p-3 my-10 space-y-8">
      {/* TODO: CARD 1 to show challenge */}
      <Card className="bg-[#17023A]">
        <CardContent className="mt-4 flex justify-between items-center gap-24">
          <div className="flex-1 space-y-6">
            <p className="dark:bg-primary max-w-max px-2 py-0.5 rounded-lg text-xs sm:text-sm font-raleway font-medium uppercase tracking-wider">
              {challenge.challengeCategory?.name}
            </p>
            <h2 className="capitalize font-roboto text-4xl tracking-wider font-semibold">
              {challenge.title}
            </h2>
            <p className="font-inter text-sm md:text-lg text-slate-400">
              {challenge.description}
            </p>
            <Link
              href={"/"}
              className="flex text-lg items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-fit  px-4 py-2.5 rounded capitalize font-openSans tracking-wide font-medium"
            >
              start challenge
              <Play />
            </Link>
          </div>
          <div className=" border   ">
            <Image
              src={getImageUrl(challenge?.image!)}
              width={"500"}
              height={"500"}
              alt={challenge?.title}
              className=" "
            />
          </div>
        </CardContent>
      </Card>
      {/* TODO: FIGMA EMBED */}
      <Card className="bg-[#17023A]">
        <CardContent className="p-4">
          <iframe
            loading="lazy"
            className="h-[600px]  w-full  overflow-hidden"
            src={challenge.figmaDesktop!}
          ></iframe>
        </CardContent>
      </Card>
      {/* TODO:Description */}
      <div className="flex gap-4 ">
        <Card className="bg-[#17023A]">
          <CardHeader>
            <h3 className="font-raleway font-semibold tracking-wide text-3xl">
              📝Brief
            </h3>
          </CardHeader>
          <CardContent>{challenge.about}</CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="bg-[#17023A]">
            <CardHeader>
              <h3>💡 Resources</h3>
            </CardHeader>
            <CardContent>{challenge.resource}</CardContent>
          </Card>
          <Card className="bg-[#17023A]">
            <CardHeader>
              <h3>Get Involved with the Community</h3>
            </CardHeader>
            <CardContent>
              <p>
                Join our Discord community and share your solutions with others.
                Ask questions and get answers from the fellow developers, help
                others and get involved with the community.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href={"/"}
                className="flex text-lg items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-fit  px-4 py-2.5 rounded capitalize font-openSans tracking-wide font-medium"
              >
                join discord
                <Play />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SingleChallenge;
