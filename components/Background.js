import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';
import { gsap } from './gsap';
import { useRef, useEffect } from 'react';
import { Gradient } from './Gradient.js';

const Background = () => {
	const el = useRef();

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.set(el.current, { zIndex: -1 });
			gsap.fromTo(
				el.current,
				{ translateY: '20rem' },
				{
					translateY: 0,
					duration: 1.2,
					ease: 'power3.out',
				},
				2.4
			);
		}, el);
	}, []);

	useEffect(() => {
		const seed = Math.floor(Math.random() * 100);

		const gradient = new Gradient();

		gradient.initGradient('#gradient-canvas');
		gradient.connect();
		gradient.seed = seed;
	}, []);

	return (
		<>
			<div ref={el} className='absolute top-0 left-0 w-full h-full'>
				<div className='w-full h-[calc(100%+30rem)] absolute top-[-20rem] left-0 background-el' data-speed='0.6'>
					<canvas
						className='w-full h-full'
						id='gradient-canvas'
						dpr={[1, 2]}
					></canvas>
				</div>
			</div>
		</>
	);
};

export default Background;
