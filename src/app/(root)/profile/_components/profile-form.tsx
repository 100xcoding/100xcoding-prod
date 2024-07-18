"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileFormSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/file-uploader";
import { appendDateToFileName, getImageUrl } from "@/lib/utils";
import { createUploadUrlAction } from "@/actions/file-upload-actions";
import {
  updateProfileImageAction,
  updateProfileResumeAction,
} from "@/actions/update-profile-action";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { SocialModal } from "./social-modal";
import { SocialLinkType } from "@prisma/client";
type UserProfile =
  | {
      id: string;
      userId: string;
      title: string | null;
      bio: string | null;
      website: string | null;
      profileImage: string | null;
      resume: string | null;
      user: { email: string; username: string };
    }
  | null
  | undefined;
type ProfileFormProps = {
  initialData: UserProfile;
  socialLinkTypes: SocialLinkType[] | undefined;
};
const ProfileForm = ({ initialData, socialLinkTypes }: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const toggleEditResume = useCallback(
    () => setIsEditingResume((current) => !current),
    [],
  );
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      email: initialData?.user?.email,
      username: initialData?.user?.username,
      title: initialData?.title || "",
      website: initialData?.website || "",
      bio: initialData?.bio || "",
    },
  });
  const onSubmit = async (data: z.infer<typeof ProfileFormSchema>) => {
    if (data?.profileImage) {
      const profile = data?.profileImage[0];
      const fileNameWithDate = appendDateToFileName(profile.name);
      // console.log(fileNameWithDate);
      const modifiedFile = new File([profile], fileNameWithDate, {
        type: profile.type,
      });
      // console.log(modifiedFile);
      const uploadUrl = await createUploadUrlAction(
        fileNameWithDate,
        profile.type,
      );
      // console.log(uploadUrl)
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: modifiedFile,
      });
      // console.log(response)
      if (response.ok && response.status === 200) {
        // console.log("CLOUD-RES", response);
        // if (fileInputRef.current) {
        //   fileInputRef.current.value = "";
        // }
        const result = await updateProfileImageAction(fileNameWithDate);
        if (result.success) {
          toast.success(result?.message);
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error("Something went wrong, Try again!");
      }
    }
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
          toast.success(result?.message);
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error("Something went wrong, Try again!");
      }
    }
  };
  return (
    <div className="w-full  dark:bg-foreground dark:text-secondary p-10 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="title"
                      className="profile-input "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="title"
                      className="profile-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Profile Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="title"
                      className="profile-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Website / Portfolio URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="website"
                      className="profile-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="profile-input"
                    placeholder="Type your message here."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-10 justify-between w-full ">
            <div className="w-full bg-dark-500 p-4 rounded-md">
              <div className="flex items-center justify-between text-xl">
                Profile Image{" "}
                <Button variant="ghost" onClick={toggleEdit}>
                  {isEditing ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
              {!isEditing && (
                <div className="w-[200px] h-[200px]  mx-auto rounded-full">
                  <Image
                    src={
                      initialData?.profileImage
                        ? getImageUrl(initialData?.profileImage)
                        : "/profle-template.jpeg"
                    }
                    alt="profile-image"
                    width={250}
                    height={250}
                    priority
                    className="rounded-full w-[200px] h-[200px] object-cover"
                  />
                </div>
              )}
              {isEditing && (
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="">
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
              )}
            </div>
            <div className="w-full h-full bg-dark-500 p-4 rounded-md">
              <div className="flex items-center justify-between text-xl">
                Resume{" "}
                <Button variant="ghost" onClick={toggleEditResume}>
                  {isEditingResume ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Resume
                    </>
                  )}
                </Button>
              </div>
              {!isEditingResume && (
                <div className="h-[200px] w-full mx-auto flex items-center justify-center">
                  {initialData?.resume ? (
                    <div className="bg-dark-400 shadow-lg rounded-md mx-2 w-full h-[50%] flex flex-col gap-5 p-2 justify-center">
                      <span className="block">View Resume</span>
                      <Link
                        target="_blank"
                        href={getImageUrl(initialData?.resume)}
                        className=" block underline"
                      >
                        {initialData?.resume}{" "}
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-dark-400 shadow-lg rounded-md mx-2 w-full h-[50%] flex flex-col gap-5 p-2 justify-center">
                      <span className="block capitalize">
                        upload resume now
                      </span>
                    </div>
                  )}
                </div>
              )}
              {isEditingResume && (
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
              )}
            </div>
          </div>
          <div className="flex justify-between w-full gap-10 items-center">
            <div className="w-full">
              {/* <Button className="w-full">Add Social Links</Button> */}
              <SocialModal
                socialLinkTypes={
                  socialLinkTypes?.map((data) => ({
                    label: data?.name,
                    value: data?.id,
                  })) || []
                }
              />
            </div>
            <div className="w-full"></div>
          </div>
          <Button className="w-full" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
