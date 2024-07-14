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
      <Card className="bg-cardLg bg-no-repeat bg-cover shadow-lg w-full text-white border-none rounded-3xl ">
        <CardHeader className="flex flex-col-reverse lg:flex-row justify-between items-center gap-6 lg:gap-24">
          <div className="flex-1 space-y-4 md:space-y-6">
            <p className="bg-green-600 rounded-full text-green-400 w-fit px-4 py-2  text-xs xl:text-sm  font-semibold leading-[16px] uppercase tracking-widest">
              {challenge.challengeCategory?.name}
            </p>
            <h2 className="capitalize text-2xl md:text-4xl tracking-wider font-medium md:font-semibold">
              {challenge.title}
            </h2>
            <p className="text-sm md:text-lg text-dark-700">
              {challenge.description}
            </p>
            {/* <Link
              href={`/playground/${challenge.slug}`}
              className="flex text-base md:text-lg items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-fit  px-4 py-2.5 rounded capitalize font-openSans tracking-wide font-medium"
            >
              start challenge
              <Play />
            </Link> */}
            <Link
              href={`/playground/${challenge.slug}`}
              className="flex text-base md:text-lg items-center gap-2  w-fit  px-4 py-2.5 rounded-lg bg-blue-600 text-blue-400 capitalize font-openSans tracking-wide font-medium"
            >
              start challenge
              <Play />
            </Link>
          </div>
          <div className="">
            <Image
              src={getImageUrl(challenge?.image!)}
              width={"500"}
              height={"500"}
              alt={challenge?.title}
              className=" "
            />
          </div>
        </CardHeader>
      </Card>
      {/* TODO: FIGMA EMBED */}
      <Card className="bg-cover shadow-lg text-white border-none bg-card rounded-2xl">
        <CardContent className="p-4">
          <iframe
            loading="lazy"
            className="h-[600px]  w-full  overflow-hidden rounded-xl"
            src={challenge.figmaDesktop!}
          ></iframe>
        </CardContent>
      </Card>
      {/* TODO:Description */}
      <div className="flex gap-4 flex-wrap lg:flex-nowrap">
        <Card className="bg-cover shadow-lg text-white border-none bg-card rounded-2xl">
          <CardHeader>
            <h3 className="font-raleway font-semibold tracking-wide text-3xl">
              📝Brief
            </h3>
          </CardHeader>
          <CardContent>{challenge.about}</CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="bg-cover shadow-lg text-white border-none bg-card rounded-2xl">
            <CardHeader>
              <h3>💡 Resources</h3>
            </CardHeader>
            <CardContent>{challenge.resource}</CardContent>
          </Card>
          <Card className="bg-cover shadow-lg text-white border-none bg-card rounded-2xl">
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
                className="flex text-base md:text-lg items-center gap-2  w-fit  px-4 py-2.5 rounded-lg bg-blue-600 text-blue-400 capitalize font-openSans tracking-wide font-medium"
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
