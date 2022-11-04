import Head from 'next/head';
import About from '../components/About';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Menu from '../components/Menu';
import { ScrollSmoother } from '../components/gsap';
import { useRef, useState } from 'react';
import useIsomorphicLayoutEffect from '../components/use-isomorpphic-layout-effect';
import Projects from '../components/Projects';
import disableSroll from 'disable-scroll';
import Contact from '../components/Contact';
import Background from '../components/Background';

export default function Home() {
  const smoother = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    smoother.current = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      ignoreMobileResize: true,
    });
    disableSroll.on();
  }, []);

  const scrollToSection = (id) => {
    smoother.current ? smoother.current.scrollTo(id, true, 'top 0') : null;
  };

  return (
		<div>
			<Head>
				<title>Luke Elder</title>
				<meta name='author' content='Luke Elder' />
				<meta
					name='description'
					content='Full stack software developer'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=5.0'
				/>
				<meta name='theme-color' content='#171717' />
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='font-nunito overflow-x-hidden'>
				<div id='smooth-wrapper'>
					<div id='smooth-content'>
						<div className='relative'>
							<Header
								scrollToSection={scrollToSection}
								open={menuOpen}
								setOpen={setMenuOpen}
							/>
							<Background />
						</div>
						<div className='bg-white'>
							<About />
							<Projects />
						</div>
						<Contact />
					</div>
				</div>
				<Loader scrollToSection={scrollToSection} />
				<Menu
					scrollToSection={scrollToSection}
					open={menuOpen}
					setOpen={setMenuOpen}
				/>
			</main>
		</div>
  );
}
