import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTopButton() {
	const [show, setShow] = useState(false)
	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > 400)
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])
	if (!show) return null
	return (
		<button aria-label="Scroll to top" className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
			<FaArrowUp />
		</button>
	)
}