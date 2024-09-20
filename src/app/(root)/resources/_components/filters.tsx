import { ResourceLanguage, ResourceTag, ResourceType } from "@prisma/client";
import { ResourceTypeItem } from "./resource-type-item";
import { ResourceLanguageItem } from "./resource-language-item";
import { Label } from "@/components/ui/label";

interface FiltersProps {
  resourceTypes: ResourceType[];
  resourceLanguages: ResourceLanguage[];
}
export const Filters = ({ resourceTypes, resourceLanguages }: FiltersProps) => {
  // console.log(resourceTags);
  return (
    <section className="space-y-3">
      <div className="flex gap-2 items-center">
        <Label className="text-primary text-[18px]">
          Select Resource Type:
        </Label>
        {resourceTypes?.map((resourceType) => (
          <ResourceTypeItem key={resourceType.id} {...resourceType} />
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <Label className="text-primary text-[18px]">Select Language:</Label>
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
