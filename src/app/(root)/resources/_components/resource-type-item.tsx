"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import qs from "query-string";
type ResourceTypeItemProps = {
  id: string;
  name: string;
};
export const ResourceTypeItem = ({ id, name }: ResourceTypeItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("currentType");
  const currentTag = searchParams.get("tag");
  const currentLanguage = searchParams.get("language");
  const isSelected = currentType === id;
  const onClick = () => {
    // console.log("Clicked");
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          tag: currentTag,
          currentType: isSelected ? null : id,
          language: currentLanguage,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border text-white border-slate-200 rounded-full flex items-center gap-x-1 hover:border-primary transition",
        isSelected && "border-primary bg-primary/10 text-primary",
      )}
      type="button"
    >
      <div className="truncate">{name}</div>
    </button>
  );
};
