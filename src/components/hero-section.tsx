import Link from "next/link"
import { Button } from "./ui/moving-border"

export const HeroSection = () => {
  return (
    <div className=''>
        <div className="w-full  text-center my-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-wider w-full sm:w-[85%] xl:w-[70%] mx-auto "> <strong className="text-primary">Projects</strong> who helps to improve <strong className="text-primary">Coding</strong> skills!</h1>
            <p className="my-6 text-xl font-inter font-medium w-full sm:w-[70%] lg:w-[60%] mx-auto text-slate-300">Coding projects is the best way to learn and practice your skills and enhance your portfolio.</p>
            <div className="my-10">
                <Link href={'/'}>
                <Button borderRadius=".6rem" className="bg-primary text-white border-violet-500 tracking-wide font-bold font-lato text-base px-6 py-2">Start Building now.</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}
