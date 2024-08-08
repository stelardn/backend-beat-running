import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Track {
    name: String
    artist: String
    bpm: Int
  }

  type Query {
    tracks(bpm: Int!): [Track]
  }

  type Subscription {
    trackAdded: Track
  }
`;
