import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Loading from './components/Loading'

import Home from './pages/Home'
import About from './pages/About'
import Academics from './pages/Academics'
import Admissions from './pages/Admissions'
import Parents from './pages/Parents'
import StudentLife from './pages/StudentLife'
import Contact from './pages/Contact'
import NewsEvents from './pages/NewsEvents'
import Safety from './pages/Safety'
import Multimedia from './pages/Multimedia'

function App() {
	const [dark, setDark] = useState(false)
	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark)
	}, [dark])

	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
				<Navbar dark={dark} setDark={setDark} />
				<main className="flex-1">
					<Suspense fallback={<Loading />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/academics" element={<Academics />} />
							<Route path="/admissions" element={<Admissions />} />
							<Route path="/parents" element={<Parents />} />
							<Route path="/student-life" element={<StudentLife />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/news" element={<NewsEvents />} />
							<Route path="/safety" element={<Safety />} />
							<Route path="/multimedia" element={<Multimedia />} />
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					</Suspense>
				</main>
				<Footer />
				<ScrollToTopButton />
			</div>
		</BrowserRouter>
	)
}

export default App
