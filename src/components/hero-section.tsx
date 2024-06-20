import Link from "next/link"
import { Button } from "./ui/moving-border"

export const HeroSection = () => {
  return (
    <div className=''>
        <div className="w-full  text-center my-12">
            <h1 className="text-3xl md:text-5xl font-raleway font-bold tracking-wider w-full md:w-[70%] mx-auto space-y-4">Practice with projects who helps to improve coding skills!</h1>
            <p className="my-4 text-lg">Coding projects is the best way to learn and practice your skills and enhance your portfolio.</p>
            <div className="my-10">
                <Link href={'/'}>
                <Button borderRadius="1rem" className="bg-primary text-white border-violet-500 tracking-wide font-bold font-lato text-base px-6 py-2">Start Building now.</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}
