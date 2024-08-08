

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
    trackAdded: {
      subscribe: async (_, __, { pubsub }) => pubsub.asyncIterator('TRACK_ADDED'),
    },
  },
};

// export const addTrack = (track: Track) => {
//   tracks.push(track);
//   pubsub.publish('TRACK_ADDED', { trackAdded: track });
// };
