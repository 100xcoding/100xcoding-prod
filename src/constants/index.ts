import { FaCode } from "react-icons/fa6";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { GrResources } from "react-icons/gr";
import { SiMicrodotblog } from "react-icons/si";
import { GoShieldLock } from "react-icons/go";
import { IoShareSocialSharp } from "react-icons/io5";
export const navbarRoutes = [
  {
    id: 1,
    path: "/challenges",
    text: "Challenges",
  },
  {
    id: 2,
    path: "/solutions",
    text: "Solutions",
  },
  {
    id: 3,
    path: "/",
    text: "Blog",
  },
  {
    id: 4,
    path: "/",
    text: "Quizzes",
  },
];

export const mobileNavbarRoutes = [
  {
    id: 1,
    path: "/challenges",
    text: "Challenges",
    symbol: FaCode,
  },
  {
    id: 2,
    path: "/solutions",
    text: "Solutions",
    symbol: HiCodeBracketSquare,
  },
  {
    id: 3,
    path: "/",
    text: "Blog",
    symbol: GrResources,
  },
  {
    id: 4,
    path: "/",
    text: "Quizzes",
    symbol: SiMicrodotblog,
  },
];

export const workData = [
  {
    id: 1,
    title: "Sign up for free in seconds",
    description:
      "Connect your GitHub account using Login button. You will instantly have access to all the challenges available.",
    icon: GoShieldLock,
  },
  {
    id: 2,
    title: "Find the challenge ",
    description:
      "Choose the right challenge for you to start and convert the design into website.",
    icon: FaCode,
  },
  {
    id: 3,
    title: "Share your solution",
    description:
      "After completing the challenge, you can share the solution with the community and get feedback from the team members and improve your skills.",
    icon: IoShareSocialSharp,
  },
];
