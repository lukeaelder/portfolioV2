import Button from './Button';

const Footer = () => {
	return (
		<section className='w-full flex relative px-[clamp(1.5rem,4vw,5rem)] gap-8 tracking-wide items-center py-12'>
			<div>
				<p className='text-xs text-neutral-500 mb-6'>VERSION</p>
				<p className='text-neutral-200'>v2 / 2022</p>
			</div>
			<div className='ml-auto'>
				<p className='text-xs text-neutral-500 mb-6'>LINKS</p>
				<div className='stroke-neutral-200 flex'>
					<a
						href='https://github.com/lukeaelder'
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
								/>
								<path d='M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.5A4.6 4.6 0 0 0 18.7 6.3A4.2 4.2 0 0 0 18.6 3.1C18.6 3.1 17.5 2.8 15.1 4.4A12.3 12.3 0 0 0 8.9 4.4C6.5 2.8 5.4 3.1 5.4 3.1A4.2 4.2 0 0 0 5.3 6.3A4.6 4.6 0 0 0 4 9.5C4 14.1 6.7 15.2 9.5 15.5C8.9 16.1 8.9 16.7 9 17.5V21' />
							</svg>
							<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white -bottom-2 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
						</Button>
					</a>
					<a
						href='https://www.linkedin.com/in/lukeaelder'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='LinkedIn'
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
								/>
								<path d='M16 16V13A2 2 0 0 0 12 13M12 16V11M8 8V8.001M8 11L8 16M6 4L18 4A2 2 0 0 1 20 6L20 18A2 2 0 0 1 18 20L6 20A2 2 0 0 1 4 18L4 6A2 2 0 0 1 6 4' />
							</svg>
							<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white -bottom-2 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
						</Button>
					</a>
					<a href='mailto:lukeaeld@gmail.com' aria-label='Email'>
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
								/>
								<path d='M3 8A2 2 0 0 1 5 6H19A2 2 0 0 1 21 8V17A2 2 0 0 1 19 19H5A2 2 0 0 1 3 17V8M3 9L10.5 13.5A3 3 0 0 0 13.5 13.5L21 9' />
							</svg>
							<span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white -bottom-2 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
						</Button>
					</a>
				</div>
			</div>
		</section>
	);
};

export default Footer;
