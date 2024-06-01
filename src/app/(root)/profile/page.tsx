import ProfileForm from "./_components/profile-form";
import { ProfileImageForm } from "./_components/profile-image-form";
import { SocialForm } from "./_components/social-form";

const ProfilePage = () => {
	return (
		<div className="my-10">
			<h1 className="text-center text-4xl font-poppins font-bold">Your Profile</h1>
			<h4 className="text-center text-sm tracking-wide my-1">
				This information will be displayed publicly
			</h4>
			<div className="w-full space-y-4">
				<ProfileForm />
				<ProfileImageForm />
				<h2 className="text-center text-4xl font-poppins font-bold">
					Social Links
				</h2>
				<SocialForm />
			</div>
		</div>
	);
};

export default ProfilePage;
