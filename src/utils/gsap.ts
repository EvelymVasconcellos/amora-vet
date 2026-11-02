import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'power3.out' });
// Evita "saltos" quando a barra de endereço do mobile aparece/some
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
