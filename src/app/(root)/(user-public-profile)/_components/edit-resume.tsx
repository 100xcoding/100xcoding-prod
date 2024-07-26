"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { FileUploader } from "@/components/file-uploader";
import { appendDateToFileName, getImageUrl } from "@/lib/utils";
import { createUploadUrlAction } from "@/actions/file-upload-actions";
import { updateProfileResumeAction } from "@/actions/update-profile-action";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { DialogTrigger } from "@/components/ui/dialog";

const FormSchema = z.object({
  resume: z.custom<File[]>().optional(),
});
interface EditResumeProps {
  initialData: string | null | undefined;
}
export const EditResume = ({ initialData }: EditResumeProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    if (data?.resume) {
      const profile = data?.resume[0];
      const fileNameWithDate = appendDateToFileName(profile.name);
      const modifiedFile = new File([profile], fileNameWithDate, {
        type: profile.type,
      });
      const uploadUrl = await createUploadUrlAction(
        fileNameWithDate,
        profile.type,
      );
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: modifiedFile,
      });
      if (response.ok && response.status === 200) {
        const result = await updateProfileResumeAction(fileNameWithDate);
        if (result.success) {
          router.refresh();
          toast.success(result?.message);
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error("Something went wrong, Try again!");
      }
    }
  }
  return (
    <div>
      <Label>Resume</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col-reverse items-center gap-1 w-full">
            {initialData && (
              <div className="bg-dark-400 w-full flex items-center justify-center py-5 rounded-lg">
                <Link
                  aria-label="resume"
                  href={getImageUrl(initialData!)}
                  className="underline text-green-500"
                >
                  {initialData}
                </Link>
              </div>
            )}
            <div className="w-full">
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem className="py-10">
                    <FormControl>
                      <FileUploader
                        accept={{ "application/pdf": [] }}
                        maxSize={1024 * 2000}
                        files={field?.value}
                        onChange={field?.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogTrigger asChild>
            <Button type="submit" className="w-full mt-4" aria-label="upload">
              Upload
            </Button>
          </DialogTrigger>
        </form>
      </Form>
    </div>
  );
};
