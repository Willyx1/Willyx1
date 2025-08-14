import { useEffect } from 'react'
import AOS from 'aos'
import ApplyForm from '../components/ApplyForm'

export default function Admissions() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">Admissions</h1>
			<section className="grid lg:grid-cols-2 gap-6" data-aos="fade-up">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">How to Apply</h2>
					<ol className="list-decimal pl-5 space-y-1 text-gray-700 dark:text-gray-300">
						<li>Review requirements and fee schedule.</li>
						<li>Book a virtual or in-person tour.</li>
						<li>Complete the online application form.</li>
						<li>Receive confirmation and next steps.</li>
					</ol>
					<div className="mt-4">
						<a className="btn btn-outline" href="/fees.pdf" download>Download Fee Schedule (PDF)</a>
					</div>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
					<h2 className="font-head text-2xl mb-2">Schedule a Tour</h2>
					<form onSubmit={(e) => { e.preventDefault(); alert('Tour scheduled! (Demo)') }} className="grid grid-cols-1 gap-3">
						<input required className="border rounded px-3 py-2" placeholder="Parent Name" />
						<input required className="border rounded px-3 py-2" placeholder="Email" type="email" />
						<input required className="border rounded px-3 py-2" placeholder="Preferred Date" type="date" />
						<select required className="border rounded px-3 py-2">
							<option>Virtual</option>
							<option>In-person</option>
						</select>
						<button className="btn btn-secondary" type="submit">Book Tour</button>
					</form>
				</div>
			</section>
			<section className="mt-8" data-aos="fade-up">
				<ApplyForm />
			</section>
		</div>
	)
}