export type CustomSession = {
	user?: CustomUser;
	expires: Date;
};
export type CustomUser = {
	id: string;
	name?: string | null;
	email: string;
	role?: string | null;
	image?: string | null;
	username: string;
	emailVerified?: Date | null;
};
