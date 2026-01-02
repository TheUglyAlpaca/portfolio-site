import { useEffect, useRef } from 'react';

interface GameOfLifeProps {
    cellSize?: number;
    updateInterval?: number;
    opacity?: number;
    gridOpacity?: number;
}

const GameOfLife = ({
    cellSize = 20,
    updateInterval = 200,
    opacity = 0.08,
    gridOpacity = 0.08
}: GameOfLifeProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Store opacity values for each cell (0 to 1) for smooth transitions
    const cellOpacityRef = useRef<number[][]>([]);
    const gridRef = useRef<boolean[][]>([]);
    const animationRef = useRef<number | null>(null);
    const lastUpdateRef = useRef<number>(0);
    const lastRenderRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const fadeSpeed = 0.05; // How fast cells fade in/out per frame

        // Set canvas size to fill parent
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeGrid();
        };

        // Initialize grid with random cells
        const initializeGrid = () => {
            const cols = Math.ceil(canvas.width / cellSize);
            const rows = Math.ceil(canvas.height / cellSize);

            gridRef.current = [];
            cellOpacityRef.current = [];
            for (let y = 0; y < rows; y++) {
                gridRef.current[y] = [];
                cellOpacityRef.current[y] = [];
                for (let x = 0; x < cols; x++) {
                    // ~15% chance of cell being alive
                    const alive = Math.random() < 0.15;
                    gridRef.current[y][x] = alive;
                    cellOpacityRef.current[y][x] = alive ? 1 : 0;
                }
            }
        };

        // Count live neighbors
        const countNeighbors = (grid: boolean[][], x: number, y: number): number => {
            const rows = grid.length;
            const cols = grid[0].length;
            let count = 0;

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;

                    const ny = (y + dy + rows) % rows;
                    const nx = (x + dx + cols) % cols;

                    if (grid[ny][nx]) count++;
                }
            }
            return count;
        };

        // Update grid based on Game of Life rules
        const updateGrid = () => {
            const grid = gridRef.current;
            if (!grid.length) return;

            const rows = grid.length;
            const cols = grid[0].length;
            const newGrid: boolean[][] = [];

            for (let y = 0; y < rows; y++) {
                newGrid[y] = [];
                for (let x = 0; x < cols; x++) {
                    const neighbors = countNeighbors(grid, x, y);
                    const alive = grid[y][x];

                    // Game of Life rules
                    if (alive && (neighbors === 2 || neighbors === 3)) {
                        newGrid[y][x] = true;
                    } else if (!alive && neighbors === 3) {
                        newGrid[y][x] = true;
                    } else {
                        newGrid[y][x] = false;
                    }
                }
            }

            // Check if grid is stagnant (all dead) and reinitialize
            const hasAlive = newGrid.some(row => row.some(cell => cell));
            if (!hasAlive) {
                initializeGrid();
            } else {
                gridRef.current = newGrid;
            }
        };

        // Update cell opacities for smooth transitions
        const updateOpacities = () => {
            const grid = gridRef.current;
            const opacities = cellOpacityRef.current;
            if (!grid.length || !opacities.length) return;

            const rows = grid.length;
            const cols = grid[0].length;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const targetOpacity = grid[y][x] ? 1 : 0;
                    const currentOpacity = opacities[y][x];

                    if (currentOpacity < targetOpacity) {
                        opacities[y][x] = Math.min(1, currentOpacity + fadeSpeed);
                    } else if (currentOpacity > targetOpacity) {
                        opacities[y][x] = Math.max(0, currentOpacity - fadeSpeed);
                    }
                }
            }
        };

        // Draw grid lines
        const drawGrid = () => {
            if (!ctx) return;

            ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`;
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = 0; x <= canvas.width; x += cellSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y <= canvas.height; y += cellSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };

        // Render the grid
        const render = () => {
            const grid = gridRef.current;
            const opacities = cellOpacityRef.current;
            if (!grid.length || !opacities.length || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid lines first
            drawGrid();

            const rows = grid.length;
            const cols = grid[0].length;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const cellOpacity = opacities[y][x];
                    if (cellOpacity > 0.01) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${cellOpacity * opacity})`;
                        ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
                    }
                }
            }
        };

        // Animation loop
        const animate = (timestamp: number) => {
            // Update game state at slower interval
            if (timestamp - lastUpdateRef.current >= updateInterval) {
                updateGrid();
                lastUpdateRef.current = timestamp;
            }

            // Update opacities and render every frame for smooth animations
            if (timestamp - lastRenderRef.current >= 16) { // ~60fps
                updateOpacities();
                render();
                lastRenderRef.current = timestamp;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [cellSize, updateInterval, opacity, gridOpacity]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default GameOfLife;
