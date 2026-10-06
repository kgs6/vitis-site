import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  redirects: async () => [{ source: "/", destination: "/uk", permanent: false }],
};

export default nextConfig;
