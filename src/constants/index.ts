import { FaCode } from "react-icons/fa6";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { GrResources } from "react-icons/gr";
import { SiMicrodotblog } from "react-icons/si";
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
