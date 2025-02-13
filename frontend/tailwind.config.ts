/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
		'./node_modules/primereact/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				v1: {
					primary: {
						50: '#effefa',
						100: '#c8fff2',
						200: '#90ffe5',
						300: '#51f7d6',
						400: '#1de4c3',
						500: '#05c7aa',
						600: '#00a18c',
						700: '#058071',
						800: '#0a655b',
						900: '#0e534c',
						950: '#00403c' // main
					},
					secondary: {
						50: '#fdffe4',
						100: '#faffc4',
						200: '#f3ff90',
						300: '#e6ff50',
						400: '#d2ff00', // main
						500: '#b7e600',
						600: '#8eb800',
						700: '#6b8b00',
						800: '#556d07',
						900: '#475c0b',
						950: '#253400'
					},
					tertiary: {
						50: '#f3f8f7',
						75: '#EFF2F6',
						100: '#e1eceb',
						200: '#b3cfcd',
						300: '#9ec2c0',
						400: '#6fa19f',
						500: '#548684',
						600: '#487172',
						700: '#3f5e5f',
						800: '#394f51',
						900: '#334446',
						950: '#1f2b2d'
					},
					neutral: {
						0: '#ffffff',
						50: '#f6f6f6',
						100: '#e7e7e7',
						200: '#d1d1d1',
						300: '#b0b0b0',
						400: '#888888',
						500: '#6d6d6d',
						600: '#5d5d5d',
						700: '#4f4f4f',
						800: '#454545',
						900: '#3d3d3d',
						950: '#000000'
					},
					success: {
						100: '#F1FFF4',
						400: '#41CD84', // Main
						600: '#5D836F'
					},
					warn: {
						100: '#FFF6E9',
						400: '#FF9A07', // Main
						600: '#92611B'
					},
					error: {
						100: '#FFF0F0',
						300: '#FFACAC',
						400: '#FF5959', // Main
						600: '#943F3F'
					},
					info: {
						100: '#F2FAFF',
						400: '#37A6F3', // Main
						600: '#257EBB'
					},
					background: '#F7F8F8'
				}
			}
		}
	},
	plugins: []
};
