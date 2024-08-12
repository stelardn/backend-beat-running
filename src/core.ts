export interface IAccelerometerData {
  x: number
  y: number
  z: number
  speed?: number
}

export interface IUserData {
  userID: string
}

export interface ITrack {
  bpm?: number
  artist: string
  title: string
}

export const calculateBPM = (input: IAccelerometerData): number => {
  // Conversion logic
  return 128
}

export const selectTrack = (userID: string, bpm: number): ITrack => {
  // Track selection based on user preferences
  return {
    bpm: 128,
    artist: 'The Strokes',
    title: '12:51'
  }
}