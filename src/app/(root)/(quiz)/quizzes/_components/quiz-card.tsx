import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const QuizCard = () => {
    return (
        <div className='p-4 border rounded-xl max-w-[360px] w-full space-y-4'>
            <div className="">
                <Image src="https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={"500"} height={500} alt="quiz-image" className='rounded-xl' />
            </div>
            <div className="space-y-2 px-1">
                <p className='dark:bg-primary max-w-max px-2 py-0.5 rounded-lg text-sm'>javscript</p>
                <h2 className='text-xl font-bold tracking-wide font-raleway '>JavaScript Quiz</h2>
                <p className='text-sm tracking-wide font-roboto font-medium dark:text-muted-foreground'>
                    Our JavaScript MCQ quiz is designed to challenge and educate, making it an ideal platform for developers of all levels.
                </p>
                <h4 className='w-full flex items-center justify-between'>Question count <span className=''>10</span></h4>
                <h5 className='w-full flex items-center justify-between'>Max Score <span>100</span></h5>
                <h5 className='w-full flex items-center justify-between'>Duration  <span>10 mins</span></h5>
                <div className="flex items-center justify-between">
                    <p>89+ members completed</p>
                    <Link href="/" >
                        <Play className='dark:bg-primary rounded-full p-2 w-10 h-10' />
                    </Link>
                </div>
            </div>
        </div>
    )
}
