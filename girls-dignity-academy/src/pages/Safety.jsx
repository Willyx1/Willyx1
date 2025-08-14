import { useEffect } from 'react'
import AOS from 'aos'
import { FaShieldAlt, FaHandHoldingHeart, FaFirstAid } from 'react-icons/fa'

export default function Safety() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">Safety & Well-Being</h1>
			<section className="grid md:grid-cols-3 gap-6" data-aos="fade-up">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<div className="text-3xl text-brand-green mb-2"><FaShieldAlt /></div>
					<h2 className="font-head text-2xl mb-2">Safety Policies</h2>
					<ul className="list-disc pl-5">
						<li>Secure perimeter and supervised play areas</li>
						<li>Visitor check-in and ID verification</li>
						<li>Child protection policy and reporting</li>
					</ul>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<div className="text-3xl text-brand-orange mb-2"><FaFirstAid /></div>
					<h2 className="font-head text-2xl mb-2">Health Services</h2>
					<ul className="list-disc pl-5">
						<li>First-aid trained staff and nurse on call</li>
						<li>Clean water and sanitation facilities</li>
						<li>Health screenings and referrals</li>
					</ul>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<div className="text-3xl text-brand-pink mb-2"><FaHandHoldingHeart /></div>
					<h2 className="font-head text-2xl mb-2">Dignity & Anti-Bullying</h2>
					<ul className="list-disc pl-5">
						<li>Menstrual dignity education and supplies</li>
						<li>No-bullying culture with restorative practices</li>
						<li>Safe reporting and supportive counseling</li>
						<li>Girls leadership circles and peer mentors</li>
					</ul>
				</div>
			</section>
		</div>
	)
}