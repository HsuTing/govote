module.exports = `
  type Statistics {
    id: ID!
    total: String!
    time: Float!
    price: Int!
    distance: Float!
  }

  type Area {
    id: ID!
    name: String!
    value: Int!
  }

  type User {
    id: ID!
    area: String!
    target: String!
    name: String!
    message: String!
  }

  type Data {
    id: ID!
    statistics: Statistics!
    area: [Area]!
    users: [User]!
  }

  type Query {
    data: Data!
  }
`;
