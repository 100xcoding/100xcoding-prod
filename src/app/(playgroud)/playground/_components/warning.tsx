"use client";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRedirectAfterDelay from "@/hooks/use-redirect-after-delay";
export const Warning = ({
  status,
  slug,
}: {
  status: boolean;
  slug: string;
}) => {
  useRedirectAfterDelay(`/solution-playground/${slug}`, 3000);
  return (
    <Alert className="bg-green-600 text-green-500 border-none">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Woooh!</AlertTitle>
      <AlertDescription>
        You aready completed this challenge. You are redirecting to the solution
        page
      </AlertDescription>
    </Alert>
  );
};
