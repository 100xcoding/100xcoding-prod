import { ResourceType } from "@prisma/client";
import { ResourceTypeItem } from "./resource-type-item";

interface FiltersProps {
  resourceTypes: ResourceType[];
}
export const Filters = ({ resourceTypes }: FiltersProps) => {
  return (
    <section>
      {resourceTypes?.map((resourceType) => (
        <ResourceTypeItem key={resourceType.id} {...resourceType} />
      ))}
    </section>
  );
};
