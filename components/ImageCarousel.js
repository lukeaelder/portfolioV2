import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const ImageCarousel = ({ images }) => {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [
		Autoplay({
			delay: 10000,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
		}),
	]);

	return (
		<div className='embla overflow-hidden' ref={emblaRef}>
			<div className='embla__container flex'>
				{images.map((e, i) => (
					<div key={i} className='relative flex-[0_0_100%]'>
						<div className='object-cover rounded-xl w-full h-full relative'>
							<Image
								src={e}
								alt='Project Image'
								width='640px'
								height='330px'
								objectFit='contain'
								layout='responsive'
								priority={true}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ImageCarousel;
