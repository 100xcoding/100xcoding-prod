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
import Image from "next/image";
import { appendDateToFileName, getImageUrl } from "@/lib/utils";
import { createUploadUrlAction } from "@/actions/file-upload-actions";
import { updateProfileImageAction } from "@/actions/update-profile-action";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@/components/ui/dialog";

const FormSchema = z.object({
  profileImage: z.custom<File[]>().optional(),
});
interface EditProfilePhotoProps {
  initialData: string | null | undefined;
}
export const EditProfilePhoto = ({ initialData }: EditProfilePhotoProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    if (data?.profileImage) {
      const profile = data?.profileImage[0];
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
        // console.log(response);
        const result = await updateProfileImageAction(fileNameWithDate);
        if (result.success) {
          toast.success(result?.message);
          router.refresh();
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
      <Label>Public profile photo</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex items-center gap-4 w-full">
            {initialData && (
              <div>
                <Image
                  src={getImageUrl(initialData)}
                  alt="profile"
                  width={150}
                  height={150}
                  className="rounded-full aspect-square"
                />
              </div>
            )}
            <div className="w-full">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem className="">
                    {/* <FormLabel>Public profile photo</FormLabel> */}
                    <FormControl>
                      <FileUploader
                        accept={{ "image/*": [] }}
                        maxSize={1024 * 1000}
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
          <DialogTrigger asChild className=" flex mt-2 justify-center">
            <Button type="submit">Upload Image</Button>
          </DialogTrigger>
        </form>
      </Form>
    </div>
  );
};
