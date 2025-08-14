import { useEffect } from 'react'
import AOS from 'aos'
import Tabs from '../components/Tabs'
import Gallery from '../components/Gallery'

const schedules = [
	{ label: 'Nursery', content: <ul className="list-disc pl-5 space-y-1"><li>8:00 - Arrival & Free Play</li><li>9:00 - Circle Time</li><li>10:00 - Outdoor Play</li><li>12:00 - Lunch & Nap</li></ul> },
	{ label: 'Primary 1-3', content: <ul className="list-disc pl-5 space-y-1"><li>8:00 - Assembly</li><li>8:30 - Literacy</li><li>10:30 - Numeracy</li><li>1:00 - Arts & Clubs</li></ul> },
	{ label: 'Primary 4-6', content: <ul className="list-disc pl-5 space-y-1"><li>8:00 - Assembly</li><li>8:30 - Maths</li><li>10:30 - Science</li><li>1:00 - Leadership & Sports</li></ul> }
]

const gallery = [
	'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1519377345644-937ef9754740?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=800&auto=format&fit=crop',
]

export default function StudentLife() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">Student Life</h1>
			<section className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6" data-aos="fade-up">
				<h2 className="font-head text-2xl mb-2">Daily Schedules</h2>
				<Tabs tabs={schedules} />
			</section>
			<section className="mt-8 grid md:grid-cols-2 gap-6" data-aos="fade-up">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Events & Activities</h2>
					<Gallery images={gallery} />
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Clubs</h2>
					<ul className="list-disc pl-5"><li>STEM Girls</li><li>Arts & Crafts</li><li>Readers Club</li><li>Sports</li></ul>
					<h2 className="font-head text-2xl mt-6 mb-2">Student Achievements</h2>
					<div className="grid grid-cols-2 gap-3">
						<div className="border rounded p-3 text-center">Math Whiz</div>
						<div className="border rounded p-3 text-center">Reading Star</div>
						<div className="border rounded p-3 text-center">Sports Champion</div>
						<div className="border rounded p-3 text-center">Kindness Badge</div>
					</div>
				</div>
			</section>
		</div>
	)
}