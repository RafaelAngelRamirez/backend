import { gql } from "apollo-server-express";

export const TypeDefsFriends = gql`

  type Query {
    suggestions: ResponseSuggestions!
  }

  type Mutation {
    add_friend(_id: ID!): RsponseAddFriend!
  }

  type RsponseAddFriend {
    error: Boolean
    success: Boolean
    message: String
  }

  type ResponseSuggestions {
    error: Boolean
    success: Boolean
    message: String
    sugerencias: [Usuario]
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