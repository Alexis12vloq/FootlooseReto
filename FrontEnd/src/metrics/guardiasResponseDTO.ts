interface Agent {
  id_agente: string;
  nom_agente: string;
  estado_agente: string;
  email_agente: string;
  id_empleado: number;
  ofic_agente: string | null;
  propagado_bi: boolean;
  propagado_encuestas: boolean;
  id_shori: string | null;
  propagado_shori: boolean;
  cant_personal: number;
  horario: any;
  equipoInformaticoDetalle: any;
  hijos: any;
  equiposLider: any;
  rolesDisponibles: any;
  rol: {
    id_rol: number;
    nom_rol: string;
    descripcion_rol: string;
    enlace_principal_rol: string;
  };
  equipo: {
    id_eq: number;
    nombre_eq: string;
    estado_equipo: string;
    propagado_bi: boolean;
    propagado_encuestas: boolean;
    id_shori: string | null;
    proyecto: {
      id_proy: number;
      nom_proy: string;
      propagado_bi: boolean;
      estado_proy: string;
      proyecto_grupo: {
        id_proy_grupo: number;
        nombre_proy_grupo: string;
        unidad_negocio: {
          id_unidad_negocio: number;
          nombre_unidad_negocio: string;
          estado_unidad_negocio: string;
        };
      };
      pais: {
        id_pais: number;
        nombre_pais: string;
        abrev_pais: string;
      };
      moneda: {
        idtb_pom_monedas: number;
        descripcion: string;
        simbolos: string;
        divisa: string;
      };
    };
  };
  proyecto: {
    id_proy: number;
    nom_proy: string;
    propagado_bi: boolean;
    estado_proy: string;
    proyecto_grupo: {
      id_proy_grupo: number;
      nombre_proy_grupo: string;
      unidad_negocio: {
        id_unidad_negocio: number;
        nombre_unidad_negocio: string;
        estado_unidad_negocio: string;
      };
    };
    pais: {
      id_pais: number;
      nombre_pais: string;
      abrev_pais: string;
    };
    moneda: {
      idtb_pom_monedas: number;
      descripcion: string;
      simbolos: string;
      divisa: string;
    };
  };
  proyecto_grupo: any;
  unidad_negocio: any;
  fecha_password: any;
}
interface Product {
  idProducto: number;
  NombreProducto: string;
  imagen: string;
  PrecioVenta: number;
  Marca: {
    idMarca: number;
    NombreMarca: string;
  };
  Modelo: {
    idModelo: number;
    NombreModelo: string;
  };
  Color: {
    idColor: number;
    NombreColor: string;
  };
  Talla: {
    idTalla: number;
    NombreTalla: string;
  };
}
interface AgentGuardia {
  id_guardia: number;
  agente: Agent;
  tipo_guardia: any;
  estado_guardia: string;
  fecha_guardia: string;
  fecha_registro_guardia: string;
}
export interface GuardiaTableProps {
  agentGuardias: AgentGuardia[];
}
export interface ProductTableProps {
  products: Product[];
  setUpdateTable: any;

}
export default AgentGuardia;
