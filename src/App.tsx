import { Grid } from '@chakra-ui/react'
import React from 'react'

import LeftSide from './components/LeftSide'
import RightSide from './components/RightSide'

import './App.css'

function App() {
  return (
    <Grid
      _before={{
        bottom: 0,
        content: '""',
        filter: 'blur(10px)',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      }}
      gap="8"
      gridTemplateColumns={{
        lg: 'repeat(2, 1fr)',
        md: '1fr',
        sm: '1fr',
        xl: 'repeat(2, 1fr)',
      }}
      height="full"
      width="full"
    >
      <LeftSide />
      <RightSide />
    </Grid>
  )
}

export default App
