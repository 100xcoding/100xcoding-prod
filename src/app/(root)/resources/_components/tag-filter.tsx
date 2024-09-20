"use client";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { ResourceTag } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
interface FiltersProps {
  resourceTags: ResourceTag[];
}
export const TagFilter = ({ resourceTags }: FiltersProps) => {
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("currentType");
  const currentLanguage = searchParams.get("language");
  useEffect(() => {
    const currentTag = searchParams.get("tag");
    const tagArray = currentTag ? currentTag.split(",") : [];
    const initialTags = resourceTags
      .filter((tag) => tagArray.includes(tag.name))
      .map((tag) => ({ label: tag.name, value: tag.id }));
    setSelectedTags(initialTags);
  }, [searchParams, resourceTags]);
  const OPTIONS: Option[] = resourceTags.map((resourceTag) => ({
    label: resourceTag.name,
    value: resourceTag.id,
  }));
  const handleTagChange = (newTags: Option[]) => {
    setSelectedTags(newTags);

    // Get selected tag IDs and update the query params
    const tagIds = newTags.map((tag) => tag.label);
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          tag: tagIds.length > 0 ? tagIds.join(",") : null,
          currentType: currentType,
          language: currentLanguage,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };
  return (
    <section>
      <div className="flex items-center gap-1">
        <MultipleSelector
          value={selectedTags}
          onChange={handleTagChange}
          defaultOptions={OPTIONS}
          placeholder="Select Tags"
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 bg-dark-500 dark:text-gray-400">
              All tags selected.
            </p>
          }
        />
      </div>
    </section>
  );
};
