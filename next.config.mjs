import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {
		root: workspaceRoot,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.pravatar.cc',
			},
		],
	},
}

export default nextConfig
