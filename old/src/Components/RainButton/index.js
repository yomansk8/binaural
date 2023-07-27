import React, { Component } from "react"
import PropTypes from "prop-types"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import "./style.css"

class RainButton extends Component {
  getIcon = volume => {
    if (volume === -10) {
      return <FontAwesomeIcon icon="sun" />
    }
    return <FontAwesomeIcon icon="umbrella" />
  }

  render() {
    const { rainVolume, onRainVolumeChange } = this.props
    return (
      <div>
        {this.getIcon(rainVolume)} <input type="range" min="-10" step="0.5" max="10" value={rainVolume} onChange={onRainVolumeChange} />
      </div>
    )
  }
}

RainButton.propTypes = {
  rainVolume: PropTypes.number.isRequired,
  onRainVolumeChange: PropTypes.func.isRequired,
}

export default RainButton
