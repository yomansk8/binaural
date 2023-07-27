import React, { Component } from "react"
import PropTypes from "prop-types"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import "./style.css"

class PlayButton extends Component {
  getIcon = playing => {
    if (playing) {
      return <FontAwesomeIcon icon="pause" />
    }
    return <FontAwesomeIcon icon="play" />
  }

  render() {
    const { onPlayBtnClick, playing } = this.props
    return (
      <div className="clickable playBtn" onClick={onPlayBtnClick}>
        {this.getIcon(playing)}
      </div>
    )
  }
}

PlayButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  onPlayBtnClick: PropTypes.func.isRequired,
}

export default PlayButton
