import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProfile } from "../_data-access";
import { EditResume } from "./edit-resume";
export const EditResumeModal = async () => {
  const { user } = await getProfile();
  // console.log(user);
  if (!user) {
    return;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="edit resume"
          variant="outline"
          className="text-green-500  border-green-500 rounded-full"
        >
          Edit Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] remove-scrollbar overflow-y-scroll max-h-screen bg-dark-200 text-white border-none">
        <DialogHeader>
          <DialogTitle>Edit Resume</DialogTitle>
          <DialogDescription className="text-dark-700">
            Make changes to your resume here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditResume initialData={user?.profile?.resume} />
      </DialogContent>
    </Dialog>
  );
};
