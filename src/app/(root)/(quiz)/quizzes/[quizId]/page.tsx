"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const question = [
  {
    id: "123",
    text: "fjkdjkdjfdfnsnfsdnkf",
    position: 1,
    options: [
      {
        id: "1234",
        text: "hsdjkahdkhasdasdh",
      },
      {
        id: "12356",
        text: "6845367dkhasdasdh",
      },
      {
        id: "15555",
        text: "hsdjkahdkhasdasdh",
      },
      {
        id: "99999",
        text: "hsopoopoph",
      },
    ],
  },
  {
    id: "7",
    text: "sid the question",
    position: 1,
    options: [
      {
        id: "01",
        text: "hsdjkahdkhasdasdh",
      },
      {
        id: "88",
        text: "6845367dkhasdasdh",
      },
      {
        id: "909",
        text: "hsdjkahdkh909asdasdh",
      },
      {
        id: "10123",
        text: "hsopoopoph",
      },
    ],
  },
];
const QuizPage = ({ params }: { params: { quizId: string } }) => {
  const [quiz, setQuiz] = useState(question);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([
    { questionId: "", optionId: "" },
  ]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleNext = () => {
    setIsActive(false);
    if (quiz.length == currentQuestionIndex) {
      return;
    }
    // if (!selectedAnswer) {
    //     return;
    // }
    setCurrentQuestionIndex((prev) => prev + 1);
    const alreadyAnswered = responses.find(
      (response) => response.questionId === quiz[currentQuestionIndex].id,
    );
    console.log(alreadyAnswered);
    if (alreadyAnswered) {
      setSelectedAnswer(alreadyAnswered?.optionId!);

      let updatedResponse = responses.find(
        (response) => response.questionId === quiz[currentQuestionIndex].id,
      );
      if (updatedResponse) {
        updatedResponse.optionId = selectedAnswer!;
      }
      const newResponse = [...responses, updatedResponse];
      setResponses(newResponse);
    } else {
      setSelectedAnswer("");
      const newResponse = [
        ...responses,
        {
          questionId: quiz[currentQuestionIndex].id,
          optionId: selectedAnswer,
        },
      ];
      setResponses(newResponse);
    }

    // console.log(currentQuestionIndex);
  };
  const handlePrevious = () => {
    if (currentQuestionIndex < 0) {
      return;
    }
    setCurrentQuestionIndex((prev) => prev - 1);
    console.log(currentQuestionIndex);
    console.log(responses);
    const alreadyAnswered = responses.find(
      (response) => response.questionId == quiz[currentQuestionIndex - 1].id,
    );
    console.log(alreadyAnswered);
    if (alreadyAnswered) {
      setSelectedAnswer(alreadyAnswered.optionId);
    }
  };
  const handleSubmit = () => {};
  const handleClick = (id: string) => {
    console.log("option-id", id);
    setSelectedAnswer(id);
    setIsActive(true);
  };
  return (
    <div className="container mx-auto text-white my-10">
      <div className="flex bg-dark-400   w-full justify-between items-center px-4 py-3">
        <h2>Title of Quiz</h2>
        <h3>Timimg</h3>
        <Button
          variant={"secondary"}
          className="bg-red-600 text-red-500 tracking-wide capitalize"
        >
          Submit quiz
        </Button>
      </div>
      <section className="my-10 bg-dark-500  py-4 space-y-2 px-4 rounded-md">
        <p>Question {currentQuestionIndex + 1} of 30</p>
        <h2 className="text-xl tracking-wide">
          {quiz[currentQuestionIndex].text}
        </h2>
      </section>
      <section className="bg-dark-400  py-4 space-y-2 px-4 rounded-md flex flex-col gap-4">
        {quiz[currentQuestionIndex].options.map((option, ind) => (
          <QuizOption
            key={option.id}
            handleClick={handleClick}
            option={option}
            selectedAnswer={selectedAnswer}
            ind={ind}
          />
        ))}
      </section>
      <section className="bg-dark-500 py-4 rounded-md px-4 flex justify-between my-10">
        <Button
          disabled={currentQuestionIndex <= 0}
          onClick={handlePrevious}
          variant={"default"}
        >
          Prev
        </Button>
        <Button
          disabled={quiz.length - 1 == currentQuestionIndex}
          onClick={handleNext}
        >
          Next
        </Button>
      </section>
    </div>
  );
};

export default QuizPage;
const QuizOption = ({ handleClick, option, selectedAnswer, ind }: any) => {
  return (
    <button
      onClick={() => handleClick(option.id)}
      className={`border border-dark-500 rounded-md  py-3 text-left px-4 flex items-center gap-4 ${option.id === selectedAnswer ? "bg-green-600 text-green-500 border-none" : "border border-dark-500"} `}
    >
      <span className="bg-dark-200 rounded-full  px-3 py-1 block">
        {ind + 1}
      </span>
      <span className="block">{option.text}</span>
    </button>
  );
};
