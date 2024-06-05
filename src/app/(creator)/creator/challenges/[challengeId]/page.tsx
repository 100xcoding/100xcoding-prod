"use client";

import { IconBadge } from "@/components/icon-badge";
import { useChallengeCategories, useCreatorChallengeById } from "@/services/queries";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { CategoryForm } from "./_components/category-from";
import { ChallengeCategory } from "@prisma/client";

const CreatorChallengePage = ({ params }: { params: { challengeId: string } }) => {
  const {data} = useCreatorChallengeById(params?.challengeId);
  const {data:categoryData} = useChallengeCategories();
  console.log(categoryData);
  return (
    <>
    {/* {!course?.isPublished && (
      <Banner label="This course is unpublished. It will not be visible to the students." />
    )} */}

    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
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
            <h2 className="text-xl">Customize your challenge</h2>
          </div>
          <TitleForm initialData={data} challengeId={data?.id} />
          <CategoryForm
            initialData={categoryData}
            challengeId={data?.id}
            options={categoryData?.map((category:ChallengeCategory) => ({
              label: category.name,
              value: category.id,
            }))}
            />
          {/*
          <ShortDescriptionForm initialData={course!} courseId={course?.id!} />
          <DescriptionForm initialData={course!} courseId={course?.id!} />
          <ImageForm initialData={course!} courseId={course?.id!} />
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
              <h2 className="text-xl">Course chapters</h2>
            </div>
            {/* <ChaptersForm initialData={course!} courseId={course?.id!} /> */}
          </div>
          {/* <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={IndianRupee} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm initialData={course!} courseId={course?.id!} />
          </div> */}
        </div>
      </div>
    </div>
  </>
  )
}

export default CreatorChallengePage