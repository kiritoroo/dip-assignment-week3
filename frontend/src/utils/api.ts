import axios from './axiosUtil'

export const dipSetParamPOST = (param: any) => {
  const formData = new FormData()
  formData.append("_r1", param.r1.toString())
  formData.append("_s1", param.s1.toString())
  formData.append("_r2", param.r2.toString())
  formData.append("_s2", param.s2.toString())
  
  return axios.post('stream', formData)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    })
}

export const dip2SetParamPOST = (param: any) => {
  const formData = new FormData()
  formData.append("_min_range", param.min_range.toString())
  formData.append("_max_range", param.max_range.toString())
  formData.append("_intensity", param.intensity.toString())
  
  return axios.post('stream2', formData)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    })
}

export const dip3SetParamPOST = (param: any) => {
  const formData = new FormData()
  formData.append("_min_range", param.min_range.toString())
  formData.append("_max_range", param.max_range.toString())
  formData.append("_intensity", param.intensity.toString())
  
  return axios.post('stream3', formData)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    })
}

export const dip4SetParamPOST = (param: any) => {
  const formData = new FormData()
  formData.append("_l1", Number(param.l1).toString())
  formData.append("_l2", Number(param.l2).toString())
  formData.append("_l3", Number(param.l3).toString())
  formData.append("_l4", Number(param.l4).toString())
  formData.append("_l5", Number(param.l5).toString())
  formData.append("_l6", Number(param.l6).toString())
  formData.append("_l7", Number(param.l7).toString())
  formData.append("_l8", Number(param.l8).toString())
  
  return axios.post('stream4', formData)
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    })
}