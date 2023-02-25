from fastapi import APIRouter, Form
from fastapi.responses import StreamingResponse
import cv2 as cv

from utils import image_stream, image_stream2, image_stream3, image_stream4

dip_router = APIRouter(prefix='/api', tags=['DIP Service'])

img_raw = cv.imread('./static/fashion.jpg')
img_dip = img_raw.copy()
r1 = 200
s1 = 150
r2 = 250
s2 = 200

min_range = 50
max_range = 150
intensity = 200

min_range2 = 100
max_range2 = 150
intensity2 = 200

l1 = False
l2 = False
l3 = False
l4 = False
l5 = False
l6 = False
l7 = False
l8 = False

@dip_router.post('/stream')
def param(
  _r1: str = Form(...),
  _s1: str = Form(...),
  _r2: str = Form(...),
  _s2: str = Form(...)
) -> any:
  global r1, s1, r2, s2
  r1 = _r1
  s1 = _s1
  r2 = _r2
  s2 = _s2

  return {
    "mess": "Success!"
  }


@dip_router.get('/stream')
def stream_feed() -> any:
  global r1, s1, r2, s2
  param = {
    "r1": r1, "s1": s1, "r2": r2, "s2": s2
  }

  return StreamingResponse(
    image_stream(img_dip, param), 
    media_type="multipart/x-mixed-replace; boundary=frame"
  )

@dip_router.post('/stream2')
def param(
  _min_range: str = Form(...),
  _max_range: str = Form(...),
  _intensity: str = Form(...),
) -> any:
  global min_range, max_range, intensity
  min_range = _min_range
  max_range = _max_range
  intensity = _intensity

  return {
    "mess": "Success!"
  }


@dip_router.get('/stream2')
def stream_feed2() -> any:
  global min_range, max_range, intensity
  param = {
    "min_range": min_range, "max_range": max_range, "intensity": intensity
  }

  return StreamingResponse(
    image_stream2(img_dip, param), 
    media_type="multipart/x-mixed-replace; boundary=frame"
  )

@dip_router.post('/stream3')
def param(
  _min_range: str = Form(...),
  _max_range: str = Form(...),
  _intensity: str = Form(...),
) -> any:
  global min_range2, max_range2, intensity2
  min_range2 = _min_range
  max_range2 = _max_range
  intensity2 = _intensity

  return {
    "mess": "Success!"
  }


@dip_router.get('/stream3')
def stream_feed3() -> any:
  global min_range2, max_range2, intensity2
  param = {
    "min_range": min_range2, "max_range": max_range2, "intensity": intensity2
  }

  return StreamingResponse(
    image_stream3(img_dip, param), 
    media_type="multipart/x-mixed-replace; boundary=frame"
  )

@dip_router.post('/stream4')
def param(
  _l1: str = Form(...),
  _l2: str = Form(...),
  _l3: str = Form(...),
  _l4: str = Form(...),
  _l5: str = Form(...),
  _l6: str = Form(...),
  _l7: str = Form(...),
  _l8: str = Form(...),
) -> any:
  global l1, l2, l3, l4, l5, l6, l7, l8
  l1 = _l1
  l2 = _l2
  l3 = _l3
  l4 = _l4
  l5 = _l5
  l6 = _l6
  l7 = _l7
  l8 = _l8

  return {
    "mess": "Success!"
  }


@dip_router.get('/stream4')
def stream_feed3() -> any:
  global l1, l2, l3, l4, l5, l6, l7, l8
  param = {
    "l1": l1,
    "l2": l2,
    "l3": l3,
    "l4": l4,
    "l5": l5,
    "l6": l6,
    "l7": l7,
    "l8": l8
  }

  return StreamingResponse(
    image_stream4(img_dip, param), 
    media_type="multipart/x-mixed-replace; boundary=frame"
  )
