import { useState, useRef } from 'react';
import Button from './Button';
import { gsap } from './gsap';
import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';
import Footer from './Footer';
import TextareaAutosize from 'react-textarea-autosize';

const Contact = () => {
	const [data, setData] = useState({ name: '', email: '', message: '' });
	const [status, setStatus] = useState(0);
	const [error, setError] = useState({
		name: false,
		email: false,
		message: false,
		change: false,
	});
	const [sending, setSending] = useState(false);
	const el = useRef();
	const timer = useRef();

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.contact-content',
				{ translateY: '-50%' },
				{
					translateY: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: el.current,
						scrub: true,
						start: 'top bottom',
						end: 'top top',
					},
				}
			);
		}, el);
	}, []);

	const handleChange = (e) => {
		setData({ ...data, [e.target.id]: e.target.value });
		if (error.change === false) setError({ ...error, change: true });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailValid =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
				data.email
			);
		const messageValid = data.message.length >= 3 && data.message.length <= 2000 ;
		if (
			!data.name ||
			!data.email ||
			!data.message ||
			!emailValid ||
			!messageValid
		) {
			setError({
				name: !data.name.length,
				email: !emailValid,
				message: !messageValid,
				change: false,
			});
			setSending(false);
			return;
		}
		setSending(true);
		setError({
			name: false,
			email: false,
			message: false,
		});
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};
		const response = await fetch('/api/form', options);
		const result = await response.json();
		if (result.res === true) {
			clearTimeout(timer);
			setStatus(1);
			timer = setTimeout(() => {
				setData({ name: '', email: '', message: '' });
				setSending(false);
				setStatus(0);
			}, 3000)
		} else {
			setSending(false);
			alert('There was a problem sending your message :(')
		}	
	};

	const handleFocus = (num) => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				`.input-line-${num}`,
				{ translateX: 0 },
				{
					translateX: '66%',
					duration: 1,
					ease: 'power1.out',
				}
			);
		}, el);
	};

	return (
		<section
			className='w-full relative bg-neutral-900'
			id='contact'
			ref={el}
		>
			<div className='overflow-y-hidden'>
				<div className='w-full contact-content'>
					<div className='w-full flex flex-col h-full justify-between min-h-screen pt-[10vh]'>
						<div>
							<h2 className='text-white text-[clamp(2rem,5vw,3.75rem)] text-center'>
								Contact Me
							</h2>
							<div className='w-fit mx-auto relative'>
								<a
									href='mailto:lukeaeld@gmail.com'
									aria-label='Email'
								>
									<Button strength={20} textStrength={10}>
										<p className='mb-10 lg:mb-12 mt-10 text-neutral-300 group-hover:text-white transition-colors py-4 px-6'>
											lukeaeld@gmail.com
										</p>

										<p className='text-transparent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-full border-neutral-500 group-hover:border-indigo-500 transition-colors group-hover:bg-indigo-500 z-[-1] py-4 px-6'>
											lukeaeld@gmail.com
										</p>
									</Button>
								</a>
							</div>
						</div>
						<form
							onSubmit={(e) => handleSubmit(e)}
							className='max-w-7xl mx-auto px-[clamp(1.5rem,4vw,5rem)] relative pb-12 w-full'
						>
							<div className='text-[clamp(1.5rem,3vw,2rem)] flex flex-col gap-8'>
								<div className='group'>
									<div className='relative overflow-x-hidden group'>
										<label
											htmlFor='name'
											className={`transition-colors duration-200 absolute top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none z-[-1] ${
												data.name.length ? 'hidden' : ''
											}`}
										>
											Your Name
										</label>
										<input
											id='name'
											name='name'
											autoComplete='on'
											value={data.name}
											onChange={(e) => handleChange(e)}
											className='w-full py-5 bg-transparent outline-none peer'
											onFocus={() => handleFocus(1)}
										></input>
										<svg
											viewBox='0 0 300 100'
											strokeWidth={2}
											stroke='currentColor'
											fill='none'
											strokeLinecap='round'
											strokeLinejoin='round'
											className={`w-[300%] h-full absolute right-0 top-0 pointer-events-none will-change-transform transition-colors duration-200 input-line-1 ${
												error.name
													? 'stroke-red-500/50 group-hover:stroke-red-500/70 peer-focus:!stroke-red-500'
													: 'stroke-neutral-500 group-hover:stroke-neutral-300 peer-focus:!stroke-white'
											}`}
											preserveAspectRatio='none'
										>
											<path d='M0 90H100C110 90 120 84 130 78C140 72 160 72 170 78C180 84 190 90 200 90H300' />
										</svg>
									</div>
									{error.name ? (
										<span className='text-sm lg:text-base text-red-500 font-light'>
											Please enter a valid name
										</span>
									) : null}
								</div>
								<div className='group'>
									<div className='relative overflow-x-hidden group'>
										<label
											htmlFor='email'
											className={`transition-colors duration-200 absolute top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none z-[-1] ${
												data.email.length
													? 'hidden'
													: ''
											}`}
										>
											Your Email
										</label>
										<input
											id='email'
											name='email'
											autoComplete='on'
											value={data.email}
											onChange={(e) => handleChange(e)}
											className='w-full bg-transparent outline-none peer py-5'
											onFocus={() => handleFocus(2)}
										></input>
										<svg
											viewBox='0 0 300 100'
											strokeWidth={2}
											stroke='currentColor'
											fill='none'
											strokeLinecap='round'
											strokeLinejoin='round'
											className={`w-[300%] h-full absolute right-0 top-0 pointer-events-none will-change-transform transition-colors duration-200 input-line-2 ${
												error.email
													? 'stroke-red-500/50 group-hover:stroke-red-500/70 peer-focus:!stroke-red-500'
													: 'stroke-neutral-500 group-hover:stroke-neutral-300 peer-focus:!stroke-white'
											}`}
											preserveAspectRatio='none'
										>
											<path d='M0 90H100C110 90 120 84 130 78C140 72 160 72 170 78C180 84 190 90 200 90H300' />
										</svg>
									</div>
									{error.email ? (
										<span className='text-sm lg:text-base text-red-500 font-light'>
											Please enter a valid Email
										</span>
									) : null}
								</div>
								<div className='group'>
									<div className='relative overflow-x-hidden'>
										<label
											htmlFor='message'
											className={`transition-colors duration-200 absolute top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none z-[-1] ${
												data.message.length
													? 'hidden'
													: ''
											}`}
										>
											Your Message
										</label>
										<TextareaAutosize
											id='message'
											name='message'
											autoComplete='on'
											value={data.message}
											onChange={(e) => handleChange(e)}
											className='w-full py-5 bg-transparent outline-none peer resize-none h-auto pt-8'
											onFocus={() => handleFocus(3)}
										></TextareaAutosize>
										<svg
											viewBox='0 0 300 100'
											strokeWidth={1.75}
											stroke='currentColor'
											fill='none'
											strokeLinecap='round'
											strokeLinejoin='round'
											className={`w-[300%] h-full max-h-[90px] absolute right-0 bottom-0 pointer-events-none will-change-transform transition-colors duration-200 input-line-3 ${
												error.message
													? 'stroke-red-500/50 group-hover:stroke-red-500/70 peer-focus:!stroke-red-500'
													: 'stroke-neutral-500 group-hover:stroke-neutral-300 peer-focus:!stroke-white'
											}`}
											preserveAspectRatio='none'
										>
											<path d='M0 90H100C110 90 120 84 130 78C140 72 160 72 170 78C180 84 190 90 200 90H300' />
										</svg>
									</div>
									{error.message ? (
										<span className='text-sm lg:text-base text-red-500 font-light'>
											Please enter a message atleast 3
											character long
										</span>
									) : null}
								</div>
								<div>
									<Button
										classes={`w-fit ${
											data.name === '' ||
											data.email === '' ||
											data.message.length < 3 ||
											error.change === false
												? 'pointer-events-none text-neutral-500'
												: 'text-white'
										}`}
										strength={30}
										textStrength={15}
									>
										<button
											type='submit'
											className='text-[clamp(1.25rem,3vw,1.5rem)] transition-colors py-2'
										>
											<span className={`absolute left-1/2 -translate-x-1/2 transition-opacity ${sending === true ? 'opacity-100' : 'opacity-0'}`}>
												Sending...
											</span>
											<span className={`transition-opacity ${sending === true ? 'opacity-0' : 'opacity-100'}`}>Send Message</span>
										</button>
										<span
											className={`absolute w-full scale-x-100 group-hover:scale-x-0 h-[1px] rounded-full bottom-0 left-1/2 transition -translate-x-1/2 group-hover:translate-y-0 pointer-events-none ${
												data.name === '' ||
												data.email === '' ||
												data.message.length < 3 ||
												error.change === false
													? 'bg-neutral-500'
													: 'bg-white'
											}`}
										></span>
									</Button>
								</div>
							</div>
							<div
								className={`w-full h-full absolute top-0 left-0 transition flex items-center justify-center duration-300 bg-neutral-900  ${
									status === 0
										? 'opacity-0 pointer-events-none'
										: 'opacity-100'
								}`}
							>
								<p
									className={`text-[clamp(1.5rem,3vw,2.5rem)] transition duration-300 ease-in-out ${
										status === 0
											? 'translate-y-10'
											: 'translate-y-0'
									}`}
								>
									Message Sent 👍
								</p>
							</div>
						</form>
						<Footer />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
