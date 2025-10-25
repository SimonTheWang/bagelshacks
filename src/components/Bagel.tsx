import React, { useEffect, useRef } from "react";

interface AsciiArtProps {
  speed?: number; // Speed of the animation
  className?: string;
  scrollWithPage?: boolean; // Whether the bagel scrolls with the page
}

const AsciiArt: React.FC<AsciiArtProps> = ({ speed = 1, className, scrollWithPage = false }) => {
  const canvasRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let A = 0;
    let B = 0;

    const renderFrame = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      const height = Math.floor(minDimension / 5);
      const width = Math.floor((minDimension / 5) * 2.5);
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

  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh", // Full viewport height
        overflow: "hidden", // Prevent scrolling
        whiteSpace: "pre",
        fontFamily: "monospace",
        position: scrollWithPage ? "absolute" : "fixed",
        top: scrollWithPage ? undefined : "50%",
        left: scrollWithPage ? undefined : "50%",
        transform: scrollWithPage ? undefined : "translate(-50%, -50%)",
        width: scrollWithPage ? undefined : "100%",
        pointerEvents: "none", // Don't interfere with clicking
      }}
    >
      <pre ref={canvasRef}></pre>
    </div>
  );
};

export default AsciiArt;
