module.exports = `
  type Area {
    id: ID!
    name: String!
    value: Int!
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
    area: [Area]!
  }

  type Query {
    data: Data!
  }
`;
