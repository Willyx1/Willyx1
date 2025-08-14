import { useEffect } from 'react'
import AOS from 'aos'
import Gallery from '../components/Gallery'

const staff = [
	{ name: 'Mrs. Adaeze Okafor', role: 'Head Teacher', img: 'https://images.unsplash.com/photo-1544006659-56e8f1a7eb9e?q=80&w=400&auto=format&fit=crop' },
	{ name: 'Ms. Zainab Bello', role: 'Nursery Lead', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
	{ name: 'Mrs. Maryam Yusuf', role: 'Primary Teacher', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop' },
]

const facilityImages = [
	'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1537202108838-e7072bad1927?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop'
]

export default function About() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">About Us</h1>
			<div className="grid md:grid-cols-2 gap-6" data-aos="fade-up">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Our Mission</h2>
					<p>To empower girls in low-income communities with a safe, joyful, and high-quality education that fosters dignity, leadership, voice, and lifelong learning.</p>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Our Vision</h2>
					<p>Every girl confident, capable, and dignified—thriving at school and beyond.</p>
				</div>
			</div>

			<section className="mt-10" data-aos="fade-up">
				<h2 className="font-head text-2xl mb-3">Our Story</h2>
				<div className="relative border-l-2 border-brand-pink pl-6 space-y-6">
					{/* timeline items with subtle slide-up animations */}
					<div data-aos="fade-up">
						<div className="text-xs text-gray-500">2016</div>
						<div className="font-semibold">Founded</div>
						<p>Opened with a small nursery class and a big dream for girls in our community.</p>
					</div>
					<div data-aos="fade-up">
						<div className="text-xs text-gray-500">2019</div>
						<div className="font-semibold">Primary Expansion</div>
						<p>Launched primary grades with a strong literacy and numeracy focus.</p>
					</div>
					<div data-aos="fade-up">
						<div className="text-xs text-gray-500">2023</div>
						<div className="font-semibold">Dignity Program</div>
						<p>Introduced menstrual health, self-esteem, and leadership workshops.</p>
					</div>
				</div>
			</section>

			<section className="mt-10" data-aos="fade-up">
				<h2 className="font-head text-2xl mb-4">Leadership & Staff</h2>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
					{staff.map((m, idx) => (
						<div key={idx} className="bg-white dark:bg-gray-900 rounded-xl shadow-soft overflow-hidden">
							<img src={m.img} alt="" className="h-48 w-full object-cover" loading="lazy" />
							<div className="p-4">
								<div className="font-semibold">{m.name}</div>
								<div className="text-sm text-gray-500">{m.role}</div>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="mt-10" data-aos="fade-up">
				<h2 className="font-head text-2xl mb-3">Facilities</h2>
				<Gallery images={facilityImages} />
			</section>

			<section className="mt-10" data-aos="fade-up">
				<h2 className="font-head text-2xl mb-3">Accreditations</h2>
				<ul className="list-disc pl-5">
					<li>Registered with State Ministry of Education</li>
					<li>Member, National Association for Girls Education</li>
				</ul>
			</section>
		</div>
	)
}