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
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
    angle: number;
}

const StarField: React.FC<StarFieldProps> = ({ isActive }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const starsRef = useRef<Star[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);
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
        const starCount = 150;
        const stars: Star[] = [];
        const colors = [
            '255, 255, 255', // White
            '173, 216, 230', // Light Blue
            '255, 253, 208', // Cream
            '230, 190, 255', // Soft Purple
            '255, 223, 186', // Soft Peach
        ];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                flickerSpeed: 0.001 + Math.random() * 0.002,
                phase: Math.random() * Math.PI * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        starsRef.current = stars;
    };

    const createShootingStar = (width: number, height: number) => {
        return {
            x: Math.random() * width,
            y: Math.random() * height * 0.5,
            length: 50 + Math.random() * 100,
            speed: 10 + Math.random() * 15,
            opacity: 1,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 degrees
        };
    };

    const animate = (time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const currentGlobalOpacity = globalOpacityRef.current;

        if (currentGlobalOpacity > 0) {
            // Draw Stars
            starsRef.current.forEach((star) => {
                const currentOpacity = (Math.sin(time * star.flickerSpeed + star.phase) + 1) / 2 * star.opacity * currentGlobalOpacity;
                ctx.fillStyle = `rgba(${star.color}, ${currentOpacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Shooting Stars - Reduced frequency
            if (Math.random() < 0.001 && shootingStarsRef.current.length < 1) {
                shootingStarsRef.current.push(createShootingStar(canvas.width, canvas.height));
            }

            shootingStarsRef.current = shootingStarsRef.current.filter((s) => s.opacity > 0);
            shootingStarsRef.current.forEach((s) => {
                ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity * currentGlobalOpacity})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x + Math.cos(s.angle) * s.length, s.y + Math.sin(s.angle) * s.length);
                ctx.stroke();

                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.02;
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
