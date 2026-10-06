import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  redirects: async () => [{ source: "/", destination: "/ru", permanent: false }],
};

export default nextConfig;
