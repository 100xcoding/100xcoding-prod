/** @type {import('next').NextConfig} */
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
		],
	},
	reactStrictMode:false
};

export default nextConfig;
