/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // Domain of the images to allow
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Domain of the images to allow
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;


