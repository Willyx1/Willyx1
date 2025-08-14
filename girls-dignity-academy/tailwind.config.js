/** Tailwind CSS configuration for Girl's Dignity Academy */
/** Sitemap (for quick reference):
- Pages: Home, About, Academics, Admissions, Parent Resources, Student Life, Contact, News & Events, Safety & Well-Being, Multimedia
- Components: Navbar, Footer, Hero, NewsCarousel, Testimonials, Accordion, Tabs, Gallery, ScrollToTopButton, LoadingSpinner, EventCalendar, PortalLogin, Quiz, VirtualTour
*/

export default {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: {
					red: '#E60026', // G
					pink: '#EC008C', // figure
					green: '#00A651',
					orange: '#F58220',
					blue: '#0072BB',
					maroon: '#702E5F'
				}
			},
			fontFamily: {
				sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
				head: ['Fredoka', 'Nunito', 'ui-sans-serif'],
				kids: ['"Comic Neue"', 'Nunito', 'ui-sans-serif']
			},
			boxShadow: {
				soft: '0 10px 30px rgba(0,0,0,0.07)'
			},
			animation: {
				'bounce-slow': 'bounce 2.2s infinite'
			}
		}
	}
};