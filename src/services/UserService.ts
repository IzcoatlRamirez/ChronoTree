import axios from './axios';
import { AxiosResponse } from 'axios';

export const getUsers = async(): Promise<AxiosResponse> => await axios.get('/api/users');
export const registerUser = async(username:String,password:String): Promise<AxiosResponse> => await axios.post('/api/register',{username,password});
export const getGenres = async(): Promise<AxiosResponse> => await axios.get('/Generos.php');
