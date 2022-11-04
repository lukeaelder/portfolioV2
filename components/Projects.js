import { gsap, ScrollTrigger } from './gsap';
import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';
import { useRef } from 'react';
import Project from './Project';

const Projects = () => {
	const el = useRef();

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.circle-bottom',
				{ scaleY: 1 },
				{
					scaleY: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: el.current,
						scrub: 0.3,
						start: 'bottom bottom',
						end: 'bottom top',
					},
				}
			);
			const tl = gsap
				.timeline({ paused: true })
				.fromTo(
					'.projects-t1',
					{ translateX: 30, opacity: 0 },
					{
						translateX: 0,

						opacity: 1,
						duration: 0.8,
						ease: 'power2.out',
					},
					0
				)
				.fromTo(
					'.projects-t2',
					{ translateX: -30, opacity: 0 },
					{
						translateX: 0,

						opacity: 1,
						duration: 0.8,
						ease: 'power2.out',
					},
					0
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
		}, el);
	}, []);

	return (
		<section
			className='flex items-center bg-white relative px-[clamp(2rem,4vw,4rem)]'
			id='projects'
			ref={el}
		>
			<div className='w-full max-w-6xl mx-auto pb-44'>
				<div className='text-black text-[clamp(2.5rem,5vw,3.75rem)] leading-[clamp(2.5rem,5vw,4.5rem)] text-center lg:mb-32 mb-28 mt-32 lg:mt-36'>
					<h2 className='projects-t1'>Featured</h2>
					<h2 className='block text-white projects-span projects-t2'>
						Projects
					</h2>
				</div>
				<div className='grid md:grid-cols-2 md:gap-x-10 gap-y-24 lg:gap-y-28 lg:grid-cols-1'>
					<Project
						title='Svg Icon Library'
						desc='A collection of easy-to-use, customizable SVG icons for use in web projects. Users can also quickly create brand new icons.'
						stack={['Next.js', 'TailwindCSS', 'Fuse.js', 'Rollup']}
						git='https://github.com/lukeaelder/eldicons'
						url='https://eldicons.com/'
						images={[
							'/images/eldicons1.webp',
							'/images/eldicons2.webp',
							'/images/eldicons3.webp',
						]}
					/>
					<Project
						title='Movie Database App'
						desc='Search and explore any movie to get information about it. Sign up to save movies to your watchlist and create movie list.'
						stack={['Python', 'Flask', 'PostgreSQL']}
						git='https://github.com/lukeaelder/MovieR-L'
						url='https://movierandl.herokuapp.com/'
						images={[
							'/images/movierl1.webp',
							'/images/movierl2.webp',
							'/images/movierl3.webp',
						]}
					/>
					<Project
						title='Developer Toolbox'
						desc='A set of tools for web developers including string manipulation, code minifiers, data generators, and more.'
						stack={['Next.js', 'TailwindCSS', 'GSAP']}
						url='https://wdtoolbox.com/'
						images={[
							'/images/wdtoolbox1.webp',
							'/images/wdtoolbox2.webp',
							'/images/wdtoolbox3.webp',
						]}
					/>
					<Project
						title='Group Task App'
						desc='Users can join groups to make announcements, assign tasks, track progress, send realtime messages, make video calls, and more.'
						stack={[
							'React',
							'Node.js',
							'socket.io',
							'WebRTC',
							'PostgreSQL',
							'Express',
						]}
						git='https://github.com/lukeaelder/Capstone2-groupscheduler'
						url='https://c2-scheduler.surge.sh/'
						images={[
							'/images/gscheduler1.webp',
							'/images/gscheduler2.webp',
						]}
					/>
				</div>
			</div>
			<div className='absolute w-[300vw] left-[-100vw] bottom-[1px] translate-y-1/2 h-[100rem] md:h-[120rem] lg:h-[140rem] rounded-[100%_100%] bg-gradient-radial from-black/70 via-transparent t to-transparent circle-bottom z-10 pointer-events-none'>
				<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[120vw] h-[30rem] md:h-[40rem] lg:h-[50rem] bg-white rounded-[100%_100%]'></div>
			</div>
		</section>
	);
};

export default Projects;
