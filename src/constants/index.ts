import { FaCode } from "react-icons/fa6";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { GrResources } from "react-icons/gr";
import { MdQuiz } from "react-icons/md";
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
    symbol: MdQuiz,
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
    title: "Find the Perfect Challenge ",
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

export const testimonialsData = [
  {
    quote:
      "This platform has been a game-changer for my frontend development skills. The variety of projects is amazing, and each one is designed to tackle different aspects of frontend development. It's helped me build a strong portfolio and gain confidence in my abilities.",
    name: "Alex Johnson",
  },
  {
    quote:
      "I've tried many resources to improve my frontend skills, but this platform stands out. The projects are not only practical but also incredibly relevant to what employers are looking for. I've learned so much and feel well-prepared for real-world challenges.",
    name: "Samantha Lee",
  },
  {
    quote:
      "The frontend projects available on this platform are simply fantastic. They range from beginner to advanced levels, allowing me to steadily improve my skills. The support and community are also wonderful, making my learning experience enjoyable and effective.",
    name: "Michael Chen",
  },
  {
    quote:
      "Using this platform has been an invaluable part of my development journey. The projects are thoughtfully designed to enhance your learning curve. I appreciate how each project addresses different frontend techniques and technologies, making me a more well-rounded developer.",
    name: "Emily Taylor",
  },
  {
    quote:
      "I love this platform! The frontend projects are exactly what I needed to practice and perfect my skills. The hands-on experience I've gained here is unparalleled, and it's reflected in the improvement of my coding abilities and my confidence in tackling complex problems.",
    name: "Chris Morales",
  },
  {
    quote:
      "This platform offers an exceptional way to practice frontend development. The diversity and quality of the projects have been instrumental in my learning process. The practical experience and knowledge I've acquired have made a significant difference in my job readiness.",
    name: "Jessica Wong",
  },
];

export const challengeData = [
  {
    id: 1,
    title: "Recipe Page",
    description:
      "Create a recipe page using HTML, CSS, and JavaScript. The page should include a list of recipes, a search bar, and a filter option.",
    level: "Newbie",
    design: "/image1.jpg",
  },
  {
    id: 2,
    title: "Weather App",
    description:
      "Build a weather app that displays the current weather conditions in a specific location. The app should show the temperature, humidity, and wind speed.",
    level: "Junior",
    design: "/image1.jpg",
  },
  {
    id: 3,
    title: "E-commerce Website",
    description:
      "Develop an e-commerce website that allows users to browse products, add items to their cart, and complete the purchase process. The site should be responsive and user-friendly.",
    level: "Intermediate",
    design: "/image1.jpg",
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description:
      "Design a social media dashboard that displays user activity, engagement metrics, and content performance. The dashboard should include graphs, charts, and data tables.",
    level: "Advanced",
    design: "/image1.jpg",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "Create a personal portfolio website to showcase your projects, skills, and experience. The site should be visually appealing, easy to navigate, and responsive on all devices.",
    level: "Expert",
    design: "/image1.jpg",
  },
];
