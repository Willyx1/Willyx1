import { useForm } from 'react-hook-form'

export default function InquiryForm() {
	const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
	const onSubmit = async (data) => {
		console.log('inquiry', data)
		await new Promise(r => setTimeout(r, 600))
		alert('Thank you! We will get back to you shortly.')
		reset()
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">
			<input className="border rounded px-3 py-2" placeholder="Your Name" {...register('name', { required: true })} />
			<input className="border rounded px-3 py-2" placeholder="Your Email" type="email" {...register('email', { required: true })} />
			<textarea className="border rounded px-3 py-2" placeholder="Message" rows={4} {...register('message', { required: true })} />
			<div className="flex items-center gap-3">
				<input className="border rounded px-3 py-2 w-32" placeholder="2 + 3 = ?" {...register('captcha', { validate: v => Number(v) === 5 })} />
				<span className="text-sm text-gray-500">Simple CAPTCHA</span>
			</div>
			<button type="submit" className="btn btn-secondary" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
		</form>
	)
}