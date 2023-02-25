import { useRef, useEffect } from "react";
import { useRecoilState } from 'recoil';
import BarToggle from "../script/BarToggle";
import { 
  l1State, l2State,
  l3State, l4State,
  l5State, l6State,
  l7State, l8State 
} from "../store";

import { css } from "@emotion/css";

export const BitPlane = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D;

  const [l1s, setL1] = useRecoilState(l1State);
  const [l2s, setL2] = useRecoilState(l2State);
  const [l3s, setL3] = useRecoilState(l3State);
  const [l4s, setL4] = useRecoilState(l4State);
  const [l5s, setL5] = useRecoilState(l5State);
  const [l6s, setL6] = useRecoilState(l6State);
  const [l7s, setL7] = useRecoilState(l7State);
  const [l8s, setL8] = useRecoilState(l8State);

  const l1 = new BarToggle(50, 200, 200, 200, 'L1', l1s);
  const l2 = new BarToggle(50, 180, 200, 180, 'L2', l2s);
  const l3 = new BarToggle(50, 160, 200, 160, 'L3', l3s);
  const l4 = new BarToggle(50, 140, 200, 140, 'L4', l4s);
  const l5 = new BarToggle(50, 120, 200, 120, 'L5', l5s);
  const l6 = new BarToggle(50, 100, 200, 100, 'L6', l6s);
  const l7 = new BarToggle(50, 80, 200, 80, 'L7', l7s);
  const l8 = new BarToggle(50, 60, 200, 60, 'L8', l8s);

  const layers = [l1, l2, l3, l4, l5, l6, l7, l8];
  const layersState = [l1s, l2s, l3s, l4s, l5s, l6s, l7s, l8s]
  const layersSetState = [setL1, setL2, setL3, setL4, setL5, setL6, setL7, setL8]

  const drawEditor = () => {
    if (canvasRef.current) {
      for (let i = 0; i < layers.length; i++) {
        layers[i].draw(ctx);
        layers[i].drawInfo(ctx);
      }
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
        for (var i = 0; i < layers.length; i++) {
          const dfx = x - layers[i].fx;
          const dlx = layers[i].lx - x;
          const dy = layers[i].fy - y;
          if (dfx > 0 && dlx > 0 && dy < 10 && dy > -10) {
            layersSetState[i](!layers[i].isOn)
            layers[i].isOn = !layers[i].isOn
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            drawEditor();
          }
        }
      })

      ctx = canvasRef.current.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
  
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawEditor();
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