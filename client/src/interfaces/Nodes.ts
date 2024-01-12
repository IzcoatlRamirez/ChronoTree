// export interface Game {
//     id: string;
//     nombre: string;
//     autor: string;
//     descripcion: string;
//     genero: string[];
//     link: string;
//     imagen: string;
//   }
  
// export interface GameCardProps extends Game {
//   imagen:string
// } 

// export type GameCardDetails = Omit<Game,'link'>

export interface Node{
    id: number;
    imageUrl?: string;
    nombre?: string;
    fechaNacimiento?: string;
    lugarNacimiento?: string;
    X: number;
    Y: number;
    updateNodes : ()=> void;
    updateNodesConyuge: ()=> void;
}

export interface AristaConyugal{
    id: number;
    X: number;
    Y: number;
}

export interface NodeRoot{
    id: number;
    updateNodes : ()=> void;
    updateNodesConyuge: ()=> void;
}

export interface Arista{
    id: number;
    X: number;
    Y: number;
    X2: number;
}