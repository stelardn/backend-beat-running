import { calculateBPM, selectTrack } from "./core";

interface Track {
  name: string;
  artist: string;
  bpm: number;
}

const tracks: Track[] = [];

export const resolvers = {
  Query: {
    tracks: (_, { bpm }: { bpm: number }): Track[] => {
      return tracks.filter((track) => track.bpm === bpm);
    },
  },
  Subscription: {
    nowPlaying: {
      subscribe: async (_, __, { pubsub }) => { 
        return pubsub.asyncIterator("NOW_PLAYING") 
      }
    },
  },
  Mutation: {
    sendAccelerometerData: async (_, input, { pubsub }) => {
      const bpm = calculateBPM(input);
      const nextSong = selectTrack("1", bpm);
      pubsub.publish("NOW_PLAYING", { nowPlaying: nextSong });
      return nextSong;
    },
  },
};
