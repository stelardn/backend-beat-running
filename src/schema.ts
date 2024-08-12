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

  type Subscription {
    paceChanged: Int
    accelerometerData: AccelerometerData
  }

  type AccelerometerData {
    x: Int
    y: Int
    z: Int
    speed: Int
  }

  type Mutation {
    sendAccelerometerData(x: Int!, y: Int!, z: Int!, speed: Int): Track  
  }
`;
