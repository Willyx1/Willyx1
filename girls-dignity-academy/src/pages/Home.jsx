import { useEffect } from 'react'
import AOS from 'aos'
import Hero from '../components/Hero'
import NewsCarousel from '../components/NewsCarousel'
import Testimonials from '../components/Testimonials'
import VirtualTour from '../components/VirtualTour'
import { Link } from 'react-router-dom'

export default function Home() {
	useEffect(() => { AOS.init({ once: true, duration: 700, offset: 40 }) }, [])
	return (
		<div>
			<Hero />
			<section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-2 gap-6">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6" data-aos="fade-up">
					<h2 className="section-title mb-3">Welcome to Girl's Dignity Academy</h2>
					<p className="section-sub">A nurturing, girl-centric school offering play-based nursery and strong primary academics with a focus on empowerment, safety, and dignity.</p>
					<div className="mt-4 flex gap-3">
						<Link to="/admissions" className="btn btn-primary">Enroll Now</Link>
						<Link to="/about" className="btn btn-outline">Our Mission</Link>
					</div>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6" data-aos="fade-up" data-aos-delay="100">
					<h3 className="font-head text-2xl mb-2">Quick Links</h3>
					<div className="grid grid-cols-2 gap-3 text-sm">
						<Link to="/parents" className="btn btn-outline">Parent Portal</Link>
						<Link to="/news" className="btn btn-outline">News & Events</Link>
						<Link to="/safety" className="btn btn-outline">Safety & Well-Being</Link>
						<Link to="/multimedia" className="btn btn-outline">Gallery</Link>
					</div>
				</div>
			</section>

			<NewsCarousel />
			<Testimonials />

			<section className="max-w-7xl mx-auto px-4 sm:px-6 py-12" data-aos="fade-up">
				<VirtualTour />
			</section>
		</div>
	)
}