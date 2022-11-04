const Skill = ({ title, path, fillPath }) => {
	return (
		<div className={`bg-white flex items-center flex-col text-[clamp(.875rem,2vw,1.125rem)] tracking-wide text-neutral-900 font-semibold stroke-black fill-[rgba(0,0,0,0.1)] skill`}>
			<svg
				viewBox='0 0 24 24'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
				className='w-8 h-8'
			>
				<path fill='none' stroke='none' d='M0 0h24v24H0z' />
				<path className='stroke-inherit fill-transparent' d={path} />
				<path
					className='stroke-transparent fill-inherit '
					d={fillPath}
				/>
			</svg>
			<p>{title}</p>
		</div>
	);
};

export default Skill;
