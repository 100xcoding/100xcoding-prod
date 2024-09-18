import { ResourceLanguage, ResourceTag, ResourceType } from "@prisma/client";
import { ResourceTypeItem } from "./resource-type-item";
import { ResourceTagItem } from "./resource-tag-item";
import { ResourceLanguageItem } from "./resource-language-item";

interface FiltersProps {
  resourceTypes: ResourceType[];
  resourceTags: ResourceTag[];
  resourceLanguages: ResourceLanguage[];
}
export const Filters = ({
  resourceTypes,
  resourceTags,
  resourceLanguages,
}: FiltersProps) => {
  // console.log(resourceTags);
  return (
    <section className="space-y-3">
      <div className="flex gap-2 items-center">
        {resourceTypes?.map((resourceType) => (
          <ResourceTypeItem key={resourceType.id} {...resourceType} />
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {resourceTags?.map((resourceTag) => (
          <ResourceTagItem key={resourceTag.id} {...resourceTag} />
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {resourceLanguages?.map((resourceLanguage) => (
          <ResourceLanguageItem
            key={resourceLanguage.id}
            {...resourceLanguage}
          />
        ))}
      </div>
    </section>
  );
};
