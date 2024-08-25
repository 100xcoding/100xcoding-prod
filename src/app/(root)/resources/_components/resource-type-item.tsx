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
  const currentCategoryId = searchParams.get("type");
  // const currentTitle = searchParams.get("tag");
  const isSelected = currentCategoryId === id;
  return <div>ResourceTypeItem</div>;
};
