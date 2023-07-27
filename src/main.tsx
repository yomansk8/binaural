import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import theme from './theme'
import { BinauralProvider } from './contexts/binauralContext'
import './index.css'

import '@fontsource/arvo'
import '@fontsource/lato'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BinauralProvider>
        <App />
      </BinauralProvider>
    </ChakraProvider>
  </React.StrictMode>
)
