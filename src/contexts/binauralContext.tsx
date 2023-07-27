import React, { useEffect, useMemo, useState } from 'react'
import * as Tone from 'tone'

interface BinauralContextInterface {
  analyser?: Tone.Analyser
  frequency: number
  isPlaying: boolean
  setFrequency: (frequency: number) => void
  setVolume: (volume: number) => void
  volume: number
}

const initialContext: BinauralContextInterface = {
  frequency: 15,
  isPlaying: false,
  setFrequency: () => {},
  setVolume: () => {},
  volume: 0,
}

const BinauralContext = React.createContext<BinauralContextInterface>(initialContext)

function BinauralProvider({ children }: { children: React.ReactNode }) {
  const [frequency, setFrequency] = useState(initialContext.frequency)
  const [volume, setVolume] = useState(initialContext.volume)
  const [isPlaying, setIsPlaying] = useState(initialContext.isPlaying)

  const split = new Tone.Merge().toDestination()
  const leftEar = new Tone.Oscillator()
  const rightEar = new Tone.Oscillator()
  const analyser = new Tone.Analyser('waveform', 128)

  analyser.connect(split, 0, 0)
  leftEar.connect(split, 0, 0)
  rightEar.connect(split, 0, 1)

  const togglePlaying = () => {
    setIsPlaying((currentIsPlaying) => !currentIsPlaying)
  }

  const value = useMemo(
    () => ({
      analyser,
      frequency,
      isPlaying,
      setFrequency,
      setVolume,
      togglePlaying,
      volume,
    }),
    [analyser, frequency, isPlaying, volume, setFrequency, setVolume, togglePlaying]
  )

  useEffect(() => {
    // Formula retrieved by using excel on Oster's curve. Can be enhanced with real maths ;)
    // y = -0,2085x2 + 18,341x + 56,31
    const carrierFrequency = -0.2085 * frequency ** 2 + 18.341 * frequency + 56.31
    console.log(frequency, carrierFrequency)

    leftEar.set({ frequency: carrierFrequency + frequency / 2 })
    rightEar.set({ frequency: carrierFrequency - frequency / 2 })
  }, [frequency])

  useEffect(() => {
    Tone.Destination.set({ mute: volume === -10, volume })
  }, [volume])

  useEffect(() => {
    if (!isPlaying) {
      Tone.start()
      leftEar.start()
      rightEar.start()
    } else {
      leftEar.stop()
      rightEar.stop()
    }
  }, [isPlaying])

  return <BinauralContext.Provider value={value}>{children}</BinauralContext.Provider>
}

const useBinauralContext = () => React.useContext(BinauralContext)

export { BinauralContext, BinauralProvider, useBinauralContext }
