import { Challenge } from '@prisma/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { ChallengeShortDescriptionSchema } from '@/schema/challenge-schema';
import { ProfileFormSchema } from '@/schema';
import { Pencil } from 'lucide-react';
import { updateChallengeDescriptionAction } from '../../_actions';
import { toast } from 'sonner';
import { useCreatorChallengeById } from '@/services/queries';
interface ShortDescriptionFormProps {
  initialData: Challenge;
  challengeId: string;
}
export const ShortDescriptionForm = ({ initialData, challengeId }: ShortDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { refreshCreatorChallengeData } = useCreatorChallengeById(challengeId);

  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const form = useForm<z.infer<typeof ChallengeShortDescriptionSchema>>({
    resolver: zodResolver(ChallengeShortDescriptionSchema),
    defaultValues: useMemo(() => ({
      description: initialData?.description || ""
    }), [initialData])
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(async (values: z.infer<typeof ChallengeShortDescriptionSchema>) => {
    const response = await updateChallengeDescriptionAction(values, challengeId);
    if (response?.success) {
      setIsEditing(false);
      refreshCreatorChallengeData();
      toast.success(response.message);
    } else {
      toast.error(response?.message);
    }
  }, [challengeId, refreshCreatorChallengeData]);
  return (
    <div className="mt-6  dark:bg-muted rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Challenge description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData?.description && "text-slate-500 italic"
        )}>
          {initialData?.description || "No description"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This challenge is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant={"default"}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
