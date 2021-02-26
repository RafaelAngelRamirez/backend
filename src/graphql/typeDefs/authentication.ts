import { gql } from "apollo-server-express";

export const TypeDefsAuthentication = gql`

  type Query {
    _dummy: String
  }

  type Mutation {
    signin(data: signIn!): ResponseAuth!
    signup(data: signUp!): ResponseAuth!
  }

  input signIn {
    usuario: String!
    password: String!
  }

  input signUp {
    nombre: String!
    apellido: String!
    usuario: String!
    email: String!
    password: String!
    password2: String!
  }

  type ResponseAuth {
    error: Boolean
    success: Boolean
    message: String
    token: String
    usuario: Usuario
  }

  type Usuario {
    _id: ID!
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