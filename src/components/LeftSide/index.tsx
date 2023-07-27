import { Center, Flex, Text, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const binauralStates = [
  {
    emoji: '😴',
    text: 'Sleeping',
  },
  {
    emoji: '🧘‍♀️',
    text: 'Meditating',
  },
  {
    emoji: '💆‍♂️',
    text: 'Relaxing',
  },
  {
    emoji: '🧠',
    text: 'Concentrating',
  },
]

function LeftSide() {
  const [activeBinauralState, setActiveBinauralState] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBinauralState((oldActiveBinauralState) =>
        oldActiveBinauralState + 1 < binauralStates.length ? oldActiveBinauralState + 1 : 0
      )
    }, 7000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Center width="full">
      <VStack align="start" color="whiteAlpha.800" spacing="-3">
        <Text as="h2" fontSize="6xl" fontWeight="extrabold" textAlign="start">
          The perfect
        </Text>
        <Text as="h2" fontSize="6xl" fontWeight="extrabold" textAlign="start">
          Binaural beats for:
        </Text>
        <Flex height="90px" position="relative" width="full">
          <AnimatePresence initial={false}>
            <motion.div
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                x: 0,
                y: 20,
              }}
              initial={{
                opacity: 0,
                x: 0,
                y: -20,
              }}
              key={activeBinauralState}
              style={{
                position: 'absolute',
              }}
              transition={{
                opacity: { duration: 0.2 },
                x: { damping: 30, stiffness: 300, type: 'spring' },
              }}
            >
              <Text
                as="h2"
                bgClip="text"
                bgGradient="linear(to-r, primary.300, secondary.500)"
                fontSize="6xl"
                fontWeight="extrabold"
                textAlign="start"
              >
                {binauralStates[activeBinauralState].text}&nbsp;
                <Text as="span" color="initial">
                  {binauralStates[activeBinauralState].emoji}
                </Text>
              </Text>
            </motion.div>
          </AnimatePresence>
        </Flex>
      </VStack>
    </Center>
  )
}

export default LeftSide
