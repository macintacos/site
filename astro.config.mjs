import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-paper.pages.dev/',
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false
			}
		}),
		react(),
		sitemap()
	],
	markdown: {
		remarkPlugins: [
			[remarkToc, { tight: true, heading: 'Outline' }],
			[
				remarkCollapse,
				{
					test: 'Outline'
				}
			]
		],

		shikiConfig: {
			theme: 'dracula',
			wrap: false
		},
		extendDefaultPlugins: true
	}
});
