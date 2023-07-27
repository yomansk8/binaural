import React, { Component } from "react"
import PropTypes from "prop-types"
import FrequencySelector from "../FrequencySelector"
import "./style.css"

const DROPS_NUMBER = 150
const MESSAGE_DURATION = 15000
const MESSAGES = [
  "Binaural is a completely free and open source binaural beat generator.",
  "Select the desired effect/mood from deep sleeping to problems solving.",
  "For a better experience, please put on a headset or headphones.",
  "Have you tried to turn on the rain? It makes it easier for some peoples to listen to binaural beats.",
]

class Visualizer extends Component {
  constructor() {
    super()
    this.state = {
      messages: MESSAGES,
    }
  }

  nextMessage = () => {
    const { messages } = this.state
    const turningMessage = messages.shift()
    this.setState({ messages: [...messages, turningMessage]})
  }

  startRain() {
    const rainSection = document.getElementById("rain")

    for (let i = 1; i < DROPS_NUMBER; i++) {
      const dropLeft = this.randRange(0, window.screen.width)
      const dropTop = this.randRange(-1000, 1400)

      const drop = document.createElement("div")

      drop.setAttribute("class", `drop ${this.props.rain ? "" : "hidden"}`)
      drop.setAttribute("id", `drop${i}`)

      rainSection.appendChild(drop)

      drop.style.left = `${dropLeft}px`
      drop.style.top = `${dropTop}px`
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rain !== this.props.rain) {
      this.stopRain()
      this.startRain()
    }
  }

  stopRain() {
    const rainSection = document.getElementById("rain")

    while (rainSection.hasChildNodes()) {
      rainSection.removeChild(rainSection.lastChild)
    }
  }

  randRange(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
  }

  componentDidMount() {
    this.interval = setInterval(this.nextMessage, MESSAGE_DURATION)
    this.startRain()
  }

  render() {
    const { actualFrequency, onFrequencyChange } = this.props
    return (
      <div className="visualizer">
        <div id="rain" />
        <p className="turningMessage">{this.state.messages[0]}</p>
        <br/><br/>
        <FrequencySelector actualFrequency={actualFrequency} onFrequencyChange={onFrequencyChange} />
      </div>
    )
  }
}

Visualizer.propTypes = {
  actualFrequency: PropTypes.number.isRequired,
  onFrequencyChange: PropTypes.func.isRequired,
  rain: PropTypes.bool.isRequired,
  range: PropTypes.string.isRequired,
}

export default Visualizer
