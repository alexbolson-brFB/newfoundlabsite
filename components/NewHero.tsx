import React, { useEffect } from 'react';
import { motion, Variants, useScroll, useTransform, useAnimation } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import MagneticButton from './MagneticButton';
import heroVisual from '../images/hero_visual.webp';

// --- Animation Variants ---

// 1. Title Container (Orchestrates the sequence)
const titleContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Word stagger
      delayChildren: 0.2
    }
  }
};

// 2. Subtitle Container (Rapid Data Stream)
const subtitleContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Word stagger
      delayChildren: 1.0    // Start after title
    }
  }
};

// 3. Title Word (Orchestrator for letters)
const titleWordVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Letter stagger
    }
  }
};

// 4. Subtitle Word (The word itself animates)
const subtitleSimpleWordVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// 5. Title Letter Entrance Physics (The Teleport Snap)
const teleportEntranceVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 2.0, 
    y: -20,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1, 
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for "Snap"
    }
  }
};

const buttonContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 2.2
    }
  }
};

// --- Specialized Component: TeleportLetter ---
const TeleportLetter: React.FC<{ 
  char: string; 
  enableGlitch: boolean;
  customVariants?: Variants;
}> = ({ char, enableGlitch, customVariants }) => {
  const glitchControls = useAnimation();
  
  useEffect(() => {
    if (!enableGlitch) return;

    let isMounted = true;
    let startTimeout: ReturnType<typeof setTimeout> | undefined;
    let loopTimeout: ReturnType<typeof setTimeout> | undefined;

    const triggerGlitch = async () => {
      if (!isMounted) return;
      await glitchControls.start({
        opacity: [1, 0.85, 1],
        x: [0, -0.5, 0.5, 0],
        filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
        transition: { duration: 0.25, times: [0, 0.2, 1] }
      });
    };

    const scheduleLoop = () => {
      const nextGlitchIn = 6000 + Math.random() * 8000;
      loopTimeout = setTimeout(async () => {
        await triggerGlitch();
        if (!isMounted) return;
        scheduleLoop();
      }, nextGlitchIn);
    };

    const startDelay = 2000 + Math.random() * 3000;
    startTimeout = setTimeout(async () => {
      await triggerGlitch();
      if (!isMounted) return;
      scheduleLoop();
    }, startDelay);

    return () => {
      isMounted = false;
      if (startTimeout) clearTimeout(startTimeout);
      if (loopTimeout) clearTimeout(loopTimeout);
      glitchControls.stop();
    };
  }, [enableGlitch, glitchControls]);

  return (
    <motion.span
      variants={customVariants || teleportEntranceVariants}
      className="inline-block origin-center will-change-transform"
    >
      <motion.span animate={glitchControls} className="inline-block">
        {char}
      </motion.span>
    </motion.span>
  );
};

// --- Reusable Animated Text Component ---
interface AnimatedTextProps {
  text: string;
  className?: string;
  containerVariants?: Variants;
  wordVariants?: Variants;
  letterVariants?: Variants;
  mode?: "letter" | "word";
  enableGlitch?: boolean;
}

const AnimatedText = React.memo<AnimatedTextProps>(({ 
  text, 
  className = "", 
  containerVariants = titleContainerVariants,
  wordVariants = titleWordVariants, 
  letterVariants,
  mode = "letter",
  enableGlitch = false
}) => (
  <motion.span 
    className={`inline-flex flex-wrap ${className}`}
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {text.split(" ").map((word, wIndex) => (
      <motion.span 
        key={wIndex} 
        variants={mode === "word" ? subtitleSimpleWordVariant : wordVariants} 
        className="inline-flex whitespace-pre overflow-visible" 
      >
        {mode === "letter" ? (
          <>
            {word.split("").map((char, cIndex) => (
              <TeleportLetter 
                key={`${wIndex}-${cIndex}`} 
                char={char} 
                enableGlitch={enableGlitch}
                customVariants={letterVariants}
              />
            ))}
          </>
        ) : (
          <span className="inline-block">{word}</span>
        )}
        <span className="inline-block">&nbsp;</span>
      </motion.span>
    ))}
  </motion.span>
));

