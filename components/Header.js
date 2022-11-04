import { useRef } from 'react';
import Button from './Button';
import { gsap, ScrollTrigger } from './gsap';
import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';

const Header = ({ scrollToSection, open, setOpen }) => {
	const el = useRef();

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.name',
				{ translateY: '40rem' },
				{ translateY: 0, duration: 1.2, ease: 'power3.out' },
				2.3
			);

			gsap.fromTo(
				'.title',
				{ translateY: '40rem ' },
				{
					translateY: 0,
					duration: 1.2,
					ease: 'power3.out',
				},
				2.3
			);

			gsap.fromTo(
				'.down-arrow',
				{ translateY: 0, rotate: 0 },
				{
					translateY: '-=150%',
					rotate: 45,
					scrollTrigger: {
						trigger: el.current,
						scrub: 0.5,
						start: 'top top',
						end: 'bottom top',
					},
				}
			);

			let direction = 1;
			let clamp = gsap.utils.clamp(-2500, 2500);

			const roll1 = roll('.name-p', { duration: 25 }),
				scroll = ScrollTrigger.create({
					trigger: el.current,
					onUpdate(self) {
						if (self.direction !== direction) direction *= -1;
						let scale = clamp(self.getVelocity()) / 150;
						if (scale >= 0 && scale < 1) scale = 1;
						if (scale < 0 && scale > -1) scale = -1;
						gsap.to([roll1], {
							timeScale: scale,
							overwrite: true,
							delay: 0,
							duration: 0,
						});
						gsap.to([roll1], {
							timeScale: 1.5 * direction,
							duration: 0.35,
							ease: 'power3.out',
						});
					},
				});

			function roll(targets, vars, reverse) {
				vars = vars || {};
				vars.ease || (vars.ease = 'none');
				const tl = gsap.timeline({
						repeat: -1,
						onReverseComplete() {
							this.totalTime(
								this.rawTime() + this.duration() * 10
							);
						},
					}),
					elements = gsap.utils.toArray(targets),
					clones = elements.map((el) => {
						let clone = el.cloneNode(true);
						el.parentNode.appendChild(clone);
						return clone;
					}),
					positionClones = () =>
						elements.forEach((el, i) =>
							gsap.set(clones[i], {
								position: 'absolute',
								overwrite: false,
								top: el.offsetTop,
								left:
									el.offsetLeft +
									(reverse
										? -el.offsetWidth
										: el.offsetWidth),
							})
						);
				positionClones();
				elements.forEach((el, i) =>
					tl.to(
						[el, clones[i]],
						{ xPercent: reverse ? 100 : -100, ...vars },
						0
					)
				);
				window.addEventListener('resize', () => {
					let time = tl.totalTime();
					tl.totalTime(0);
					positionClones();
					tl.totalTime(time);
				});
				return tl;
			}
		}, el);
	}, []);

	const handleNav = (sectionId) => {
		scroll && scroll.scollTo(sectionId.current, { offset: -100 });
	};

	return (
		<section ref={el} className='w-full min-h-[115vh] pb-[15vh] relative'>
			<div className='w-full from-transparent to-black/10 bg-gradient-to-b bottom-0 h-[15vh] left-0 absolute'></div>
			<div className='w-full flex items-center justify-between h-24 px-[clamp(1.5rem,4vw,3rem)] text-[1.1875rem] tracking-wide font-light whitespace-nowrap'>
				<Button
					strength={20}
					textStrength={10}
					classes='cursor-default'
				>
					<span className='nav-name btn-text absolute top-0 left-0 px-5'>
						Luke Elder
					</span>
					<span className='p-5 text-transparent'>Luke Elder</span>
					<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white -bottom-4 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
				</Button>
				<div className='hidden md:flex'>
					<Button strength={20} textStrength={10}>
						<span
							className='btn-text absolute top-0 left-0 px-5 select-none'
							onClick={() => scrollToSection('#about')}
						>
							About
						</span>
						<span className='p-5 text-transparent select-none'>
							About
						</span>
						<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white -bottom-4 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
					</Button>
					<Button strength={20} textStrength={10}>
						<span
							className='btn-text absolute top-0 left-0 px-5 select-none'
							onClick={() => scrollToSection('#projects')}
						>
							Projects
						</span>
						<span className='p-5 text-transparent select-none'>
							Projects
						</span>
						<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white -bottom-4 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
					</Button>
					<Button strength={20} textStrength={10}>
						<span
							className='btn-text absolute top-0 left-0 px-5 select-none'
							onClick={() => scrollToSection('#contact')}
						>
							Contact
						</span>
						<span className='p-5 text-transparent select-none'>
							Contact
						</span>
						<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white -bottom-4 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0 '></span>
					</Button>
				</div>
				<div
					className='md:hidden cursor-pointer group relative'
					onClick={() => setOpen(!open)}
				>
					<span className='p-5'>Menu</span>
					<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white -bottom-4 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
				</div>
			</div>
			<div className='name w-full flex-nowrap whitespace-nowrap absolute flex bottom-[45vh] md:bottom-[18vh]'>
				<div className='name-p will-change-transform box-border select-none relative text-[clamp(8rem,15vw,14rem)] w-fit font-semibold font-sans'>
					<span>Luke Elder</span>
					<span className='px-[8vw]'>&mdash;</span>
					<span>Luke Elder</span>
					<span className='px-[8vw]'>&mdash;</span>
				</div>
			</div>
			<div className='absolute bottom-[28vh] left-[clamp(2rem,4vw,4rem)] text-[clamp(1.75rem,4vw,2.75rem)] md:bottom-[55vh] md:right-[clamp(5rem,11vw,14rem)] md:left-auto title'>
				<svg
					viewBox='0 0 24 24'
					strokeWidth={1.75}
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='w-[clamp(1.75rem,4vw,2.75rem)] h-[clamp(1.75rem,4vw,2.75rem)] absolute down-arrow origin-center -top-14 md:-top-20'
				>
					<path fill='none' stroke='none' d='M0 0h24v24H0z' />
					<path d='M7 7L17 17M17 8L17 17L8 17' />
				</svg>
				<div className='font-light text-neutral-100 leading-[clamp(2rem,4vw,3.5rem)]'>
					Full stack <br /> software engineer
				</div>
			</div>
		</section>
	);
};

export default Header;
