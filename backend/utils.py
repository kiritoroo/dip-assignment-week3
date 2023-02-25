import cv2 as cv
import numpy as np


def image_stream(img_dip: np.matrix, param: any) -> None:
  img_dip = resize_img(img_dip, 20)
  img_dip = cv.cvtColor(img_dip, cv.COLOR_BGR2GRAY)
  r1 = float(param['r1'])
  s1 = float(param['s1'])
  r2 = float(param['r2'])
  s2 = float(param['s2'])

  h, w = img_dip.shape
  for i in range(h):
    for j in range(w):
      if 0 <= img_dip[i,j] and img_dip[i,j] <= r1:
        img_dip[i,j] = (s1/r1 * img_dip[i,j]) if ( abs(r1) > 0) else s1
      elif r1 < img_dip[i,j] and img_dip[i,j] <= r2:
        img_dip[i,j] = (s2 - s1)/(r2 - r1) * (img_dip[i,j] - r1) + s1
      elif r2 < img_dip[i,j] and img_dip[i,j] <= 255:
        img_dip[i,j] = ((255 - s2)/(255 - r2)) * (img_dip[i,j] - r2) + s2


    _, image_encoded = cv.imencode('.jpg', img_dip)
    image_bytes = image_encoded.tobytes()

    yield (
      b'--frame\r\n'
      b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n'
    )

def image_stream2(img_dip: np.matrix, param: any) -> None:
  img_dip = resize_img(img_dip, 20)
  img_dip = cv.cvtColor(img_dip, cv.COLOR_BGR2GRAY)
  min_range = float(param['min_range'])
  max_range = float(param['max_range'])
  intensity = float(param['intensity'])

  h, w = img_dip.shape
  for i in range(h):
    for j in range(w):
      if img_dip[i,j] > min_range and img_dip[i,j] < max_range:
        img_dip[i,j] = intensity
      else:
        img_dip[i,j] = 0
      
    _, image_encoded = cv.imencode('.jpg', img_dip)
    image_bytes = image_encoded.tobytes()

    yield (
      b'--frame\r\n'
      b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n'
    )

def image_stream3(img_dip: np.matrix, param: any) -> None:
  img_dip = resize_img(img_dip, 20)
  img_dip = cv.cvtColor(img_dip, cv.COLOR_BGR2GRAY)
  min_range = float(param['min_range'])
  max_range = float(param['max_range'])
  intensity = float(param['intensity'])

  h, w = img_dip.shape
  for i in range(h):
    for j in range(w):
      if img_dip[i,j] > min_range and img_dip[i,j] < max_range:
        img_dip[i,j] = intensity
      else:
        img_dip[i,j] = img_dip[i,j]
      
    _, image_encoded = cv.imencode('.jpg', img_dip)
    image_bytes = image_encoded.tobytes()

    yield (
      b'--frame\r\n'
      b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n'
    )

def image_stream4(img_dip: np.matrix, param: any) -> None:
  img_dip = resize_img(img_dip, 20)
  img_dip = cv.cvtColor(img_dip, cv.COLOR_BGR2GRAY)
  img_merge = np.zeros(shape=img_dip.shape, dtype=np.uint8)
  h, w = img_dip.shape

  l1 = int(param['l1'])
  l2 = int(param['l2'])
  l3 = int(param['l3'])
  l4 = int(param['l4'])
  l5 = int(param['l5'])
  l6 = int(param['l6'])
  l7 = int(param['l7'])
  l8 = int(param['l8'])

  layters_state = [l8, l7, l6, l5, l4, l3, l2, l1]
  print(layters_state)

  lst = []
  for i in range(img_dip.shape[0]):
      for j in range(img_dip.shape[1]):
          lst.append(np.binary_repr(img_dip[i][j] ,width=8))

  img_bit_8 = (np.array([int(i[0]) for i in lst],dtype = np.uint8) * 128).reshape(img_dip.shape[0], img_dip.shape[1])
  img_bit_7 = (np.array([int(i[1]) for i in lst],dtype = np.uint8) * 64).reshape(img_dip.shape[0], img_dip.shape[1])
  img_bit_6 = (np.array([int(i[2]) for i in lst],dtype = np.uint8) * 32).reshape(img_dip.shape[0], img_dip.shape[1])
  img_bit_5 = (np.array([int(i[3]) for i in lst],dtype = np.uint8) * 16).reshape(img_dip.shape[0], img_dip.shape[1])
  img_bit_4 = (np.array([int(i[4]) for i in lst],dtype = np.uint8) * 8).reshape(img_dip.shape[0], img_dip.shape[1])
  img_bit_3 = (np.array([int(i[5]) for i in lst],dtype = np.uint8) * 4).reshape(img_dip.shape[0], img_dip.shape[1])
  img_bit_2 = (np.array([int(i[6]) for i in lst],dtype = np.uint8) * 2).reshape(img_dip.shape[0], img_dip.shape[1])
  img_bit_1 = (np.array([int(i[7]) for i in lst],dtype = np.uint8) * 1).reshape(img_dip.shape[0], img_dip.shape[1])

  imgs_bin = [img_bit_8, img_bit_7, img_bit_6, img_bit_5, img_bit_4, img_bit_3, img_bit_2, img_bit_1]

  for i in range(8):
    img_merge += layters_state[i] * imgs_bin[i]

    _, image_encoded = cv.imencode('.jpg', img_merge)
    image_bytes = image_encoded.tobytes()

    yield (
      b'--frame\r\n'
      b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n'
    )


def resize_img(img: np.matrix, scale_percent: int) -> np.matrix:
  w = int(img.shape[1] * scale_percent / 100)
  h = int(img.shape[0] * scale_percent / 100)
  dim = (w, h)
  img_resize = cv.resize(img, dim, interpolation=cv.INTER_AREA)
  return img_resize