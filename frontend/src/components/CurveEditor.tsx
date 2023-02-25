import { useRef, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { coord1State, coord2State } from "../store";

import Point from "../script/Point";
import { css } from "@emotion/css";

export const CurveEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D;

  const [coord1, setCoord1] = useRecoilState(coord1State);
  const [coord2, setCoord2] = useRecoilState(coord2State);

  const pf = new Point(0, 0);
  const pl = new Point(255, 255);
  const p1 = new Point(coord1.x, coord1.y, 'r1, s1');
  const p2 = new Point(coord2.x, coord2.y, 'r2, s2');
  const points = [pf, p1, p2, pl];

  const drawCurveEditor = () => {
    if (canvasRef.current) {
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#fff';
      for (let i = 0; i < points.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i+1].x, points[i+1].y);
        ctx.stroke();
        ctx.closePath();
      }
      ctx.globalAlpha = 1;

      for (let i = 1; i < points.length - 1; i++) {
        points[i].draw(ctx);
        points[i].drawInfo(ctx);
        points[i].drawCoord(ctx);
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
              
              points[i].move(x, y);

              if (i == 1) {
                setCoord1({x, y})
              } else if (i == 2) {
                setCoord2({x, y})
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