import axios from './axios';
import { AxiosResponse } from 'axios';

export const getNodes = async (): Promise<AxiosResponse> => await axios.get('/api/nodes', { withCredentials: true });

export const getNodosConyuge = async (): Promise<AxiosResponse> => await axios.get('/api/nodesConyuge', { withCredentials: true });

export const getAristasConyuge = async (): Promise<AxiosResponse> => await axios.get('/api/aristasConyuge', { withCredentials: true });

export const getAristas = async (): Promise<AxiosResponse> => await axios.get('/api/aristas', { withCredentials: true });

export const createConyuge = async (nodeId: number): Promise<AxiosResponse> => await axios.post('/api/conyuge', { nodeId }, { withCredentials: true });

export const createChild = async (nodeId: number): Promise<AxiosResponse> => await axios.post('/api/child', { nodeId }, { withCredentials: true });

export const haveConyuge = async (nodeId: number): Promise<AxiosResponse> => await axios.post('/api/haveConyuge', { nodeId }, { withCredentials: true });

export const haveNodeDependencies = async (nodeId: number): Promise<AxiosResponse> => await axios.post('/api/haveNodeDependencies', { nodeId }, { withCredentials: true });

export const deleteConyuge = async (nodeId: number): Promise<AxiosResponse> => await axios.delete('/api/conyuge', { data: { nodeId }, withCredentials: true });

export const deleteChild = async (nodeId: number): Promise<AxiosResponse> => await axios.delete('/api/child', { data: { nodeId }, withCredentials: true });

export const uploadNode = async (nodeId:number, nombre:string, fechaNacimiento:string,fechaDefuncion:string | undefined,lugarNacimiento:string): Promise<AxiosResponse> => await axios.put('/api/node', 
{ 
    nodeId,
    nombre,
    fechaNacimiento,
    fechaDefuncion,
    lugarNacimiento}, { withCredentials: true });

export const uploadNodeConyuge = async (nodeId:number, nombre:string, fechaNacimiento:string,fechaDefuncion:string | undefined,lugarNacimiento:string): Promise<AxiosResponse> => await axios.put('/api/nodeConyuge', 
{ 
    nodeId, 
    nombre,
    fechaNacimiento,
    fechaDefuncion,
    lugarNacimiento}, { withCredentials: true });

export const uploadImageNode = async (formData:FormData): Promise<AxiosResponse> => await axios.put('/api/nodeImage', formData,{withCredentials: true});

export const uploadImageNodeC = async (formData:FormData): Promise<AxiosResponse> => await axios.put('/api/nodeImageC', formData,{withCredentials: true});

