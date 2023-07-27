import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { MdGraphicEq } from 'react-icons/md'
import { useBinauralContext } from '../../contexts/binauralContext'
import Visualiser from './Visualiser'

const DEEP_SLEEP_FREQUENCY = 3
const MEDITATION_FREQUENCY = 5
const RELAXATION_FREQUENCY = 10
const CONCENTRATION_FREQUENCY = 25
const PROBLEM_SOLVING_FEQUENCY = 45

function RightSide() {
  const { analyser, frequency, setFrequency } = useBinauralContext()

  if (analyser) {
    console.log(analyser.getValue())
  }

  return (
    <Center padding="4" width="full">
      <VStack spacing="8" width="full">
        <Visualiser />
        <VStack width="full">
          <Text as="h3" fontSize="4xl" fontWeight="semibold" lineHeight="1.2">
            {frequency}Hz
          </Text>
          <Slider
            max={50}
            maxWidth="full"
            min={0.5}
            // step={0.5}
            value={frequency}
            width="2xl"
            onChange={(value) => setFrequency(value)}
          >
            <SliderMark marginLeft="-4" marginTop="2" value={0.5}>
              <Text fontSize="sm" fontWeight="semibold">
                0.5Hz
              </Text>
            </SliderMark>
            <SliderMark marginLeft="-4" marginTop="2" value={50}>
              <Text fontSize="sm" fontWeight="semibold">
                50Hz
              </Text>
            </SliderMark>
            <SliderTrack bg="gray.100" borderRadius="full" height="1">
              <SliderFilledTrack bg="gray.400" />
            </SliderTrack>
            <SliderThumb boxSize="6">
              <Box as={MdGraphicEq} color="gray.500" />
            </SliderThumb>
          </Slider>
        </VStack>

        <VStack spacing="2">
          <Text fontSize="larger" fontWeight="semibold" lineHeight="1.2">
            Don&apos;t know where to start?
            <br />
            Try one of our following presets
          </Text>
          <Flex justify="center" paddingTop="-2" width="full" wrap="wrap">
            <Button
              colorScheme="gray"
              marginBottom="2"
              marginRight="2"
              size="lg"
              onClick={() => setFrequency(DEEP_SLEEP_FREQUENCY)}
            >
              Deep sleep 😴
            </Button>
            <Button
              colorScheme="gray"
              marginBottom="2"
              marginRight="2"
              size="lg"
              onClick={() => setFrequency(MEDITATION_FREQUENCY)}
            >
              Meditate/Sleep 🧘‍♀️
            </Button>
            <Button
              colorScheme="gray"
              marginBottom="2"
              marginRight="2"
              size="lg"
              onClick={() => setFrequency(RELAXATION_FREQUENCY)}
            >
              Relaxation/Dreaming 💆‍♂️
            </Button>
            <Button
              colorScheme="gray"
              marginBottom="2"
              marginRight="2"
              size="lg"
              onClick={() => setFrequency(CONCENTRATION_FREQUENCY)}
            >
              Concentration/Work 🧠
            </Button>
            <Button
              colorScheme="gray"
              marginBottom="2"
              marginRight="2"
              size="lg"
              onClick={() => setFrequency(PROBLEM_SOLVING_FEQUENCY)}
            >
              Problem solving 🪄
            </Button>
          </Flex>
        </VStack>
      </VStack>
    </Center>
  )
}

export default RightSide
