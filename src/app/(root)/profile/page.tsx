import { auth } from "@/auth";
import ProfileForm from "./_components/profile-form";
import { redirect } from "next/navigation";
import { getProfile, getSocialTypes } from "./_data-access";

const ProfilePage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login?msg='Login First!'");
  }
  const { profile } = await getProfile();
  const { socialLinkTypes } = await getSocialTypes();
  // console.log(profile);
  return (
    <div className="my-10 text-white">
      <h1 className="text-center text-4xl  font-bold">Your Profile</h1>
      <h4 className="text-center text-sm tracking-wide my-1">
        This information will be displayed publicly
      </h4>
      <div className="w-full space-y-4">
        <ProfileForm initialData={profile} socialLinkTypes={socialLinkTypes} />

        {/* <ProfileImageForm /> */}
        {/* <h2 className="text-center text-4xl font-poppins font-bold">
          Social Links
        </h2> */}
        {/* <SocialForm /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
