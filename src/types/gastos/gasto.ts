export interface Gasto {
  id: string;
  nombre: string;
  monto: number;
  categoria: string;
  fecha: string;
  descripcion: string;
  compartido:boolean
  usuarios: {
    id: string;
    name: string;
  }[];
}
