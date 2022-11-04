import { useRef } from 'react';
import { gsap, SplitText } from './gsap';
import disableScroll from 'disable-scroll';
import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';

const Loader = ({ scrollToSection }) => {
	const el = useRef();
	const tl = useRef(gsap.timeline());

	useIsomorphicLayoutEffect(() => {
		window.scrollTo(0, 0);
		disableScroll.on()
		setTimeout(() => {
			disableScroll.off();
		}, 2900);

		const ctx = gsap.context(() => {
			const text1 = new SplitText('.text1', { type: 'chars' });
			const text2 = new SplitText('.text2', { type: 'chars' });

			tl.current
				.to('.text', { opacity: 1, duration: 0 }, 0)
				.fromTo(
					text1.chars,
					{ opacity: 0, translateY: '.25rem' },
					{
						opacity: 1,
						duration: 0.5,
						stagger: 0.015,
						translateY: 0,
						ease: 'power2.out',
					},
					0.5
				)
				.to(
					text1.chars,
					{
						translateX: '2rem',
						stagger: { from: 'end', each: 0.015 },
						opacity: 0,
						duration: 0.5,
						ease: 'power2.inOut',
					},
					1.2
				)
				.to(
					'.smile',
					{ rotateZ: 20, duration: 1.5, ease: 'power1.inOut' },
					0
				)
				.fromTo(
					text2.chars,
					{ opacity: 0, translateX: '-2rem' },
					{
						opacity: 1,
						duration: 0.7,
						stagger: { from: 'end', each: 0.02 },
						translateX: 0,
						ease: 'power2.out',
					},
					1.4
				)
				.to(
					'.text',
					{
						translateY: '-3rem',
						duration: 0.75,
						opacity: 0,
						ease: 'power2.inOut',
					},
					1.95
				);
			tl.current
				.to(
					el.current,
					{
						translateY: '-100vh',
						duration: 1,
						ease: 'power4.inOut',
					},
					2
				)
				.to(
					'.circle',
					{ scaleY: 0, duration: 1, ease: 'power1.inOut' },
					2
				);
		}, el);
	}, []);

	return (
		<div
			ref={el}
			className='w-full h-screen z-[999] bg-neutral-900 absolute top-0 left-0 overflow-x-clip'
		>

			<div
				className='circle w-[120vw] left-[-10vw] bottom-0 translate-y-1/2 h-[30rem]
			md:h-[50rem] lg:h-[70rem] bg-neutral-900 absolute rounded-[100%_100%] overflow-auto'
			></div>
			<div className='text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-100 text-[clamp(3.5rem,6vw,5rem)] tracking-wide text-center font-light opacity-0 whitespace-nowrap'>
				<p className='text1 absolute left-1/2 -translate-x-1/2'>
					Hello <span className='opacity-0'>:)</span>
					<span className='smile origin-center absolute right-0'>
						:&#41;
					</span>
				</p>
				<p className='text2 w-full'>Welcome!</p>
			</div>
		</div>
	);
};

export default Loader;
