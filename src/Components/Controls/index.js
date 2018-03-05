import React, { Component } from "react"
import PropTypes from "prop-types"
import { Grid, Row, Col } from "react-flexbox-grid"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import PlayButton from "../PlayButton"
import RainButton from "../RainButton"
import VolumeController from "../VolumeController"
import "./style.css"

class Controls extends Component {
  render() {
    const { onVolumeChange, volume, onPlayBtnClick, playing, rainVolume, onRainVolumeChange } = this.props
    return (
      <footer className="controls">
        <Grid fluid>
          <Row middle="xs">
            <Col xs={0} md={2} />
            <Col xs={12} md={8}>
              <Grid fluid>
                <Row middle="xs">
                  <Col xs={4}>
                    <VolumeController onVolumeChange={onVolumeChange} volume={volume} />
                  </Col>
                  <Col xs={4}>
                    <PlayButton onPlayBtnClick={onPlayBtnClick} playing={playing} />
                  </Col>
                  <Col xs={4}>
                    <RainButton onRainVolumeChange={onRainVolumeChange} rainVolume={rainVolume} />
                  </Col>
                </Row>
              </Grid>
            </Col>
            <Col xs={12} md={2}>
              <div className="clickable" style={{ textAlign: "right" }}>
                <FontAwesomeIcon icon="info" />
              </div>
            </Col>
          </Row>
        </Grid>
      </footer>
    )
  }
}

Controls.propTypes = {
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  onPlayBtnClick: PropTypes.func.isRequired,
  rainVolume: PropTypes.number.isRequired,
  onRainVolumeChange: PropTypes.func.isRequired,
}

export default Controls
