"use client";

import { IconBadge } from "@/components/icon-badge";
import { useCreatorQuizQuestionById } from "@/services/queries";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { QuestionTitleForm } from "./_components/question-title-form";
import { QuestionScoreForm } from "./_components/question-score-form";
import { QuestionOptionForm } from "./_components/question-option-form";

const QuizQuestionPage = ({
  params,
}: {
  params: { quizId: string; questionId: string };
}) => {
  const { data } = useCreatorQuizQuestionById(params.questionId, params.quizId);
  console.log(data);
  return (
    <>
      {/* {!course?.isPublished && (
      <Banner label="This course is unpublished. It will not be visible to the students." />
    )} */}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Quiz Question setup</h1>
            <span className="text-sm text-slate-700">
              {/* Complete all fields {completionText} */}
              Complete all fields
            </span>
          </div>
          {/* <Actions
          disabled={!isComplete}
          courseId={params.courseId}
          isPublished={course?.isPublished!}
        /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your quiz</h2>
            </div>
            <QuestionTitleForm
              initialData={data}
              quizId={params?.quizId}
              questionId={data?.id}
            />
            <QuestionScoreForm
              initialData={data}
              quizId={params?.quizId}
              questionId={data?.id}
            />
            {/* <DescriptionForm
							initialData={data}
							quizId={data?.id}
						/> */}
            {/* <DurationForm
							initialData={data}
							quizId={data?.id}
						/> */}
            {/* <CategoryForm
							initialData={data}
							quizId={data?.id}
							options={quizCategories?.map((category: QuizCategory) => ({
								label: category.name,
								value: category.id,
							}))}
						/> */}
            {/* <AboutForm
							initialData={data}
							challengeId={data?.id}
						/> */}
            {/* <ResourceForm
							initialData={data}
							challengeId={data?.id}
						/> */}

            {/*
          
         
          
          <CategoryForm
            initialData={course!}
            courseId={course?.id!}
            options={categories?.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          /> */}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                {/* <h2 className="text-xl">Course chapters</h2> */}
              </div>
              <QuestionOptionForm
                initialData={data}
                quizId={params?.quizId}
                questionId={data?.id}
              />
              {/* <ShortDescriptionForm
								initialData={data}
								challengeId={data?.id}
							/> */}
              {/* <LanguageForm
								initialData={data}
								challengeId={data?.id}
								options={techData?.map((tech: ChallengeTech) => ({
									label: tech.name,
									value: tech.id,
								}))}
							/> */}
              {/* <FigmaForm
								initialData={data}
								challengeId={data?.id}
							/> */}
              {/* <ImageForm
								initialData={data}
								quizId={data?.id}
							/> */}
              {/* <QuestionForm
								initialData={data}
								quizId={data?.id}
							/> */}
              {/* <ChaptersForm initialData={course!} courseId={course?.id!} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizQuestionPage;
