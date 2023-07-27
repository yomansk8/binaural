import React, { useEffect } from 'react'
import Sketch from 'react-p5'

import { useBinauralContext } from '../../contexts/binauralContext'

function Visualiser() {
  const { analyser } = useBinauralContext()

  // useEffect(() => {
  //   if (analyser) {
  //     const values = analyser.getValue()
  //     console.log(values)
  //   }
  // }, [analyser])
  // return <canvas style={{ height: '30px', width: '100%' }} />
  return (
    <Sketch
      draw={(p5) => {
        if (!analyser) return

        const dim = Math.min(p5.width, p5.height)
        p5.background(0, 0, 0, 10)

        p5.strokeWeight(dim * 0.0025)
        p5.stroke(255)
        p5.noFill()
        const values = analyser.getValue() as Float32Array

        p5.beginShape()
        for (let i = 0; i < values.length; i += 1) {
          const amplitude = values[i]
          const x = p5.map(i, 0, values.length - 1, 0, p5.width)
          const y = p5.height / 2 + amplitude * p5.height
          // Place vertex
          p5.vertex(x, y)
        }
      }}
      setup={(p5, parentRef) => {
        p5.createCanvas(500, 50).parent(parentRef)
      }}
    />
  )
}

export default Visualiser
