import { gql } from "apollo-server-express";

export const TypeDefsUser = gql`

  type Query {
    user: Usuario
  }

  type Usuario {
    _id: ID
    nombre: String
    apellido: String
    usuario: String
    email: String
    avatar: String
    portada: String
    preferencias: Preferencias
    amigos: [Usuario]
    solicitudes: [Solicitudes]
    historial: Historial
  }

  type Preferencias {
    private: Boolean,
    showViewMessage: Boolean
  }

  type Solicitudes {
    tipo: String
    usuario: Usuario
    createdAt: String
  }

  type Historial {
    busqueda: [Usuario]
  }

  type Direccion {
    ciudad: String,
    geolocalizacion: Geo
  }

  type Geo {
    lat: String,
    lng: String
  }

`;