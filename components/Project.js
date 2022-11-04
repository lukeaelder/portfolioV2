import Button from './Button';
import { gsap, ScrollTrigger } from './gsap';
import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';
import { useRef } from 'react';
import ImageCarousel from './ImageCarousel';

const Project = ({ title = '', desc = '', stack = [], git = '', url = '', images=[] }) => {
  const el = useRef();
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ paused: true })
        .fromTo(
          '.image-cover',
          { opacity: 1, pointerEvents: 'auto' },
          {
            opacity: 0,
            pointerEvents: 'none',
            ease: 'power3.out',
            duration: 1.3,
          },
          0
        )
        .fromTo(
          '.project-title',
          { translateY: 80, opacity: 0 },
          {
            translateY: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 1,
          },
          0
        )
        .fromTo(
          '.project-desc',
          { translateY: 100, opacity: 0 },
          {
            translateY: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 1.1,
          },
          0
        )
        .fromTo(
          '.project-stack',
          { translateY: 120, opacity: 0 },
          {
            translateY: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 1.2,
          },
          0
        )
        .fromTo(
          '.project-links',
          { translateY: 140, opacity: 0 },
          {
            translateY: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 1.3,
          },
          0
        );
      ScrollTrigger.create({
        trigger: el.current,
        start: 'top 60%',
        onEnter: () => tl.play(),
      });
      ScrollTrigger.create({
        trigger: el.current,
        onLeaveBack: () => tl.pause(0),
      });
    }, el);
  }, []);

  return (
		<div ref={el} className='lg:flex lg:flex-row-reverse lg:gap-12'>
			<div className='w-full max-w-[500px] mx-auto project-image relative'>
				<div className='overflow-hidden rounded-xl cursor-pointer border-[1px] border-neutral-200 bg-neutral-50'>
					<ImageCarousel images={images} />
				</div>
				<div className='w-full h-full bg-white absolute left-0 top-0 image-cover'></div>
			</div>
			<div className='text-black text-center lg:text-left text-xl max-w-[300px] lg:max-w-none mx-auto mt-8 flex flex-col gap-4 lg:gap-5 lg:justify-center'>
				<p className='font-bold text-[1.375rem] project-title lg:text-2xl'>
					{title}
				</p>
				<p className='project-desc text-neutral-900 lg:text-[1.375rem]'>
					{desc}
				</p>
				<ul className='flex font-mono items-center text-[.8125rem] lg:text-sm gap-x-2 justify-center lg:justify-start flex-wrap project-stack text-neutral-800'>
					{stack.map((e, i) => {
						if (i === 0) {
							return <li key={i}>{e}</li>;
						} else {
							return (
								<li key={i}>
									<span className='mr-2'>∙</span>
									{e}
								</li>
							);
						}
					})}
				</ul>
				<div className='flex justify-center lg:justify-start lg:-translate-x-3 project-links'>
					{git === '' ? null : (
						<a
							href={git}
							target='_blank'
							rel='noopener noreferrer'
							aria-label='GitHub'
						>
							<Button strength={20} textStrength={10}>
								<svg
									viewBox='0 0 24 24'
									strokeWidth={2}
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='h-6 w-6 mx-3'
								>
									<path
										fill='none'
										stroke='none'
										d='M0 0h24v24H0z'
									></path>
									<path d='M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.5A4.6 4.6 0 0 0 18.7 6.3A4.2 4.2 0 0 0 18.6 3.1C18.6 3.1 17.5 2.8 15.1 4.4A12.3 12.3 0 0 0 8.9 4.4C6.5 2.8 5.4 3.1 5.4 3.1A4.2 4.2 0 0 0 5.3 6.3A4.6 4.6 0 0 0 4 9.5C4 14.1 6.7 15.2 9.5 15.5C8.9 16.1 8.9 16.7 9 17.5V21'></path>
								</svg>
								<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-black -bottom-2 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
							</Button>
						</a>
					)}
					{url === '' ? null : (
						<a
							href={url}
							target='_blank'
							rel='noopener noreferrer'
							aria-label='External'
						>
							<Button strength={20} textStrength={10}>
								<svg
									viewBox='0 0 24 24'
									strokeWidth={2}
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='h-6 w-6 mx-3'
								>
									<path
										fill='none'
										stroke='none'
										d='M0 0h24v24H0z'
									></path>
									<path d='M11 7H6A2 2 0 0 0 4 9V18A2 2 0 0 0 6 20H15A2 2 0 0 0 17 18V13M10 14L20 4M15 4L20 4L20 9'></path>
								</svg>
								<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-black -bottom-2 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
							</Button>
						</a>
					)}
				</div>
			</div>
		</div>
  );
};

export default Project;
