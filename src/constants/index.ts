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
    path: "/resources",
    text: "Resources",
  },
  // {
  //   id: 3,
  //   path: "/",
  //   text: "Blog",
  // },
  // {
  //   id: 4,
  //   path: "/quizzes",
  //   text: "Quizzes",
  // },
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
  // {
  //   id: 3,
  //   path: "/",
  //   text: "Blog",
  //   symbol: GrResources,
  // },
  // {
  //   id: 4,
  //   path: "/",
  //   text: "Quizzes",
  //   symbol: MdQuiz,
  // },
];

export const workData = [
  {
    id: 1,
    title: "Sign up for free in seconds",
    description:
      "Create an account quickly and easily to start exploring all the available challenges.",
    icon: GoShieldLock,
  },
  {
    id: 2,
    title: "Find the Perfect Challenge ",
    description:
      "Start your web development mastery by picking the perfect design challenge and building it.",
    icon: FaCode,
  },
  {
    id: 3,
    title: "Share your solution",
    description:
      "Submit your completed projects and receive valuable feedback from the community to enhance your abilities.",
    icon: IoShareSocialSharp,
  },
];

export const testimonialsData = [
  {
    quote:
      "This platform has been a game-changer for my frontend development skills. The variety of projects is amazing, and each one is designed to tackle different aspects of frontend development. It's helped me build a strong portfolio and gain confidence in my abilities.",
    name: "Alex Johnson",
    socialLink: "",
  },
  {
    quote:
      "I've tried many resources to improve my frontend skills, but this platform stands out. The projects are not only practical but also incredibly relevant to what employers are looking for. I've learned so much and feel well-prepared for real-world challenges.",
    name: "Samantha Lee",
    socialLink: "",
  },
  {
    quote:
      "The frontend projects available on this platform are simply fantastic. They range from beginner to advanced levels, allowing me to steadily improve my skills. The support and community are also wonderful, making my learning experience enjoyable and effective.",
    name: "Michael Chen",
    socialLink: "",
  },
  {
    quote:
      "Using this platform has been an invaluable part of my development journey. The projects are thoughtfully designed to enhance your learning curve. I appreciate how each project addresses different frontend techniques and technologies, making me a more well-rounded developer.",
    name: "Emily Taylor",
    socialLink: "",
  },
  {
    quote:
      "I love this platform! The frontend projects are exactly what I needed to practice and perfect my skills. The hands-on experience I've gained here is unparalleled, and it's reflected in the improvement of my coding abilities and my confidence in tackling complex problems.",
    name: "Chris Morales",
    socialLink: "",
  },
  {
    quote:
      "This platform offers an exceptional way to practice frontend development. The diversity and quality of the projects have been instrumental in my learning process. The practical experience and knowledge I've acquired have made a significant difference in my job readiness.",
    name: "Jessica Wong",
    socialLink: "",
  },
];
export const faqs = [
  {
    id: 1,
    question: "What is 100xcoding and what does it offer?",
    answer:
      "100x Coding is a platform designed to help you improve your coding skills. It offers a variety of coding challenges across different difficulty levels to help you practice and learn new concepts.",
  },
  {
    id: 2,
    question: "What difficulty levels do the coding challenges have?",
    answer:
      "100xCoding offers challenges in three main difficulty levels: Beginner, Intermediate, and Advanced. This allows you to find challenges that match your current skill level and gradually progress as you learn.",
  },
  {
    id: 3,
    question: "Are there hints or solutions available for the challenges?",
    answer:
      "Don't get discouraged if you hit a roadblock on a challenge! We also provide links to helpful resources like tutorials and articles to solidify your understanding. Stuck and need a different perspective? Additionally, we have a Discord server, where you can connect with the 100x Coding community there for further guidance and support.",
  },
  {
    id: 4,
    question: "Can I skip challenges or do I have to complete them in order?",
    answer:
      "ou can skip challenges if you prefer, but it's generally recommended to work through them in order. This will ensure you build a strong foundation in core concepts before moving on to more advanced topics.",
  },
  {
    id: 5,
    question: "How can I submit my code and see if it works?",
    answer:
      "Each challenge includes a code editor for writing your solution. Once your challenge is completed and published, community members will provide feedback on your code based on the challenge.",
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
export const FILES = {
  demo: {
    "/index.html": {
      code: '<!DOCTYPE html>\n<html>\n\n<head>\n  <title>100xcoding Sandbox</title>\n  <meta charset="UTF-8" />\n</head>\n\n<body>\n  <h1>Accelerate Your Coding Journey with 100xCoding Developer Challenges 🚀</h1>\n \n  <script src="src/index.js"></script>\n</body>\n\n</html>',
    },
    "/src/styles.css": {
      code: "body {\n  font-family: sans-serif;\n  background-color: #1F2937;\n  text-align: center;\n  color: white;\n  padding-top: 64px;\n}\n",
    },
    "/index.js": {
      code: 'import "./styles.css";\n\n',
    },
  },
};
