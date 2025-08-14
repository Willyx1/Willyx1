import { useEffect } from 'react'
import AOS from 'aos'
import PortalLogin from '../components/PortalLogin'
import Accordion from '../components/Accordion'

const faqItems = [
	{ title: 'What is the school uniform?', content: 'Maroon polo with school logo and navy skirt or trousers.' },
	{ title: 'Attendance policy?', content: 'Punctuality and attendance are expected; notify the office for absences.' },
	{ title: 'Menstrual dignity support?', content: 'We provide pads, private facilities, and supportive guidance.' },
]

export default function Parents() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">Parent Resources</h1>
			<section className="grid lg:grid-cols-2 gap-6" data-aos="fade-up">
				<PortalLogin />
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-4">
					<h3 className="font-head text-2xl mb-2">School Calendar</h3>
					<div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-500">Google Calendar Embed (placeholder)</div>
				</div>
			</section>
			<section className="mt-8 grid lg:grid-cols-2 gap-6" data-aos="fade-up">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-4">
					<h3 className="font-head text-2xl mb-2">Newsletters</h3>
					<ul className="list-disc pl-5">
						<li><a href="/newsletter-sept.pdf" download className="text-brand-blue hover:underline">September Newsletter</a></li>
						<li><a href="/newsletter-aug.pdf" download className="text-brand-blue hover:underline">August Newsletter</a></li>
					</ul>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-4">
					<h3 className="font-head text-2xl mb-2">Policies</h3>
					<ul className="list-disc pl-5">
						<li><a href="#" className="text-brand-blue hover:underline">Uniform Policy</a></li>
						<li><a href="#" className="text-brand-blue hover:underline">Safety Policy</a></li>
						<li><a href="#" className="text-brand-blue hover:underline">Attendance Policy</a></li>
						<li><a href="#" className="text-brand-blue hover:underline">Menstrual Dignity Policy</a></li>
					</ul>
				</div>
			</section>
			<section className="mt-8" data-aos="fade-up">
				<h3 className="font-head text-2xl mb-3">FAQs</h3>
				<Accordion items={faqItems} />
			</section>
		</div>
	)
}