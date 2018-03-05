import React, { Component } from "react"
import PropTypes from "prop-types"
import { Grid, Row, Col } from "react-flexbox-grid"
import "./style.css"

class Header extends Component {
  getDescription = range => {
    switch (range) {
      case "delta":
        return "Delta range/Deep sleep"
      case "theta":
        return "Theta range/Meditation/Sleep"
      case "alpha":
        return "Alpha range/Relaxation/Dreams"
      case "beta":
        return "Beta range/Activity"
      case "gamma":
        return "Gamma range/Problem solving"
      default:
        return ""
    }
  }

  render() {
    const { actualFrequency, range } = this.props
    return (
      <header className="header">
        <Grid fluid>
          <Row>
            <Col xs={12} md={3}>
              <h1 className="title">Binaural</h1>
            </Col>
            <Col xs={12} md={6}>
              <div className="description">{this.getDescription(range)}</div>
            </Col>
            <Col xs={12} md={3}>
              <div className="frequency">{actualFrequency}Hz</div>
            </Col>
          </Row>
        </Grid>
      </header>
    )
  }
}

Header.propTypes = {
  actualFrequency: PropTypes.number.isRequired,
  range: PropTypes.string.isRequired,
}

export default Header
