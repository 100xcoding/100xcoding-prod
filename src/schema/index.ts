import { z } from "zod";
const githubProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;
const twitterProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?x\.com\/[A-Za-z0-9_]{1,15}\/?$/;
const instagramProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]{1,30}\/?$/;
const youtubeProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?youtube\.com\/(user\/[A-Za-z0-9_-]+|channel\/[A-Za-z0-9_-]+|c\/[A-Za-z0-9_-]+)\/?$/;
const mediumProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?medium\.com\/(@?[A-Za-z0-9_-]+)\/?$/;
const threadsProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?threads\.net\/@?[A-Za-z0-9._]+\/?$/;
const leetCodeProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?leetcode\.com\/[A-Za-z0-9_-]+\/?$/;
const gfgProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?auth\.geeksforgeeks\.org\/user\/[A-Za-z0-9_-]+\/?$/;
const codechefProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?codechef\.com\/users\/[A-Za-z0-9_-]+\/?$/;
const codeforcesProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?codeforces\.com\/profile\/[A-Za-z0-9_-]+\/?$/;
const linkedInProfileUrlRegex =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+\/?$/;
export const ProfileFormSchema = z.object({
  name: z.string(),
  title: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
  email: z.string().email(),
  username: z.string().toLowerCase(),
  profileImage: z.custom<File[]>().optional(),
  resume: z.custom<File[]>().optional(),
});
export const SocialLinkModalSchema = z.object({
  socialLinkId: z.string({
    required_error: "Please select a type.",
  }),
  socialLink: z.string().url({
    message: "Enter a valid url",
  }),
});
export const SocialLinkFormSchema = z.object({
  github: z
    .string()
    .regex(githubProfileUrlRegex, {
      message: "Invalid GitHub profile URL",
    })
    .optional(),
  twitter: z
    .string()
    .regex(twitterProfileUrlRegex, {
      message: "Invalid X profile URL",
    })
    .optional(),
  instagram: z
    .string()
    .regex(instagramProfileUrlRegex, {
      message: "Invalid instagram profile URL",
    })
    .optional(),
  youtube: z
    .string()
    .regex(youtubeProfileUrlRegex, {
      message: "Invalid youtube profile URL",
    })
    .optional(),
  medium: z
    .string()
    .regex(mediumProfileUrlRegex, {
      message: "Invalid medium profile URL",
    })
    .optional(),
  threads: z
    .string()
    .regex(threadsProfileUrlRegex, {
      message: "Invalid threads profile URL",
    })
    .optional(),
  leetcode: z
    .string()
    .regex(leetCodeProfileUrlRegex, {
      message: "Invalid Leet code profile URL",
    })
    .optional(),
  gfg: z
    .string()
    .regex(gfgProfileUrlRegex, {
      message: "Invalid GeeksforGeeks profile URL",
    })
    .optional(),
  codechef: z
    .string()
    .regex(codechefProfileUrlRegex, {
      message: "Invalid code chef profile URL",
    })
    .optional(),
  codeforces: z
    .string()
    .regex(codeforcesProfileUrlRegex, {
      message: "Invalid code forces profile URL",
    })
    .optional(),
  linkedIn: z
    .string()
    .regex(linkedInProfileUrlRegex, {
      message: "Invalid Linkedin profile URL",
    })
    .optional(),
});
export const resourceInputFormSchema = z.object({
  url: z.string().url({
    message: "Invalid URL ",
  }),
});
const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});
export const resourceDataFormSchema = z.object({
  title: z.string().min(10, {
    message: "Invalid Title",
  }),
  description: z.string().min(10, {
    message: "Invalid Description",
  }),
  imageUrl: z.string().url({
    message: "Invalid URL ",
  }),
  resourceType: z.string(),
  // resourceTags: z.array(z.string().min(1)).min(1),
  resourceTags: z.array(optionSchema).min(1),
  url: z.string().url({
    message: "Invalid URL ",
  }),
});