const NewHero: React.FC = () => {
  const { scrollY } = useScroll();
  const { t, language } = useLanguage();
  
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);
  const backgroundOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const textY = useTransform(scrollY, [0, 500], [0, 50]); // Subtle parallax for text
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]); // Fade text out on scroll

  return (
    <>
      <section className="relative isolate min-h-screen flex flex-col justify-center bg-slate-50 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        
        {/* === BACKGROUND === */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Noise Texture for Texture/Grain */}
          <div className="absolute inset-0 bg-slate-50" aria-hidden="true"></div>
          <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          
          {/* Subtle Grid */}
          <div 
             className="absolute inset-0 opacity-[0.3]"
             aria-hidden="true"
             style={{
               backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)`,
               backgroundSize: "60px 60px",
               maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)"
             }}
          />
          
          {/* Ambient Gold Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] bg-gold-400/5 blur-[120px] rounded-full mix-blend-multiply" aria-hidden="true" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50/80" aria-hidden="true"></div>
        </div>
        
        {/* === CONTENT === */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            
            {/* --- Text Content --- */}
            <motion.div 
              style={{ y: textY, opacity: textOpacity }}
              className="text-center lg:text-left lg:col-span-3"
            >
                <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-navy-900 leading-[1.1] mb-8 font-medium tracking-tight break-words">
                  <div className="block">
                    <AnimatedText 
                        key={`title1-${language}`}
                        text={t.hero.title1} 
                        containerVariants={titleContainerVariants} 
                        wordVariants={titleWordVariants}
                        mode="letter"
                        enableGlitch={true}
                     />
                  </div>
                  <div className="block mt-1">
                     <span className="italic text-slate-500 font-light inline-block">
                       <AnimatedText 
                          key={`title2-${language}`}
                          text={t.hero.title2} 
                          containerVariants={titleContainerVariants} 
                          wordVariants={titleWordVariants}
                          mode="letter"
                          enableGlitch={true}
                       />
                     </span>
                  </div>
                </h1>

                <div className="max-w-xl mx-auto lg:mx-0 mb-10 text-base md:text-lg text-slate-600 font-light leading-relaxed">
                   <AnimatedText 
                      key={`subtitle-${language}`}
                      text={t.hero.subtitle} 
                      containerVariants={subtitleContainerVariants} 
                      mode="word" 
                      enableGlitch={false}
                   />
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  variants={buttonContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                    <MagneticButton href="#contact-form" strength={0.2}>
                        <div className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-navy-900 text-white font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-navy-800 transition-all shadow-glow rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-gold">
                            {t.hero.cta1}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    </MagneticButton>
                    
                    <MagneticButton href="#whitepaper" strength={0.2}>
                        <div className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-slate-300 text-navy-900 font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:border-navy-900 transition-colors duration-300 rounded-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gold">
                            {t.hero.cta2}
                        </div>
                    </MagneticButton>
                </motion.div>
            </motion.div>

            {/* --- Visual Content --- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full max-w-md mx-auto lg:col-span-2"
            >
               <video 
                  src="/hero_visual.webm" 
                  poster={heroVisual}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-auto object-contain drop-shadow-2xl" 
                  aria-label="FoundLab infrastructure visualization"
               />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.a 
          aria-label={t.hero.scroll}
          href="#the-paradox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 5, 0] }}
          transition={{ 
              opacity: { delay: 3, duration: 1 },
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer group"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold group-hover:text-navy-900 transition-colors">{t.hero.scroll}</span>
          <ChevronDown className="w-4 h-4 text-slate-400 opacity-70 group-hover:text-navy-900 transition-colors" />
        </motion.a>
      </section>
    </>
  );
};

export default NewHero;
