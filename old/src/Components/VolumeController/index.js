import React, { Component } from "react"
import PropTypes from "prop-types"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import "./style.css"

class VolumeController extends Component {
  getIcon = volume => {
    if (volume === -10) {
      return <FontAwesomeIcon icon="volume-off" />
    }
    if (volume > -10 && volume < 5) {
      return <FontAwesomeIcon icon="volume-down" />
    }
    return <FontAwesomeIcon icon="volume-up" />
  }

  render() {
    const { volume, onVolumeChange } = this.props
    return (
      <div>
        {this.getIcon(volume)} <input type="range" min="-10" step="0.5" max="10" value={volume} onChange={onVolumeChange} />
      </div>
    )
  }
}

VolumeController.propTypes = {
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
}

export default VolumeController
