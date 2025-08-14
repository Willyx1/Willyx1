import { useEffect } from 'react'
import AOS from 'aos'
import InquiryForm from '../components/InquiryForm'
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6'

export default function Contact() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">Contact Us</h1>
			<section className="grid md:grid-cols-2 gap-6" data-aos="fade-up">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Get in Touch</h2>
					<p className="text-gray-700 dark:text-gray-300">Phone: +234-000-0000</p>
					<p className="text-gray-700 dark:text-gray-300">Email: hello@girlsdignity.academy</p>
					<p className="text-gray-700 dark:text-gray-300">Address: 123 Dignity Street, Abuja</p>
					<div className="aspect-video mt-3 rounded overflow-hidden">
						<iframe title="Map" className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3972.858!2d7.495!3d9.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v168649"></iframe>
					</div>
					<div className="flex gap-3 text-2xl mt-3">
						<a href="#" aria-label="Facebook" className="text-brand-blue"><FaFacebook /></a>
						<a href="#" aria-label="Instagram" className="text-brand-pink"><FaInstagram /></a>
						<a href="#" aria-label="X" className="text-gray-700 dark:text-gray-200"><FaXTwitter /></a>
					</div>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Send an Inquiry</h2>
					<InquiryForm />
				</div>
			</section>
			<div className="mt-6 text-sm text-gray-500">Office Hours: Mon–Fri 8:00–4:00, Sat 9:00–12:00</div>
		</div>
	)
}