const Client = require('../models/Client')
const Project = require('../models/Projects')
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql')

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      client : {
        type:ClientType,
        resolve(parent,args){
            return Client.findById(parent.clientId)
        }
      }
    }),
  });

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    }),
  });

//  Root Queries
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        // Project 

        projects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
            return Project.find()
            },
        },

        project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Project.findById(args.id)
        },
        },
    
        //  Clients

        clients: {
        type: new GraphQLList(ClientType),
        resolve(parent, args) {
            return Client.find()
            },
        },

      client: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Client.findById(args.id)
        },
      },
    },
  });
  
 
module.exports = new GraphQLSchema({
    query:RootQuery
})