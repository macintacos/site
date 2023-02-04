import type { SocialObjects } from './types';

export const SITE = {
	website: 'https://excessive.dev/',
	author: 'Julian Torres',
	desc: 'Excessive Development',
	title: 'excessive.dev',
	ogImage: '',
	lightAndDarkMode: true,
	postPerPage: 6
};

export const LOGO_IMAGE = {
	enable: false,
	svg: true,
	width: 216,
	height: 46
};

export const SOCIALS: SocialObjects = [
	{
		name: 'Mail',
		href: 'mailto:julian.m.tor@gmail.com',
		linkTitle: `Send an email to ${SITE.title}`,
		active: true
	},
	{
		name: 'Mastodon',
		href: 'https://mastodon.social/@macintacos',
		linkTitle: `${SITE.title} on Mastodon`,
		active: true
	},
	{
		name: 'Github',
		href: 'https://github.com/macintacos',
		linkTitle: ` ${SITE.title} on Github`,
		active: true
	}
];
