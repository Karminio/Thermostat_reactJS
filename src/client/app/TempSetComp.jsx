import React from 'react';
import ReactDOM from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

class TempSetComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: props.temp,
      setTemp: 20.0
    };
  }

  decreaseSetTemp() {
    this.setState((prevState) => {setTemp: prevState.setTemp - 0.1});
  }

  increaseSetTemp() {
    this.setState((prevState) => {setTemp: prevState.setTemp + 0.1});
  }

  render() {
    return (
        <div>
            <Grid>
                <Row className="show-grid">
                    <Col xs={4} md={4}>
                        <h1>{this.props.temp}°C</h1>
                    </Col>
                    <Col xs={2} md={2}>
                                    <h3>{this.state.setTemp}°C</h3>
                                    </Col>
                    <Col xs={2} md={2}>
                     <ButtonGroup >
                        <Button bsSize="small" onClick={() => this.decreaseSetTemp()}>-</Button>
                        <Button bsSize="small" onClick={() => this.increaseSetTemp()}>+</Button>
                    </ButtonGroup>   
                    </Col>
                </Row>
            </Grid>
        </div>
    );
  }

}

export default TempSetComp;