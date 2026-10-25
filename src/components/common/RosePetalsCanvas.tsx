import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  opacity: number;
  color: string;
}

interface RosePetalsCanvasProps {
  enabled?: boolean;
}

export const RosePetalsCanvas: React.FC<RosePetalsCanvasProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle luxury romantic color palette for petals
    const petalColors = [
      'rgba(247, 197, 192, ', // Soft blush pink
      'rgba(238, 168, 168, ', // Romantic rose
      'rgba(224, 137, 147, ', // Deep rose
      'rgba(248, 222, 218, ', // Cream petal
      'rgba(214, 110, 126, ', // Rose accent
    ];

    const petalCount = window.innerWidth < 640 ? 18 : 32;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 12 + 10,
        speedX: Math.random() * 1.2 - 0.6,
        speedY: Math.random() * 0.9 + 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.45 + 0.4,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.sin(p.tilt));

      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.25)';
      ctx.shadowBlur = 4;

      // Realistic curved rose petal path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
      ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
      ctx.fill();

      // Subtle delicate center petal vein
      ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.35})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(p.size * 0.1, p.size * 0.5, 0, p.size * 0.85);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(p.tilt) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};
