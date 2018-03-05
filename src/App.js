import React, { Component } from "react"
import Tone from "tone"
import fontawesome from "@fortawesome/fontawesome"
import faVolumeOff from "@fortawesome/fontawesome-free-solid/faVolumeOff"
import faVolumeDown from "@fortawesome/fontawesome-free-solid/faVolumeDown"
import faVolumeUp from "@fortawesome/fontawesome-free-solid/faVolumeUp"
import faPlay from "@fortawesome/fontawesome-free-solid/faPlay"
import faPause from "@fortawesome/fontawesome-free-solid/faPause"
import faUmbrella from "@fortawesome/fontawesome-free-solid/faUmbrella"
import faSun from "@fortawesome/fontawesome-free-solid/faSun"
import faInfo from "@fortawesome/fontawesome-free-solid/faInfo"
import faBed from "@fortawesome/fontawesome-free-solid/faBed"
import faFire from "@fortawesome/fontawesome-free-solid/faFire"
import Header from "./Components/Header"
import Visualizer from "./Components/Visualizer"
import Controls from "./Components/Controls"
import "./App.css"

// Init FontAwesome Library
fontawesome.library.add(faVolumeOff, faVolumeDown, faVolumeUp, faPlay, faPause, faUmbrella, faSun, faInfo, faBed, faFire)

const split = new Tone.Merge().toMaster()
const leftEar = new Tone.Oscillator()
const rightEar = new Tone.Oscillator()
const rainMaker = new Tone.Noise("pink").start().toMaster()
leftEar.connect(split.left)
rightEar.connect(split.right)

const INITIAL_FREQ = 10

class App extends Component {
  constructor() {
    super()
    this.state = {
      ...this.calculateFrequencies(INITIAL_FREQ),
      actualFrequency: INITIAL_FREQ,
      volume: 0,
      playing: false,
      rainVolume: -10,
      range: this.getRange(INITIAL_FREQ),
    }
  }

  componentDidMount = () => {
    // split.chain(volume, Tone.master)
    this.setFrequencies()
    this.setVolume()
    this.setRainVolume()
  }

  setVolume = () => {
    Tone.Master.set("volume", this.state.volume)
    Tone.Master.set("mute", this.state.volume === -10 ? true : false)
  }

  setRainVolume = () => {
    rainMaker.set("volume", this.state.rainVolume)
    rainMaker.set("mute", this.state.rainVolume === -10 ? true : false)
  }

  setFrequencies = () => {
    const { leftFrequency, rightFrequency } = this.state
    leftEar.set("frequency", leftFrequency)
    rightEar.set("frequency", rightFrequency)
  }

  calculateCarrierFrequency = binauralBeat => {
    // Formula retrieved by using excel on Oster's curve. Can be enhanced with real maths ;)
    // y = -0,2085x2 + 18,341x + 56,31
    return -0.2085 * Math.pow(binauralBeat, 2) + 18.341 * binauralBeat + 56.31
  }

  calculateFrequencies = binauralBeat => {
    const carrierFreq = this.calculateCarrierFrequency(binauralBeat)
    return {
      leftFrequency: carrierFreq + binauralBeat / 2,
      rightFrequency: carrierFreq - binauralBeat / 2,
    }
  }

  handleFrequencyChange = event => {
    const actualFrequency = parseInt(event.target.value, 10)
    const { leftFrequency, rightFrequency } = this.calculateFrequencies(actualFrequency)
    this.setState({ actualFrequency, leftFrequency, rightFrequency, range: this.getRange(actualFrequency) }, this.setFrequencies)
  }

  handlePlayBtn = event => {
    this.setState({ playing: !this.state.playing }, () => {
      this.state.playing ? this.play() : this.stop()
    })
  }

  onRainVolumeChange = event => {
    this.setState({ rainVolume: parseInt(event.target.value, 10) }, this.setRainVolume)
  }

  handleVolumeChange = event => {
    this.setState({ volume: parseInt(event.target.value, 10) }, this.setVolume)
  }

  play = () => {
    leftEar.start()
    rightEar.start()
  }

  stop = () => {
    leftEar.stop()
    rightEar.stop()
  }

  getRange = frequency => {
    if (frequency < 4) {
      return "delta"
    }
    if (frequency >= 4 && frequency < 7) {
      return "theta"
    }
    if (frequency >= 7 && frequency < 13) {
      return "alpha"
    }
    if (frequency >= 13 && frequency < 39) {
      return "beta"
    }
    if (frequency >= 39) {
      return "gamma"
    }
  }

  render() {
    const { actualFrequency, playing, rainVolume, volume, range } = this.state
    return (
      <div className={`App ${range}`}>
        <Header actualFrequency={actualFrequency} range={range} />
        <Visualizer
          actualFrequency={actualFrequency}
          onFrequencyChange={this.handleFrequencyChange}
          rain={rainVolume > -10 ? true : false}
          range={range}
        />
        <Controls
          onVolumeChange={this.handleVolumeChange}
          volume={volume}
          onPlayBtnClick={this.handlePlayBtn}
          playing={playing}
          onRainVolumeChange={this.onRainVolumeChange}
          rainVolume={rainVolume}
        />
      </div>
    )
  }
}

export default App
