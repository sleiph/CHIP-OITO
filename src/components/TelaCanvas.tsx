import { useEffect, useRef } from 'react';
import { pegarCor } from '../services/Display';

interface TelaCanvasProps {
  display: Array<Array<number>>;
}

function TelaCanvas({ display }: TelaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastDisplayRef = useRef<Array<Array<number>> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas)
      return;

    const ctx = canvas.getContext('2d');
    if (!ctx)
      return;

    if (!lastDisplayRef.current || !arraysEqual(display, lastDisplayRef.current)) {
      ctx.fillStyle = pegarCor(1);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = pegarCor(0);
      const pixelWidth = canvas.width / 64;
      const pixelHeight = canvas.height / 32;

      for (let y = 0; y < 32; y++) {
        for (let x = 0; x < 64; x++) {
          if (display[y][x] === 1) {
            ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
          }
        }
      }

      lastDisplayRef.current = display.map(row => [...row]);
    }
  }, [display]);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={320}
      style={{
        height: '70vh',
        margin: '2vh',
        backgroundColor: pegarCor(1),
        imageRendering: 'pixelated'
      }}
    />
  );
}

function arraysEqual(a: Array<Array<number>> | null, b: Array<Array<number>> | null): boolean {
  if (!a && !b)
    return true;
  if (!a || !b)
    return false;
  
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j])
        return false;
    }
  }
  return true;
}

export default TelaCanvas;
