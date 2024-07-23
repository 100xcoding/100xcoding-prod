import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditProfileForm } from "./edit-profile-form";
import { getProfile } from "../_data-access";
import { EditProfilePhoto } from "./edit-profile-photo";
import { MdEdit } from "react-icons/md";
export const EditProfileModal = async () => {
  const { user } = await getProfile();
  // console.log(user);
  if (!user) {
    return;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="edit profile"
          variant="outline"
          className="text-green-500 lg:flex lg:items-center lg:gap-2 border-green-500 rounded-full"
        >
          <MdEdit size={22} />
          <span className="hidden lg:block">Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] remove-scrollbar overflow-y-scroll max-h-screen bg-dark-200 text-white border-none">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription className="text-dark-700">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditProfilePhoto initialData={user?.profile?.profileImage} />
        <EditProfileForm initialData={JSON.parse(JSON.stringify(user))} />
      </DialogContent>
    </Dialog>
  );
};
