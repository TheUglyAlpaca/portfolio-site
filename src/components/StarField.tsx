import React, { useEffect, useRef, useState } from 'react';

interface StarFieldProps {
    isActive: boolean;
}

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    flickerSpeed: number;
    phase: number;
    color: string;
    scrollSpeed: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
    angle: number;
}

interface Planet {
    x: number;
    y: number;
    size: number;
    color: string;
    hasRing: boolean;
    ringColor: string;
    ringAngle: number;
    speed: number;
    angle: number;
    curveSpeed: number;
    depth: number;
}


const StarField: React.FC<StarFieldProps> = ({ isActive }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const starsRef = useRef<Star[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);
    const planetsRef = useRef<Planet[]>([]);
    const [globalOpacity, setGlobalOpacity] = useState(0);
    const globalOpacityRef = useRef(0);
    const requestRef = useRef<number>();

    // Sync ref with state for the animation loop
    useEffect(() => {
        globalOpacityRef.current = globalOpacity;
    }, [globalOpacity]);

    // Handle global opacity for fade in/out
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isActive) {
            interval = setInterval(() => {
                setGlobalOpacity((prev) => Math.min(prev + 0.05, 1));
            }, 50);
        } else {
            interval = setInterval(() => {
                setGlobalOpacity((prev) => Math.max(prev - 0.05, 0));
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const initStars = (width: number, height: number) => {
        const starCount = 800;
        const stars: Star[] = [];
        const colors = [
            '255, 255, 255', // White
            '173, 216, 230', // Light Blue
            '255, 253, 208', // Cream
            '230, 190, 255', // Soft Purple
            '255, 223, 186', // Soft Peach
            '255, 182, 193', // Light Pink
            '135, 206, 235', // Sky Blue
            '255, 160, 122', // Light Salmon
            '221, 160, 221', // Plum
            '152, 251, 152', // Pale Green
        ];
        for (let i = 0; i < starCount; i++) {
            // diverse depths: 
            // deep background: slow speed, small size
            // foreground: faster speed, larger size
            const depth = Math.random();
            const scrollSpeed = depth * 0.12 + 0.02; // Range: 0.02 - 0.14
            const size = (depth * 1.5) + 0.5; // Range: 0.5 - 2.0

            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: size,
                opacity: 0.5 + Math.random() * 0.5,
                flickerSpeed: 0.001 + Math.random() * 0.002,
                phase: Math.random() * Math.PI * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                scrollSpeed: scrollSpeed,
            });
        }
        starsRef.current = stars;
    };

    const createShootingStar = (width: number, height: number, scrollOffset: number) => {
        return {
            x: Math.random() * width,
            y: Math.random() * height * 0.5 + scrollOffset,
            length: 100 + Math.random() * 80,
            speed: 25 + Math.random() * 20,
            opacity: 1,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 degrees
        };
    };

    const createPlanet = (width: number, height: number, scrollOffset: number): Planet => {
        const size = 2 + Math.random() * 4; // Very small: 2-6 radius
        const depth = 0.05 + Math.random() * 0.15;

        const colors = [
            '#E6B89C', // Mars-ish
            '#88B04B', // Earth-ish
            '#92A8D1', // Neptune-ish
            '#F7CAC9', // Jupiter-ish
            '#FF6F61', // Coral
            '#6B5B95', // Purple
            '#955251', // Reddish
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const hasRing = Math.random() < 0.2; // 20% chance of ring
        const ringColor = 'rgba(255, 255, 255, 0.4)';
        const ringAngle = Math.random() * Math.PI;

        // Spawn logic
        const side = Math.floor(Math.random() * 4);
        let x, y, angle;
        const speed = 0.1 + Math.random() * 0.3; // Slow drift
        const curveSpeed = (Math.random() - 0.5) * 0.002; // Slight curve

        switch (side) {
            case 0: // Top
                x = Math.random() * width;
                y = -size * 4 + (scrollOffset * depth);
                angle = Math.PI / 2 + (Math.random() - 0.5) * 0.5; // Downwards ±
                break;
            case 1: // Right
                x = width + size * 4;
                y = Math.random() * height + (scrollOffset * depth);
                angle = Math.PI + (Math.random() - 0.5) * 0.5; // Leftwards ±
                break;
            case 2: // Bottom
                x = Math.random() * width;
                y = height + size * 4 + (scrollOffset * depth);
                angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5; // Upwards ±
                break;
            case 3: // Left
                x = -size * 4;
                y = Math.random() * height + (scrollOffset * depth);
                angle = (Math.random() - 0.5) * 0.5; // Rightwards ±
                break;
            default:
                x = 0; y = 0; angle = 0;
        }

        return {
            x,
            y,
            size,
            color,
            hasRing,
            ringColor,
            ringAngle,
            speed,
            angle,
            curveSpeed,
            depth
        };
    };


    const animate = (time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);


        const currentGlobalOpacity = globalOpacityRef.current;
        const scrollY = window.scrollY;

        // Shooting stars can exist in the "middle" ground
        const shootingStarParallax = scrollY * 0.1;

        if (currentGlobalOpacity > 0) {
            // Draw Stars
            starsRef.current.forEach((star) => {
                const currentOpacity = (Math.sin(time * star.flickerSpeed + star.phase) + 1) / 2 * star.opacity * currentGlobalOpacity;
                ctx.fillStyle = `rgba(${star.color}, ${currentOpacity})`;
                ctx.beginPath();

                // Apply individual parallax offset and wrap around
                const parallaxOffset = scrollY * star.scrollSpeed;
                let visualY = (star.y - parallaxOffset) % canvas.height;
                if (visualY < 0) visualY += canvas.height;

                ctx.arc(star.x, visualY, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Shooting Stars - Reduced frequency
            if (Math.random() < 0.001 && shootingStarsRef.current.length < 1) {
                shootingStarsRef.current.push(createShootingStar(canvas.width, canvas.height, shootingStarParallax));
            }

            shootingStarsRef.current = shootingStarsRef.current.filter((s) => s.opacity > 0);
            shootingStarsRef.current.forEach((s) => {
                const startY = s.y - shootingStarParallax;
                const endX = s.x + Math.cos(s.angle) * s.length;
                const endY = (s.y + Math.sin(s.angle) * s.length) - shootingStarParallax;

                const gradient = ctx.createLinearGradient(s.x, startY, endX, endY);
                gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * currentGlobalOpacity})`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(s.x, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();

                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.02;
            });

            // Draw Planets
            if (Math.random() < 0.0008 && planetsRef.current.length < 2) {
                planetsRef.current.push(createPlanet(canvas.width, canvas.height, scrollY));
            }

            // Filter
            planetsRef.current = planetsRef.current.filter((p) => {
                const parallaxY = scrollY * p.depth;
                const visualY = p.y - parallaxY;
                return (
                    visualY > -100 &&
                    visualY < canvas.height + 100 &&
                    p.x > -100 &&
                    p.x < canvas.width + 100
                );
            });

            planetsRef.current.forEach((p) => {
                const parallaxY = scrollY * p.depth;
                const visualY = p.y - parallaxY;

                ctx.save();
                ctx.translate(p.x, visualY);

                // Draw Ring Background (Back half)
                if (p.hasRing) {
                    ctx.save();
                    ctx.rotate(p.ringAngle);
                    ctx.beginPath();
                    ctx.ellipse(0, 0, p.size * 2.5, p.size * 0.6, 0, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * currentGlobalOpacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.restore();
                }

                // Draw Planet Body
                ctx.beginPath();
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color; // Opacity applied via global check if needed, but solid color is fine
                ctx.globalAlpha = currentGlobalOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;

                // Simple Shadow
                ctx.beginPath();
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
                grad.addColorStop(0, 'rgba(255,255,255,0.2)');
                grad.addColorStop(1, 'rgba(0,0,0,0.5)');
                ctx.fillStyle = grad;
                ctx.globalAlpha = currentGlobalOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;

                ctx.restore();

                // Update position with curve
                p.angle += p.curveSpeed;
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed;
            });
        }


        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars(canvas.width, canvas.height);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[0]"
            style={{ opacity: globalOpacity }}
        />
    );
};

export default StarField;
