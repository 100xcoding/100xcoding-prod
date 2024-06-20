import React from 'react'
import { QuizList } from './_components/quiz-list'
import { QuizCategories } from './_components/quiz-categories'
const items = [
    {
        id: "123",
        name: "Javascript"
    }
]
const QuizPage = () => {
    return (
        <div className='py-10'>
            <div className="px-4 my-4">
                <QuizCategories items={items} />
            </div>
            <QuizList />
        </div>
    )
}

export default QuizPage