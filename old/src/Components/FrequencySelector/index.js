import React, { Component } from "react"
import PropTypes from "prop-types"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import "./style.css"

const marks = {
  "0.5": (
    <div>
      Δ<br />0.5Hz
    </div>
  ),
  4: (
    <div>
      θ<br />4Hz
    </div>
  ),
  7: (
    <div>
      α<br />7Hz
    </div>
  ),
  13: (
    <div>
      β<br />13Hz
    </div>
  ),
  39: (
    <div>
      γ<br />39Hz
    </div>
  ),
}

class FrequencySelector extends Component {
  render() {
    const { actualFrequency, onFrequencyChange } = this.props
    return (
      <div style={{ width: "95%" }}>
        <Slider marks={marks} min={0.5} max={50} step={0.5} included={false} value={actualFrequency} onChange={onFrequencyChange} />
      </div>
    )
  }
}

FrequencySelector.propTypes = {
  actualFrequency: PropTypes.number.isRequired,
  onFrequencyChange: PropTypes.func.isRequired,
}

export default FrequencySelector
