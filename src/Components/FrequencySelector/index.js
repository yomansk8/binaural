import React, { Component } from "react"
import PropTypes from "prop-types"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import "./style.css"

class FrequencySelector extends Component {
  render() {
    const { actualFrequency, onFrequencyChange } = this.props
    return (
      <div>
        <FontAwesomeIcon icon="bed" /> <input
          className="frequencySelector"
          type="range"
          min="0.5"
          step="0.1"
          max="50"
          value={actualFrequency}
          onChange={onFrequencyChange}
        /> <FontAwesomeIcon icon="fire" />
      </div>
    )
  }
}

FrequencySelector.propTypes = {
  actualFrequency: PropTypes.number.isRequired,
  onFrequencyChange: PropTypes.func.isRequired,
}

export default FrequencySelector
