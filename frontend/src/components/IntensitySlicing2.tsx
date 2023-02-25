import { useRef, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { coorda2State, coordb2State, intensity2State } from "../store";

import Point from "../script/Point";
import { css } from "@emotion/css";
import BarSlide from "../script/BarSlide";

export const IntensitySlicing2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D;

  const [coorda, setCoorda] = useRecoilState(coorda2State);
  const [coordb, setCoordb] = useRecoilState(coordb2State);
  const [intensity, setIntensity] = useRecoilState(intensity2State);

  const pf = new Point(0, 0);
  const pl = new Point(255, 255);
  const p1 = new Point(coorda.x, coorda.y, 'A');
  const p2 = new Point(coordb.x, coordb.y, 'B');
  const b1 = new BarSlide(p1.x, intensity, p2.x, intensity);
  const points = [pf, p1, p2, pl];
  const bars = [b1];

  const drawCurveEditor = () => {
    if (canvasRef.current) {
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#fff';

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(points[points.length-2].x, points[points.length-2].y);
      ctx.lineTo(points[points.length-1].x, points[points.length-1].y);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(points[1].x, points[1].y);
      ctx.lineTo(bars[0].fx, bars[0].fy);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(points[points.length-2].x, points[points.length-2].y);
      ctx.lineTo(bars[0].lx, bars[0].ly);
      ctx.stroke();
      ctx.closePath();

      ctx.globalAlpha = 1;

      for (let i = 1; i < points.length - 1; i++) {
        points[i].draw(ctx);
        points[i].drawCoord(ctx, false, 30);
        points[i].drawInfo(ctx);
      }

      for (let i=0; i < bars.length; i++) {
        bars[i].draw(ctx);
        bars[i].drawCoord(ctx);
      }
    }
  }

  const drawGrid = () => {
    if (canvasRef.current) {
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0.5; x < canvasRef.current.width; x += 255/10) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasRef.current.height);
      }

      for (let y = 0.5; y < canvasRef.current.height; y += 255/10) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasRef.current.width, y);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.globalAlpha = 1;
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 255;
      canvasRef.current.height = 255;

      canvasRef.current.addEventListener("mousedown", (event: any) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = event.clientX - rect?.left!;
        const y = event.clientY - rect?.top!;

        for (var i = 1; i < points.length-1; i++) {
          const dx = points[i].x - x;
          const dy = points[i].y - y;
          if (dx * dx + dy * dy <= 25) {
            const moveHandle = (e: any) => {
              const x = e.clientX - rect?.left!;
              const y = e.clientY - rect?.top!;

              points[i].move(x, x);
              
              if (i == 1) {
                setCoorda({x, y: coorda.y})
                bars[0].move({fx: x});
              } else if (i == 2) {
                setCoordb({x, y: coorda.y})
                bars[0].move({lx: x});
              }

              ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
              drawGrid();
              drawCurveEditor();
            }

            const upHandle = (e: any) => {
              canvasRef.current!.removeEventListener("mousemove", moveHandle);
              canvasRef.current!.removeEventListener("mouseUp", upHandle);
            }

            canvasRef.current!.addEventListener("mousemove", moveHandle);
            canvasRef.current!.addEventListener("mouseup", upHandle);
            return;
          }
        }

        for (var i = 0; i < bars.length; i++) {
          const dfx = bars[i].fx - x;
          const dlx = bars[i].lx - x;
          const dy = bars[i].fy - y;
          if (dfx * dlx + dy * dy <= 25) {
            const moveHandle = (e: any) => {
              const x = e.clientX - rect?.left!;
              const y = e.clientY - rect?.top!;
              
              bars[i].move({fy: y, ly: y});

              setIntensity(y);

              ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
              drawGrid();
              drawCurveEditor();
            }

            const upHandle = (e: any) => {
              canvasRef.current!.removeEventListener("mousemove", moveHandle);
              canvasRef.current!.removeEventListener("mouseUp", upHandle);
            }

            canvasRef.current!.addEventListener("mousemove", moveHandle);
            canvasRef.current!.addEventListener("mouseup", upHandle);
            return;
          }
        }
      })

      ctx = canvasRef.current.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
  
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawGrid();
      drawCurveEditor();
    }
  }, [])

  return (
    <>
      <canvas
        className={sCanvas}
        ref={canvasRef} 
        width="255" 
        height="255"
      />
    </>
  )
}

const sCanvas = css`
  background-color: #555;
`