import { ResourceTag, ResourceType } from "@prisma/client";
import { ResourceTypeItem } from "./resource-type-item";
import { ResourceTagItem } from "./resource-tag-item";

interface FiltersProps {
  resourceTypes: ResourceType[];
  resourceTags: ResourceTag[];
}
export const Filters = ({ resourceTypes, resourceTags }: FiltersProps) => {
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
    </section>
  );
};
