"use client";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface QuizCategoryItemProps {
  label: string;
  value?: string;
}
export const QuizCategoryItem = ({ label, value }: QuizCategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCategoryId === value;
  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm tracking-wider  border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-primary transition",
        isSelected && "bg-green-500  text-white border-none",
      )}
      type="button"
    >
      {/* {Icon && <Icon size={20} />} */}
      <div className="truncate">{label}</div>
    </button>
  );
};
