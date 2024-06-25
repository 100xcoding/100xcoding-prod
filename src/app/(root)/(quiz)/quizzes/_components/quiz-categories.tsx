import { QuizCategory } from "@prisma/client";
import { QuizCategoryItem } from "./quiz-categories-item";
interface QuizCategoriesProps {
  items: QuizCategory[];
}

export const QuizCategories = ({ items = [] }: QuizCategoriesProps) => {
  return (
    <div className="flex items-center gap-2 flex-wrap overflow-x-auto pb-2">
      {items?.map((item) => (
        <QuizCategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </div>
  );
};
