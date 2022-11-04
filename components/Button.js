import { gsap } from './gsap';

const Button = ({
  children,
  strength = 100,
  textStrength = 50,
  xOff = 0,
  classes,
}) => {
  const handleMouseLeave = (e) => {
    if (window.innerWidth > 540) {
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'elastic.out',
      });
      gsap.to(e.currentTarget.children[0], {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'elastic.out',
      });
    }
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth > 540) {
      const bounding = e.currentTarget.getBoundingClientRect();
      gsap.to(e.currentTarget, {
        x:
          ((e.clientX - bounding.left) / e.currentTarget.offsetWidth - 0.5) *
          strength,
        y:
          ((e.clientY - bounding.top) / e.currentTarget.offsetHeight - 0.5) *
          strength,
        rotate: '0.001deg',
        ease: 'power4.out',
        duration: 1.5,
      });
      gsap.to(e.currentTarget.children[0], {
        x:
          ((e.clientX - bounding.left) / e.currentTarget.offsetWidth - 0.5) *
            textStrength +
          xOff,
        y:
          ((e.clientY - bounding.top) / e.currentTarget.offsetHeight - 0.5) *
          textStrength,
        ease: 'power4.out',
        duration: 1.5,
      });
    }
  };

  return (
    <div
      onMouseLeave={(e) => handleMouseLeave(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      className={`cursor-pointer relative group ${classes}`}
    >
      {children}
    </div>
  );
};

export default Button;
