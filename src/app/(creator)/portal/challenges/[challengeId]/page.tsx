"use client";

import { IconBadge } from "@/components/icon-badge";
import {
  useChallengeCategories,
  useChallengeTech,
  useCreatorChallengeById,
} from "@/services/queries";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { CategoryForm } from "./_components/category-from";
import { ChallengeCategory, ChallengeTech } from "@prisma/client";
import { ShortDescriptionForm } from "./_components/short-description-form";
import { AboutForm } from "./_components/about-form";
import { LanguageForm } from "./_components/language-form";
import { FigmaForm } from "./_components/figma-form";
import { ImageForm } from "./_components/image-form";
import { ResourceForm } from "./_components/resource-form";
import { Actions } from "./_components/actions";
import { AuthorForm } from "./_components/author-form";

const CreatorChallengePage = ({
  params,
}: {
  params: { challengeId: string };
}) => {
  const { data } = useCreatorChallengeById(params?.challengeId);
  const { data: categoryData } = useChallengeCategories();
  const { data: techData } = useChallengeTech();
  // console.log(categoryData);
  return (
    <>
      {/* {!course?.isPublished && (
      <Banner label="This course is unpublished. It will not be visible to the students." />
    )} */}

      <div className="p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              {/* Complete all fields {completionText} */}
              Complete all fields
            </span>
          </div>
          <Actions
            // disabled={!isComplete}
            challengeId={params.challengeId}
            isPublished={data?.isPublished!}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your challenge</h2>
            </div>
            <TitleForm initialData={data} challengeId={data?.id} />
            <CategoryForm
              initialData={data}
              challengeId={data?.id}
              options={categoryData?.map((category: ChallengeCategory) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <AboutForm initialData={data} challengeId={data?.id} />
            <ResourceForm initialData={data} challengeId={data?.id} />

            {/*
          
          <DescriptionForm initialData={course!} courseId={course?.id!} />
          
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

              <ShortDescriptionForm initialData={data} challengeId={data?.id} />
              <AuthorForm initialData={data} challengeId={data?.id} />
              <LanguageForm
                initialData={data}
                challengeId={data?.id}
                options={techData?.map((tech: ChallengeTech) => ({
                  label: tech.name,
                  value: tech.id,
                }))}
              />
              <FigmaForm initialData={data} challengeId={data?.id} />
              <ImageForm initialData={data} challengeId={data?.id} />
              {/* <ChaptersForm initialData={course!} courseId={course?.id!} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorChallengePage;
