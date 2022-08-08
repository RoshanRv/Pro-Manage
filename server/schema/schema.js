const Client = require('../models/Client')
const Project = require('../models/Projects')
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require('graphql')

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


//  mutation
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //      add clients
        addClient:{
            type:ClientType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                email:{type: new GraphQLNonNull(GraphQLString)},
                phone:{type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                return Client.create(args)
            }
        },

        //      del clients
        deleteClient:{
            type:ClientType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Client.findByIdAndDelete(args.id)
            }
        },

        //      add projects
        addProject:{
            type:ProjectType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                description:{type: new GraphQLNonNull(GraphQLString)},
                status:{
                    type: new GraphQLEnumType({
                    name:'ProjectStatus',
                    values:{
                        new:{value:'Not Started'},
                        progress:{value:'In Progress'},
                        completed:{value:'Completed'}
                    },
                }),
                    defaultValue:'Not Started'
                    },
                clientId :{type: new GraphQLNonNull(GraphQLID) },
                },
            resolve(parent,args){
                return Project.create(args)
            }
        },

        //      delete projects
        deleteProject:{
            type:ProjectType,
            args:{
                id :{type: new GraphQLNonNull(GraphQLID) },
                },
            resolve(parent,args){
                return Project.findByIdAndDelete(args.id)
            }
        },

        //      update projects
        updateProject:{
            type:ProjectType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString},
                description:{type: GraphQLString},
                status:{
                    type: new GraphQLEnumType({
                    name:'ProjectStatusUpdate',
                    values:{
                        new:{value:'Not Started'},
                        progress:{value:'In Progress'},
                        completed:{value:'Completed'}
                    },
                }),
                    },
                },
            resolve(parent,args){
                return Project.findByIdAndUpdate(args.id,args,{new:true})
            }
        },
    }

})
  
 
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})