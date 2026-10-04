import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://sexisalvpzgjpbjqyuah.supabase.co/storage/v1/object/public/**')],
    maximumDiskCacheSize: 0,
  },
};

export default nextConfig;
