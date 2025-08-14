import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaXTwitter, FaHeart } from 'react-icons/fa6'

export default function Footer() {
	const year = new Date().getFullYear()
	return (
		<footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
				<div>
					<img src="/logo.svg" alt="Girl's Dignity Academy logo" className="h-12 mb-2" />
					<p className="text-sm text-gray-600 dark:text-gray-400">Empowering girls in low-income communities through quality education and dignity.</p>
				</div>
				<div>
					<h4 className="font-semibold text-brand-maroon dark:text-white mb-2">Quick Links</h4>
					<ul className="space-y-1 text-sm">
						<li><Link to="/about" className="hover:underline">About</Link></li>
						<li><Link to="/academics" className="hover:underline">Academics</Link></li>
						<li><Link to="/admissions" className="hover:underline">Admissions</Link></li>
						<li><Link to="/parents" className="hover:underline">Parents</Link></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold text-brand-maroon dark:text-white mb-2">Student Life</h4>
					<ul className="space-y-1 text-sm">
						<li><Link to="/student-life" className="hover:underline">Activities</Link></li>
						<li><Link to="/news" className="hover:underline">News & Events</Link></li>
						<li><Link to="/safety" className="hover:underline">Safety</Link></li>
						<li><Link to="/multimedia" className="hover:underline">Gallery</Link></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold text-brand-maroon dark:text-white mb-2">Legal</h4>
					<ul className="space-y-1 text-sm">
						<li><a href="#" className="hover:underline">Privacy Policy</a></li>
						<li><a href="#" className="hover:underline">Terms of Service</a></li>
						<li><a href="#" className="hover:underline">Accreditations</a></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold text-brand-maroon dark:text-white mb-2">Connect</h4>
					<div className="flex gap-3 text-2xl">
						<a href="#" aria-label="Facebook" className="text-brand-blue hover:scale-110 transition-transform"><FaFacebook /></a>
						<a href="#" aria-label="Instagram" className="text-brand-pink hover:scale-110 transition-transform"><FaInstagram /></a>
						<a href="#" aria-label="X" className="text-gray-700 dark:text-gray-200 hover:scale-110 transition-transform"><FaXTwitter /></a>
					</div>
				</div>
			</div>
			<div className="border-t border-gray-200 dark:border-gray-800 py-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
					<div className="flex items-center gap-2">
						<span className="heart"><FaHeart /></span>
						<span>Made with care for every girl.</span>
					</div>
					<div>© {year} Girl's Dignity Academy. All rights reserved.</div>
				</div>
			</div>
		</footer>
	)
}