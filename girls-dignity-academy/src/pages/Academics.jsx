import { useEffect } from 'react'
import AOS from 'aos'
import Tabs from '../components/Tabs'
import Accordion from '../components/Accordion'

const nurseryContent = (
	<div className="space-y-2">
		<p>Play-based learning that nurtures curiosity, language, and social skills.</p>
		<ul className="list-disc pl-5"><li>Storytelling & Phonics</li><li>Number Sense</li><li>Creative Arts & Music</li><li>Outdoor Play</li></ul>
	</div>
)
const primaryContent = (
	<div className="space-y-2">
		<p>Structured academics with strong literacy, numeracy, and empowerment themes.</p>
		<ul className="list-disc pl-5"><li>English Language & Reading</li><li>Mathematics</li><li>Science & Social Studies</li><li>Digital & Life Skills</li></ul>
	</div>
)

const activities = [
	{ title: 'Sports & Games', content: 'Football, athletics, and fun aerobics.' },
	{ title: 'Arts & Music', content: 'Drawing, crafts, drumming, and choir.' },
	{ title: 'Dignity Workshops', content: 'Menstrual health, self-esteem, and leadership.' },
]

export default function Academics() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">Academics</h1>
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6" data-aos="fade-up">
				<Tabs tabs={[{ label: 'Nursery', content: nurseryContent }, { label: 'Primary', content: primaryContent }]} />
			</div>
			<section className="mt-8 grid md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="100">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Teaching Approaches</h2>
					<p>We blend play, inquiry, and mastery-based instruction, with trauma-sensitive practices to support every girl.</p>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Assessment</h2>
					<p>Ongoing formative checks, projects, and termly exams. We celebrate growth and effort with dignity.</p>
				</div>
			</section>
			<section className="mt-8" data-aos="fade-up">
				<h2 className="font-head text-2xl mb-3">Extracurricular Activities</h2>
				<Accordion items={activities} />
			</section>
		</div>
	)
}