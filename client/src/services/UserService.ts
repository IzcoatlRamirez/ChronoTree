import axios from './axios';
import { AxiosResponse } from 'axios';

export const getUsers = async(): Promise<AxiosResponse> => await axios.get('/api/users');

export const registerUser = async(username:string,password:string): Promise<AxiosResponse> => await axios.post('/api/register',{username,password});

export const loginUser = async(username:string,password:string): Promise<AxiosResponse>=>await axios.post('/api/login',{username,password},{withCredentials:true});

export const verifyToken = async(): Promise<AxiosResponse>=>await axios.get('/api/verify',{withCredentials:true});


