import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const headlineRef = useRef(null);
    const statsRef = useRef([]);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Headline Stagger (Premium letter reveal)
            const letters = headlineRef.current.querySelectorAll(".letter");

            gsap.from(letters, {
                opacity: 0,
                y: 80,
                stagger: 0.05,
                duration: 1,
                ease: "power3.out",
            });

            // Stats stagger animation
            gsap.from(statsRef.current, {
                opacity: 0,
                y: 40,
                stagger: 0.25,
                delay: 0.6,
                duration: 1,
                ease: "power3.out",
            });

            // Scroll-Driven Animation
            gsap.to(imageRef.current, {
                y: -300,
                scale: 1.15,
                rotate: 2,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true, // ties animation to scroll progress (VERY IMPORTANT)
                },
            });

            // Subtle parallax for headline (premium feel)
            gsap.to(headlineRef.current, {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const text = "WELCOME ITZ FIZZ";

    return (
        <section
            ref={heroRef}
            className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-start pt-24"
        >
            {/* Headline with letter spacing */}
            <h1
                ref={headlineRef}
                className="text-5xl md:text-7xl font-bold tracking-[0.6em] text-center"
            >
                {text.split("").map((char, index) => (
                    <span key={index} className="letter inline-block">
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h1>

            {/* Stats Section */}
            <div className="flex gap-12 mt-12">
                {[
                    { value: "98%", label: "Smooth Animation" },
                    { value: "120+", label: "UI Projects" },
                    { value: "24/7", label: "Performance" },
                ].map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => (statsRef.current[index] = el)}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-semibold">{item.value}</h2>
                        <p className="text-gray-400 text-sm tracking-wider">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Visual (Car) */}
            <div className="absolute z-0 -bottom-45 left-1/2 -translate-x-1/2 
                w-225 md:w-300 lg:w-350 
                will-change-transform pointer-events-none select-none">
                <img
                    ref={imageRef}
                    src="/scroll-hero-section/car.png"
                    alt="car"
                    className="w-full h-auto object-contain select-none"
                />
            </div>
        </section>
    );
};

export default Hero;
