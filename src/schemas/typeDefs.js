module.exports = `
  type Area {
    id: ID!
    America: Int!
    Europe: Int!
    Island: Int!
    Asia: Int!
  }

  type Statistics {
    id: ID!
    total: String!
    time: Float!
    price: Int!
    distance: Float!
  }

  type Data {
    id: ID!
    statistics: Statistics!
    area: Area!
  }

  type Query {
    data: Data!
  }
`;
