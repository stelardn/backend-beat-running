import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Track {
    title: String
    artist: String
    bpm: Int
  }

  type Query {
    tracks(bpm: Int!): [Track]
  }

  type Subscription {
    nowPlaying: Track
  }

  type AccelerometerData {
    x: Float
    y: Float
    z: Float
    speed: Float
  }

  type Mutation {
    sendAccelerometerData(x: Float!, y: Float!, z: Float!, speed: Float): Track
  }
`;
