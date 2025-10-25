import React, { useEffect, useRef } from "react";

interface BagelMiniProps {
  speed?: number; // Speed of the animation
  scrollWithPage?: boolean; // Whether the bagel scrolls with the page
}

const BagelMini: React.FC<BagelMiniProps> = ({ speed = 1, scrollWithPage = false }) => {
  const canvasRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let A = 0;
    let B = 0;

    const renderFrame = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const height = Math.floor(window.innerHeight * 0.8 / 5); // Use 80% of viewport height
      const width = Math.floor(height * aspectRatio * 4); // Maintain aspect ratio
      const z: number[] = new Array(width * height).fill(0);
      const b: string[] = new Array(width * height).fill(" ");

      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          const sini = Math.sin(i);
          const cosj = Math.cos(j);
          const sinA = Math.sin(A);
          const sinj = Math.sin(j);
          const cosA = Math.cos(A);
          const cosj2 = cosj + 2;
          const mess = 1 / (sini * cosj2 * sinA + sinj * cosA + 5);
          const cosi = Math.cos(i);
          const cosB = Math.cos(B);
          const sinB = Math.sin(B);
          const t = sini * cosj2 * cosA - sinj * sinA;

          const x = Math.floor(width / 2 + (width / 4) * mess * (cosi * cosj2 * cosB - t * sinB));
          const y = Math.floor(
            height / 2 + (height / 4) * mess * (cosi * cosj2 * sinB + t * cosB)
          );
          const o = x + width * y;
          const N = Math.floor(
            8 *
              ((sinj * sinA - sini * cosj * cosA) * cosB -
                sini * cosj * sinA -
                sinj * cosA -
                cosi * cosj * sinB)
          );

          if (y > 0 && y < height && x > 0 && x < width && mess > z[o]) {
            z[o] = mess;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }

      if (canvasRef.current) {
        const frame = b.reduce((acc, char, index) => {
          return acc + (index % width === width - 1 ? char + "\n" : char);
        }, "");
        canvasRef.current.innerText = frame;
      }

      A += 0.02 * speed;
      B += 0.01 * speed;

      requestAnimationFrame(renderFrame);
    };

    renderFrame();
  }, [speed]);

  useEffect(() => {
    const updateScale = () => {
      const scale = Math.min(window.innerWidth / 1000, window.innerHeight / 500);
      if (canvasRef.current) {
        canvasRef.current.style.fontSize = `${Math.max(scale, 0.5)}em`; // Dynamic font size
        canvasRef.current.style.lineHeight = `${Math.max(scale, 0.3) * 5}em`; // Adjust line height
      }
    };

    window.addEventListener("resize", updateScale);
    updateScale(); // Initial call to set the scale

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      style={{
        position: scrollWithPage ? "absolute" : "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "hidden",
        whiteSpace: "pre",
        fontFamily: "monospace",
        pointerEvents: "none", // Don't interfere with clicking
      }}
    >
      <pre ref={canvasRef}></pre>
    </div>
  );
};

export default BagelMini;
