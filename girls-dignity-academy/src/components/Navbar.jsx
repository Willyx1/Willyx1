import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'

const navItems = [
	{ to: '/', label: 'Home' },
	{ to: '/about', label: 'About Us' },
	{ to: '/academics', label: 'Academics' },
	{ to: '/admissions', label: 'Admissions' },
	{ to: '/parents', label: 'Parent Resources' },
	{ to: '/student-life', label: 'Student Life' },
	{ to: '/news', label: 'News & Events' },
	{ to: '/safety', label: 'Safety & Well-Being' },
	{ to: '/multimedia', label: 'Multimedia' },
	{ to: '/contact', label: 'Contact' },
]

export default function Navbar({ dark, setDark }) {
	const [open, setOpen] = useState(false)
	return (
		<header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3">
					<img src="/logo.svg" alt="Girl's Dignity Academy logo" className="h-10 w-10" />
					<div className="leading-tight">
						<div className="font-head text-xl text-brand-maroon dark:text-white">Girl's Dignity</div>
						<div className="text-xs text-gray-500">Empowering Girls with Education and Dignity</div>
					</div>
				</Link>
				<nav className="hidden lg:flex gap-1">
					{navItems.map(i => (
						<NavLink key={i.to} to={i.to} className={({ isActive }) => `px-3 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'text-brand-red' : 'text-gray-700 dark:text-gray-200'}`}>
							{i.label}
						</NavLink>
					))}
				</nav>
				<div className="flex items-center gap-2">
					<button aria-label="Toggle dark mode" onClick={() => setDark(!dark)} className="btn btn-outline !px-3 !py-2">
						{dark ? <FaSun /> : <FaMoon />}
					</button>
					<button className="lg:hidden btn btn-primary !px-3 !py-2" onClick={() => setOpen(true)} aria-label="Open menu">
						<FaBars />
					</button>
				</div>
			</div>
			{/* Mobile menu */}
			{open && (
				<div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
					<div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-4" onClick={e => e.stopPropagation()}>
						<div className="flex items-center justify-between mb-4">
							<div className="font-head text-lg">Menu</div>
							<button className="btn btn-outline !px-3 !py-2" onClick={() => setOpen(false)} aria-label="Close menu">
								<FaTimes />
							</button>
						</div>
						<div className="flex flex-col gap-2">
							{navItems.map(i => (
								<NavLink key={i.to} to={i.to} onClick={() => setOpen(false)} className={({ isActive }) => `px-3 py-2 rounded-md text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'text-brand-red' : 'text-gray-700 dark:text-gray-200'}`}>
									{i.label}
								</NavLink>
							))}
						</div>
					</div>
				</div>
			)}
		</header>
	)
}