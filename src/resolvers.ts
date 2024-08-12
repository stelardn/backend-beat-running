import { PubSub } from "graphql-subscriptions";
import { calculateBPM, selectTrack } from "./core";

const pubsub = new PubSub()

interface Track {
  name: string;
  artist: string;
  bpm: number;
}

const tracks: Track[] = [];

export const resolvers = {
  Query: {
    tracks: (_, { bpm }: { bpm: number }): Track[] => {
      return tracks.filter(track => track.bpm === bpm);
    },
  },
  Subscription: {
    // trackAdded: {
    //   subscribe: async (_, __, { pubsub }) => pubsub.asyncIterator('TRACK_ADDED'),
    // },
    // paceChanged: {
    //   subscribe: async (_, __, { pubsub }) => pubsub.asyncIterator('PACE_CHANGED'),
    // },
    accelerometerData: {
      subscribe: async (_, __, { pubsub }) => pubsub.asyncIterator('ACCELEROMETER_DATA')
    }
  },
  Mutation: {
    sendAccelerometerData: (_, { input }) => {
      const bpm = calculateBPM(input)
      const nextSong = selectTrack('1', bpm)
      pubsub.publish('ACCELEROMETER_DATA', { accelerometerData: input })
    }
  }
};

// export const addTrack = (track: Track) => {
//   tracks.push(track);
//   pubsub.publish('TRACK_ADDED', { trackAdded: track });
// };
