import Skill from './Skill';
import { gsap, ScrollTrigger } from './gsap';
import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';
import { useRef } from 'react';

const Skills = () => {
	const el = useRef();
	const el2 = useRef();

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.skills-l',
				{ width: '10%' },
				{
					width: '2%',
					ease: 'none',
					scrollTrigger: {
						trigger: el.current,
						scrub: 0.3,
						start: 'top bottom',
						end: 'bottom top',
					},
				}
			);
			const tl = gsap
				.timeline({ paused: true })
				.fromTo(
					'.skill',
					{ opacity: 0, scale: 0.7 },
					{
						scale: 1,
						opacity: 1,
						duration: 0.8,
						ease: 'power2.out ',
						stagger: 0.03,
					},
					0
				)
				.fromTo(
					'.skills-t',
					{ opacity: 0 },
					{ opacity: 1, ease: 'power2.out', duration: 0.8 },
					0
				);
			ScrollTrigger.create({
				trigger: el.current,
				start: 'top 65%',
				onEnter: () => tl.play(),
			});
			ScrollTrigger.create({
				trigger: el.current,
				onLeaveBack: () => tl.pause(0),
			});
		}, el);
	}, []);

	return (
		<div ref={el}>
			<div className='text-neutral-700 mt-20 mb-8 flex items-center gap-8 skills-t'>
				<div className='w-[10%] h-[1px] bg-neutral-200 skills-l origin-left'></div>
				<p>My Top Skills</p>
				<div className='flex-1 h-[1px] bg-neutral-200'></div>
			</div>
			<div className='w-full flex flex-wrap justify-center gap-[clamp(1.5rem,3vw,3rem)]'>
				<Skill
					title='HTML'
					path='M20 4L18 18.5L12 20.5L6 18.5L4 4zM15.5 8H8.5L9 12H15L14.5 15.5L12 16.25L9.5 15.5L9.4 15'
					fillPath='M20 4L18 18.5L12 20.5L6 18.5L4 4z'
				/>
				<Skill
					title='CSS'
					path='M20 4L18 18.5L12 20.5L6 18.5L4 4zM8.5 8H15.5L11 12H15L14.5 15.5L12 16.25L9.5 15.5L9.4 15'
					fillPath='M20 4L18 18.5L12 20.5L6 18.5L4 4z'
				/>
				<Skill
					title='JavaScript'
					path='M20 4L18 18.5L12 20.5L6 18.5L4 4zM7.5 8H10.5V16L8.5 15M16.5 8H14A0.5 0.5 0 0 0 13.5 8.5V11.5A0.5 0.5 0 0 0 14 12H15.423A0.5 0.5 0 0 1 15.918 12.57L15.5 15.5L13.5 16'
					fillPath='M20 4L18 18.5L12 20.5L6 18.5L4 4z'
				/>
				<Skill
					title='React'
					path='M6.306 8.711C3.704 9.434 2 10.637 2 12C2 14.21 6.477 16 12 16C12.773 16 13.526 15.965 14.248 15.898M17.692 15.289C20.295 14.567 22 13.363 22 12C22 9.79 17.523 8 12 8C11.227 8 10.474 8.035 9.75 8.102M6.305 15.287C5.629 17.902 5.82 19.98 7 20.66C8.913 21.765 12.703 18.783 15.464 14C15.851 13.33 16.197 12.661 16.5 12.002M17.694 8.716C18.371 6.1 18.181 4.02 17 3.34C15.087 2.235 11.297 5.217 8.536 10C8.149 10.67 7.803 11.34 7.499 11.999M12 5.424C10.075 3.532 8.18 2.658 7 3.34C5.087 4.444 5.774 9.217 8.536 14C8.922 14.67 9.329 15.304 9.748 15.896M11.998 18.574C13.924 20.467 15.819 21.342 17 20.66C18.913 19.556 18.226 14.783 15.464 10C15.089 9.35 14.684 8.717 14.252 8.103M11.5 12.866A1 1 0 1 0 12.5 11.134A1 1 0 0 0 11.5 12.866z'
					fillPath='M10 8L7.5 12L10 16L14 16L16.5 12L14 8L10 8'
				/>
				<Skill
					title='Next.js'
					path='M9 15V9L16.745 19.65A9 9 0 1 1 19 17.657M15 12V9'
					fillPath=''
				/>
				<Skill
					title='Python'
					path='M12 9H5A2 2 0 0 0 3 11V15A2 2 0 0 0 5 17H8M12 15H19A2 2 0 0 0 21 13V9A2 2 0 0 0 19 7H16M8 9V5A2 2 0 0 1 10 3H14A2 2 0 0 1 16 5V10A2 2 0 0 1 14 12H10A2 2 0 0 0 8 14V19A2 2 0 0 0 10 21H14A2 2 0 0 0 16 19V15M11 6L11 6.001M13 18L13 18.001'
					fillPath='M19 15A2 2 0 0 0 21 13V9A2 2 0 0 0 19 7H16V10A2 2 0 0 1 14 12H10A2 2 0 0 0 8 14V19A2 2 0 0 0 10 21H14A2 2 0 0 0 16 19V15z'
				/>
				<Skill
					title='Node.js'
					path='M8.5 8V17.5C8.5 18.8 7.7 19.8 6 19.342L2.5 17.5L2.5 6.5L12 1.5L21.5 6.5L21.5 17.5L12 22.5L9.5 21.4M18 10C18 9 17 8 16 8L14 8C13 8 12 9 12 10C12 11 13 12 14 12L16 12C17 12 18 13 18 14C18 15 17 16 16 16L14 16C13 16 12 15 12 14'
					fillPath=''
				/>
				<Skill
					title='SQL'
					path='M4 7A6 3 0 0 0 20 7A6 3 0 0 0 4 7V17A6 3 0 0 0 20 17V7M4 12A6 3 0 0 0 20 12'
					fillPath='M4 7A6 3 0 0 0 20 7V12A6 3 0 0 1 4 12z'
				/>
				<Skill
					title='Express'
					path='M13 6.5L22 18M22 6.5L13 18M2 12L11 12L11 11A4.5 4.5 0 0 0 2 11L2 13C2 18 8.5 20 11 15'
					fillPath=''
				/>
				<Skill
					title='Socket.io'
					path='M11 11H12L15 7zM12 13H13L9 17zM12 3A9 9 0 0 1 12 21A9 9 0 0 1 12 3'
					fillPath='M12 3A9 9 0 0 1 12 21A9 9 0 0 1 12 3'
				/>
				<Skill
					title='WebRTC'
					path='M13 16L7 20L8 16H7A1 1 0 0 1 6 15V9A1 1 0 0 1 7 8H17A1 1 0 0 1 18 9V15A1 1 0 0 1 17 16zM9 8Q8 8 8 6A4 4 0 0 1 16 6Q16 8 15 8M18 13A2 2 0 0 1 16 22Q12.1 20.7 12.5 16.4M15.9 5A1.75 1.75 0 0 1 19.3 13.4M8.1 4.9A2.5 2.5 0 0 0 5.5 15M2.8 13.3A5.25 5.25 0 0 0 13 19.8'
					fillPath='M13 16L7 20L8 16H7A1 1 0 0 1 6 15V9A1 1 0 0 1 7 8H17A1 1 0 0 1 18 9V15A1 1 0 0 1 17 16z'
				/>
				<Skill
					title='Firebase'
					path='M4.53 17.05L10.68 5.33H10.66C11.04 4.59 11.94 4.31 12.67 4.7C12.93 4.84 13.15 5.06 13.29 5.32L14.35 7.33M15.47 6.45C16.05 5.86 17 5.86 17.58 6.44C17.8 6.66 17.94 6.94 17.99 7.25L19.49 16.36C19.59 16.98 19.29 17.6 18.73 17.9L12.66 20.8C12.2 21.05 11.65 21.06 11.2 20.8L5.18 17.88C4.63 17.57 4.33 16.96 4.43 16.34L6.39 4.3C6.51 3.48 7.28 2.92 8.09 3.05C8.55 3.12 8.96 3.41 9.18 3.82L10.42 5.58M4.57 17.18L15.5 6.5'
					fillPath='M6.4 4.2L4.4 17L10.6 5.4L8.2 3zM4.4 17.2L11.8 21L19.4 17.4L17.8 6.8L15.8 6.2z'
				/>
				<Skill
					title='Prisma'
					path='M4.186 16.202L7.801 21.515C8.066 21.905 8.555 22.085 9.016 21.962L19.182 19.244A1.086 1.086 0 0 0 19.895 17.733L12.39 2.25A0.448 0.448 0 0 0 11.603 2.217L4.15 15.055A1.07 1.07 0 0 0 4.187 16.202zM8.5 22L12 2'
					fillPath='M8.5 22L12 2L4 15.5L8.5 22L12 2'
				/>

				<Skill
					title='Redux'
					path='M16.54 7C15.735 4.635 14.004 3 12 3C9.226 3 6.977 5.632 6.977 9.496C6.977 11.452 8.559 14.223 9.489 15.492M4.711 11.979C3.055 13.856 2.497 16.164 3.5 17.89C4.887 20.28 8.638 20.721 12.001 18.79C13.704 17.811 14.876 15.428 15.517 13.992M15.014 19.99C17.525 19.99 19.537 19.552 20.501 17.89C21.888 15.5 20.286 11.997 16.922 10.066C15.22 9.087 12.565 8.831 10.995 8.996M15.5 13A1 1 0 0 1 15.5 15A1 1 0 0 1 15.5 13M9.5 14.5A1 1 0 0 1 9.5 16.5A1 1 0 0 1 9.5 14.5M11 8A1 1 0 0 1 11 10A1 1 0 0 1 11 8'
					fillPath=''
				/>
				<Skill
					title='GSAP'
					path='M4 16L10 9L15 14L20 8M4 15A1 1 0 0 1 4 17A1 1 0 0 1 4 15M10 8A1 1 0 0 1 10 10A1 1 0 0 1 10 8M15 13A1 1 0 0 1 15 15A1 1 0 0 1 15 13M20 7A1 1 0 0 1 20 9A1 1 0 0 1 20 7'
					fillPath=''
				/>
				<Skill
					title='TailwindCSS'
					path='M11.667 6C9.177 6 7.623 7.222 7 9.667C7.933 8.444 9.023 7.987 10.267 8.292C10.977 8.466 11.484 8.972 12.045 9.532C12.961 10.444 14.045 11.5 16.333 11.5C18.823 11.5 20.377 10.278 21 7.833C20.067 9.056 18.977 9.513 17.733 9.208C17.023 9.034 16.516 8.528 15.955 7.968C15.039 7.056 13.98 6 11.667 6zM7.667 12.5C5.177 12.5 3.623 13.722 3 16.167C3.933 14.944 5.023 14.487 6.267 14.792C6.977 14.966 7.484 15.472 8.045 16.032C8.961 16.944 10.02 18 12.333 18C14.823 18 16.377 16.778 17 14.333C16.067 15.556 14.977 16.013 13.733 15.708C13.023 15.534 12.516 15.028 11.955 14.468C11.039 13.556 9.98 12.5 7.667 12.5z'
					fillPath='M11.667 6C9.177 6 7.623 7.222 7 9.667C7.933 8.444 9.023 7.987 10.267 8.292C10.977 8.466 11.484 8.972 12.045 9.532C12.961 10.444 14.045 11.5 16.333 11.5C18.823 11.5 20.377 10.278 21 7.833C20.067 9.056 18.977 9.513 17.733 9.208C17.023 9.034 16.516 8.528 15.955 7.968C15.039 7.056 13.98 6 11.667 6zM7.667 12.5C5.177 12.5 3.623 13.722 3 16.167C3.933 14.944 5.023 14.487 6.267 14.792C6.977 14.966 7.484 15.472 8.045 16.032C8.961 16.944 10.02 18 12.333 18C14.823 18 16.377 16.778 17 14.333C16.067 15.556 14.977 16.013 13.733 15.708C13.023 15.534 12.516 15.028 11.955 14.468C11.039 13.556 9.98 12.5 7.667 12.5z'
				/>
				<Skill
					title='Bootstrap'
					path='M2 12A2 2 0 0 0 4 10V6A2 2 0 0 1 6 4H18A2 2 0 0 1 20 6V10A2 2 0 0 0 22 12M2 12A2 2 0 0 1 4 14V18A2 2 0 0 0 6 20H18A2 2 0 0 0 20 18V14A2 2 0 0 1 22 12M9 16V8H12.5A2 2 0 1 1 12.5 12H9H13A2 2 0 1 1 13 16H9'
					fillPath='M2 12A2 2 0 0 0 4 10V6A2 2 0 0 1 6 4H18A2 2 0 0 1 20 6V10A2 2 0 0 0 22 12M2 12A2 2 0 0 1 4 14V18A2 2 0 0 0 6 20H18A2 2 0 0 0 20 18V14A2 2 0 0 1 22 12'
				/>
			</div>
		</div>
	);
};

export default Skills;
