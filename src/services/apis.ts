import { formState } from '../pages/form/type';
import Axios from './axios';

export const getAllJobs = async () => {
  const response = await Axios.get('/jobs');

  if (response.status === 200) {
    const data = response.data;
    return data;
  }

  return undefined;
};

export const getJob = async (id: string) => {
  const response = await Axios.get(`/jobs/${id}`);

  if (response.status === 200) {
    const data = response.data;
    return data;
  }

  return undefined;
};

export const createJob = async (data: formState) => {
  const response = await Axios.post(`/jobs`, data);

  if (response.status === 200) {
    const data = response.data;
    return data;
  }

  return undefined;
};

export const updateJob = async (id: string, data: formState) => {
  const response = await Axios.put(`/jobs/${id}`, data);

  if (response.status === 200) {
    const data = response.data;
    return data;
  }

  return undefined;
};

export const deleteJob = async (id: string) => {
  const response = await Axios.delete(`/jobs/${id}`);

  if (response.status === 200) {
    const data = response.data;
    return data;
  }

  return undefined;
};
