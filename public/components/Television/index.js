import { useEffect, useRef } from "react";
import drawStatic from "./drawStatic";

export default function Television() {
  const canvasRef = useRef(null);
  const startTime = +new Date();

  useEffect(() => {
    const { current: canvas } = canvasRef || {};

    if (!canvas) return;

    const context = canvas.getContext("2d");

    const loop = () => {
      requestAnimationFrame(loop);

      const time = (new Date() - startTime) / 1000;

      drawStatic({
        canvas,
        context,
        time,
      });
    };

    loop();
  }, [canvasRef]);

  return (
    <div className="h-full w-full p-1 bg-gray-300">
      <div className="h-full w-full bg-gray-300 rounded">
        <canvas ref={canvasRef} className="h-full w-full"></canvas>
      </div>
    </div>
  );
}
