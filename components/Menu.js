import { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { gsap, ScrollTrigger } from './gsap';
import disableScroll from 'disable-scroll';
import useIsomorphicLayoutEffect from './use-isomorpphic-layout-effect';

const Menu = ({ scrollToSection, open, setOpen }) => {
  const el = useRef();
  const [menuBtn, setMenuBtn] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el.current,
        start: 'bottom 60%',
        end: '+=0',
        scrub: true,
        onEnter: () => setMenuBtn(2),
        onEnterBack: () => setMenuBtn(0),
      });
      gsap.set('.line-1', {
        rotate: 0,
        translateY: -4,
      });
      gsap.set('.line-2', {
        rotate: 0,
        translateY: 4,
      });
    }, el);
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (menuBtn === 0) {
      gsap.to('.btn-nav', {
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
      });
    }
    if (menuBtn === 1 || menuBtn === 2) {
      gsap.to('.btn-nav', {
        scale: 1,
        duration: 0.3,
        ease: 'back.out',
      });
    }
  }, [menuBtn]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!open) {
        if (menuBtn === 1) setMenuBtn(0);
        gsap.to('.line-1', {
          rotate: 0,
          translateY: -4,
          duration: 0.6,
          ease: 'power2.out',
        });
        gsap.to('.line-2', {
          rotate: 0,
          translateY: 4,
          duration: 0.6,
          ease: 'power2.out',
        });
        gsap.to('.menu-nav', {
          translateX: '150%',
          duration: 0.6,
          ease: 'power2.inOut',
        });
        gsap.to('.menu-nav-rnd', {
          scaleX: 1,
          ease: 'power2.inOut',
          duration: 0.6,
        });
        gsap.to('.nav-link-1', {
          translateX: 80,
          ease: 'power3.inOut',
          duration: 0.6,
        });
        gsap.to('.nav-link-2', {
          translateX: 100,
          ease: 'power3.inOut',
          duration: 0.6,
        });
        gsap.to('.nav-link-3', {
          translateX: 120,
          ease: 'power3.inOut',
          duration: 0.6,
        });
        gsap.to('.nav-social-1', {
          translateX: 60,
          ease: 'power2.inOut',
          duration: 0.6,
        });
        gsap.to('.nav-social-2', {
          translateX: 80,
          ease: 'power2.inOut',
          duration: 0.6,
        });
        gsap.to('.nav-social-3', {
          translateX: 100,
          ease: 'power2.inOut',
          duration: 0.6,
        });
        gsap.to('.nav-line', {
          scaleX: 0,
          ease: 'power2.inOut',
          duration: 0.6,
        });
      }
      if (open) {
        if (menuBtn === 0) setMenuBtn(1);
        gsap.to('.line-1', {
          rotate: 225,
          translateY: 0,
          duration: 0.6,
          ease: 'back.out',
        });
        gsap.to('.line-2', {
          rotate: 135,
          translateY: 0,
          duration: 0.6,
          ease: 'back.out',
        });
        gsap.to('.menu-nav', {
          translateX: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
        gsap.to('.menu-nav-rnd', {
          scaleX: 0,
          ease: 'power2.out',
          duration: 0.6,
        });
        gsap.to('.nav-link-1', {
          translateX: 0,
          ease: 'power2.out',
          duration: 0.8,
        });
        gsap.to('.nav-link-2', {
          translateX: 0,
          ease: 'power2.out',
          duration: 1,
        });
        gsap.to('.nav-link-3', {
          translateX: 0,
          ease: 'power2.out',
          duration: 1.1,
        });
        gsap.to('.nav-social-1', {
          translateX: 0,
          ease: 'power2.out',
          duration: 0.8,
        });
        gsap.to('.nav-social-2', {
          translateX: 0,
          ease: 'power2.out',
          duration: 1.1,
        });
        gsap.to('.nav-social-3', {
          translateX: 0,
          ease: 'power2.out',
          duration: 1.2,
        });
        gsap.to('.nav-line', {
          scaleX: 1,
          ease: 'power2.out',
          duration: 0.9,
        });
      }
    }, el);
  }, [open]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      disableScroll.off();
      setOpen(false);
    }
  };

  const updateMenu = () => {
    setOpen(!open);
    open ? disableScroll.off() : disableScroll.on();
  };

  const handleMouseDown = () => {
    if (menuBtn === 2) {
      const ctx = gsap.context(() => {
        gsap.to('.btn-nav', {
          scale: 0.85,
          duration: 0.5,
          ease: 'power4.out',
        });
      }, el);
    }
  };

  const handleMouseUp = () => {
    if (menuBtn === 2) {
      const ctx = gsap.context(() => {
        gsap.to('.btn-nav', {
          scale: 1,
          duration: 1,
          ease: 'elastic.out',
        });
      }, el);
    }
  };

  const handleScroll = (secitonId) => {
    setOpen(false);
    disableScroll.off();
    scrollToSection(secitonId);
  };

  return (
    <div
      ref={el}
      className={`fixed top-0 left-0 w-full h-screen z-10 pointer-events-none min-h-screen`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full transition-colors duration-500 ${
          open ? 'pointer-events-auto bg-black/10' : 'pointer-events-none'
        }`}
        onClick={() => updateMenu()}
      ></div>
      <div className='absolute top-0 right-0 h-full w-full max-w-[36rem] bg-neutral-900 menu-nav border-l-[1px] border-neutral-900 md:border-neutral-600 pointer-events-auto'>
        <div className='h-[120vh] absolute top-[-10vh] left-0 -translate-x-1/2 bg-neutral-900 rounded-[100%_100%] w-[100%] menu-nav-rnd'></div>
        <div className='w-full h-full px-[5vw] pt-[20vh] pb-[15vh] md:pb-[10vh] flex flex-col justify-between overflow-y-scroll'>
          <div className='text-[clamp(2.5rem,10vw,3.75rem)]'>
            <div className='w-full h-[1px] bg-neutral-700 flex-grow mb-8 nav-line origin-right'></div>
            <Button
              strength={20}
              textStrength={10}
              classes='py-[clamp(.5rem,1vh,1.5rem)] nav-link-1'
              xOff={24}
            >
              <span
                className='btn-text absolute top-0 left-0 px-5 py-[clamp(.5rem,1vh,1.5rem)] select-none w-full'
                onClick={() => handleScroll('#about')}
              >
                About Me
              </span>
              <span className='p-5 py-[clamp(.5rem,1vh,1.5rem)] text-transparent'>
                About Me
              </span>
              <div className='w-3 h-3 bg-white rounded-full origin-center absolute top-1/2 -translate-y-1/2 md:left-0 scale-0 transition group-hover:scale-100 right-[5vw]'></div>
            </Button>
            <Button
              strength={20}
              textStrength={10}
              classes='py-[clamp(.5rem,1vh,1.5rem)] nav-link-2'
              xOff={24}
            >
              <span
                className='btn-text absolute top-0 left-0 px-5 py-[clamp(.5rem,1vh,1.5rem)] select-none w-full'
                onClick={() => handleScroll('#projects')}
              >
                Projects
              </span>
              <span className='p-5 py-[clamp(.5rem,1vh,1.5rem)] text-transparent'>
                Projects
              </span>
              <div className='w-3 h-3 bg-white rounded-full origin-center absolute top-1/2 -translate-y-1/2 md:left-0 scale-0 transition group-hover:scale-100 right-[5vw]'></div>
            </Button>
            <Button
              strength={20}
              textStrength={10}
              classes='py-[clamp(.5rem,1vh,1.5rem)] nav-link-3'
              xOff={24}
            >
              <span
                className='btn-text absolute top-0 left-0 px-5 py-[clamp(.5rem,1vh,1.5rem)] select-none w-full'
                onClick={() => handleScroll('#contact')}
              >
                Contact
              </span>
              <span className='p-5 py-[clamp(.5rem,1vh,1.5rem)] text-transparent'>
                Contact
              </span>
              <div className='w-3 h-3 bg-white rounded-full origin-center absolute top-1/2 -translate-y-1/2 md:left-0 scale-0 transition group-hover:scale-100 right-[5vw]'></div>
            </Button>
          </div>
          <div className='flex font-light tracking-wide text-lg nav-social flex-wrap'>
            <div className='w-full h-[1px] bg-neutral-700 flex-grow mb-2 mt-6 nav-line origin-right'></div>
            <Button
              strength={15}
              textStrength={7.5}
              classes='nav-social-1 py-5'
            >
              <a
                href='https://github.com/lukeaelder'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub'
                className='btn-text absolute top-0 left-0 px-5 py-5'
              >
                GitHub
              </a>
              <span className='p-5 text-transparent'>GitHub</span>
              <span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white bottom-0 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
            </Button>
            <Button
              strength={15}
              textStrength={7.5}
              classes='nav-social-2 py-5'
            >
              <a
                href='https://www.linkedin.com/in/lukeaelder'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
                className='btn-text absolute top-0 left-0 px-5 py-5'
              >
                LinkedIn
              </a>
              <span className='p-5 text-transparent'>LinkedIn</span>
              <span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white bottom-0 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
            </Button>
            <Button
              strength={15}
              textStrength={7.5}
              classes='nav-social-3 py-5'
            >
              <a
                href='mailto:lukeaeld@gmail.com'
                aria-label='Email'
                className='btn-text absolute top-0 left-0 px-5 py-5'
              >
                Email
              </a>
              <span className='p-5 text-transparent'>Email</span>
              <span className='absolute w-1/2 scale-x-0 group-hover:scale-x-100 h-[2px] rounded-full bg-white bottom-0 left-1/2 transition -translate-x-1/2 -translate-y-1 group-hover:translate-y-0'></span>
            </Button>
          </div>
        </div>
      </div>
      <div
        className='absolute top-[clamp(1rem,4vw,2rem)] right-[clamp(1.5rem,4vw,3rem)] pointer-events-auto group btn-nav'
        onMouseDown={() => handleMouseDown()}
        onMouseUp={() => handleMouseUp()}
        onMouseLeave={() => handleMouseUp()}
      >
        <Button strength={60} textStrength={30}>
          <div className=' pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div
              className={`line-1 bg-neutral-400 group-hover:bg-white transition-colors h-[2px] w-5 rounded-full absolute pointer-events-none ${
                open ? '!bg-white' : ''
              }`}
            ></div>
            <div
              className={`line-2 bg-neutral-400 group-hover:bg-white transition-colors h-[2px] w-5 rounded-full pointer-events-none ${
                open ? '!bg-white' : ''
              }`}
            ></div>
          </div>
          <div
            className={`md:w-24 md:h-24 w-[4.5rem] h-[4.5rem] rounded-full bg-neutral-900 group-hover:bg-indigo-500 transition-colors border-[1px] border-neutral-600 group-hover:border-indigo-500 pointer-events-auto cursor-pointer ${
              open ? '!bg-indigo-500 !border-indigo-500' : ''
            }`}
            onClick={() => updateMenu()}
          ></div>
        </Button>
      </div>
    </div>
  );
};

export default Menu;
