// /** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "pub-3b8fd115d3b343d4974ca64f702b8276.r2.dev",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.100xcoding.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "miro.medium.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	experimental:{
		serverComponentsExternalPackages: [
            '@react-email/components',
            '@react-email/render',
            '@react-email/tailwind'
        ]
	},
	reactStrictMode:false,
	compress: true,
	
};

export default nextConfig;
// next.config.js
// next.config.mjs
