import { CurveEditor } from "./components/CurveEditor"
import { IntensitySlicing } from "./components/IntensitySlicing"
import { IntensitySlicing2 } from "./components/IntensitySlicing2"
import { BitPlane } from "./components/BitPlane"

import { useRecoilValue } from 'recoil'
import { 
  coord1State, coord2State, 
  coordaState, coordbState, intensityState,
  coorda2State, coordb2State, intensity2State,
  l1State, l2State, l3State, l4State,
  l5State, l6State, l7State, l8State
} from "./store"
import { useEffect, useRef } from "react"

import { 
  dipSetParamPOST, 
  dip2SetParamPOST,
  dip3SetParamPOST,
  dip4SetParamPOST
} from "./utils/api"
import { css } from "@emotion/css"

export default function App() {
  const imgRef1 = useRef<HTMLImageElement>(null)
  const imgRef2 = useRef<HTMLImageElement>(null)
  const imgRef3 = useRef<HTMLImageElement>(null)
  const imgRef4 = useRef<HTMLImageElement>(null)

  const coord1 = useRecoilValue(coord1State)
  const coord2 = useRecoilValue(coord2State)
  const coorda = useRecoilValue(coordaState)
  const coordb = useRecoilValue(coordbState)
  const intensity = useRecoilValue(intensityState)
  const coorda2 = useRecoilValue(coorda2State)
  const coordb2 = useRecoilValue(coordb2State)
  const intensity2 = useRecoilValue(intensity2State)

  const l1 = useRecoilValue(l1State)
  const l2 = useRecoilValue(l2State)
  const l3 = useRecoilValue(l3State)
  const l4 = useRecoilValue(l4State)
  const l5 = useRecoilValue(l5State)
  const l6 = useRecoilValue(l6State)
  const l7 = useRecoilValue(l7State)
  const l8 = useRecoilValue(l8State)

  useEffect(() => {
    const param = {
      "r1": coord1.x,
      "s1": coord1.y,
      "r2": coord2.x,
      "s2": coord2.y
    }
    dipSetParamPOST(param)
    if (imgRef1.current) {
      imgRef1.current.src = "/err"
      imgRef1.current.src = "/api/stream"
    }
  }, [coord1, coord2])

  useEffect(() => {
    const param = {
      "min_range": coorda.x,
      "max_range": coordb.x,
      "intensity": intensity,
    }
    dip2SetParamPOST(param)
    if (imgRef2.current) {
      imgRef2.current.src = "/err"
      imgRef2.current.src = "/api/stream2"
    }
  }, [coorda, coordb, intensity])

  useEffect(() => {
    const param = {
      "min_range": coorda2.x,
      "max_range": coordb2.x,
      "intensity": intensity2,
    }
    dip3SetParamPOST(param)
    if (imgRef3.current) {
      imgRef3.current.src = "/err"
      imgRef3.current.src = "/api/stream3"
    }
  }, [coorda2, coordb2, intensity2])

  useEffect(() => {
    const param = {
      "l1": l1,
      "l2": l2,
      "l3": l3,
      "l4": l4,
      "l5": l5,
      "l6": l6,
      "l7": l7,
      "l8": l8,
    }
    dip4SetParamPOST(param)
    if (imgRef4.current) {
      imgRef4.current.src = "/err"
      imgRef4.current.src = "/api/stream4"
    }
  }, [l1, l2, l3, l4, l5, l6, l7, l8])

  return (
    <>
      <CurveEditor/>
      <img className={sImage} ref={imgRef1} src="/api/stream"/>
      <IntensitySlicing/>
      <img className={sImage} ref={imgRef2} src="/api/stream2"/>
      <IntensitySlicing2/>
      <img className={sImage} ref={imgRef3} src="/api/stream3"/>
      <BitPlane/>
      <img className={sImage} ref={imgRef4} src="/api/stream4"/>
    </>
  )
}

const sImage = css`
  pointer-events: none;
  user-select: none;
`