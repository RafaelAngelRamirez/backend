import { gql } from "apollo-server-express";

export const TypeDefsPublications = gql`

  scalar Upload
  scalar Date

  type Subscription {
    get_post: Publicaciones
  }

  type Query {
    get_post: ResponseGetPost
  }

  ############################
  ##########GET_POST##########
  ############################
  type File {
    url: String
  }

  type Mutation {
    to_post(data: inputToPost!): ResponseToPost
    delete_post(_id: ID!): ResponseDeletePost
    like_to_post(_id: ID!): ResponseLikeAndDislike
    dislike_to_post(_id: ID!): ResponseLikeAndDislike
  }
  
  ###########################
  ##########TO_POST##########
  ###########################
  input inputToPost{
    file: Upload
    texto: String
  }

  type ResponseToPost {
    error: Boolean
    success: Boolean
    message: String
  }

  type ResponseGetPost {
    error: Boolean
    success: Boolean
    message: String
    publicaciones: [Publicaciones]
  }

  ###############################
  ##########DELETE_POST##########
  ###############################

  type ResponseDeletePost {
    error: Boolean
    success: Boolean
    message: String
  }

  ###################################
  ##########DISLIKE_TO_POST##########
  ########## LIKE_TO_POST ###########
  ###################################

  type ResponseLikeAndDislike {
    error: Boolean
    success: Boolean
    message: String
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
    solicitudes_enviadas: [Usuario]
    solicitudes_recibidas: [Usuario]
    historial: Historial
    publicaciones: [Publicaciones]
  }

  type Publicaciones {
    _id: ID
    texto: String
    file: [File]
    createdAt: Date
    usuario: Usuario
    likes: [Usuario]
    comments: [Comentarios]
  }

  type Comentarios {
    texto: String,
    usuario: Usuario,
    likes: [Usuario],
  }

  type Preferencias {
    private: Boolean,
    showViewMessage: Boolean
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