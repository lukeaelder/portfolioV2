import Skills from './Skills';
import { gsap, SplitText, ScrollTrigger } from './gsap';
import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';
import { useRef } from 'react';

const About = () => {
	const el = useRef();

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const text1 = new SplitText('.about-p', {
				type: 'lines',
				linesClass: 'lineChild',
			});
			const text2 = new SplitText('.about-p', {
				type: 'lines',
				linesClass: 'lineParent',
			});
			const lines1 = text1.lines;
			const tl = gsap.timeline({ paused: true }).fromTo(
				lines1,
				{ translateY: '100%' },
				{
					translateY: 0,
					duration: 1,
					ease: 'power3.out',
					stagger: 0.05,
				}
			);
			ScrollTrigger.create({
				trigger: el.current,
				start: 'top 50%',
				onEnter: () => tl.play(),
			});
			ScrollTrigger.create({
				trigger: el.current,
				onLeaveBack: () => tl.pause(0),
			});
			const tl2 = gsap.timeline({ paused: true }).fromTo(
				'.about-t',
				{ translateX: 30, opacity: 0 },
				{
					translateX: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power2.out',
				}
			);
			ScrollTrigger.create({
				trigger: el.current,
				start: 'top 60%',
				onEnter: () => tl2.play(),
			});
			ScrollTrigger.create({
				trigger: el.current,
				onLeaveBack: () => tl2.pause(0),
			});
		}, el);
	}, []);

	return (
		<div className='bg-white' id='about' ref={el}>
			<div className='px-[clamp(2rem,4vw,4rem)]'>
				<h2 className='text-black text-[clamp(2.5rem,5vw,3.75rem)] text-center pt-24 pb-20 about-t'>
					About Me
				</h2>
				<div className='max-w-6xl mx-auto'>
					<p className='text-black text-[clamp(1.375rem,3vw,1.625rem)] about-p text-center'>
						Hello! My name is Luke and I’m a full-stack software
						developer. My interest in computers and software
						development began at a young age messing around in 2D
						game engines, creating whatever I could think of. Today that interest has grown into my
						passion. I love learning new technologies and solving
						problems to create high-quality user experiences.
					</p>
					<Skills />
				</div>
			</div>
		</div>
	);
};

export default About;
