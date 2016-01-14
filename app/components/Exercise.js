import React, { Component } from 'react';
import Timer from './Timer';
import { Tabs, Tab, Accordion, Panel, Input, Button } from 'react-bootstrap';

export default class Exercise extends Component {
  state = {
    setCount: 3
  }
  setCountChange = (event) => {
    this.setState({setCount: event.target.options[event.target.selectedIndex].value});
  }
	render = () => {
    let sets = [];
    for (let i = 1; i <= this.state.setCount; i++) {
      sets.push(
        <Panel header={`Set #${i}`} eventKey={i}>
          <Input type="select" addonAfter="kg">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </Input>
          <Input type="select" addonAfter="reps">
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </Input>
          <Button block>Done</Button>
        </Panel>
      );
    }
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>{this.props.location.query.name}</h3>
            <Tabs defaultActiveKey={1} animation={false} justified>
              <Tab eventKey={1} title="Current">
                <Input label="Sets" type="select" onChange={this.setCountChange}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Input>
                <Accordion>
                  {sets}
                </Accordion>
                <Button block>Add results</Button>
              </Tab>
              <Tab eventKey={2} title="Previous results">
                <Accordion>
                  <Panel header="23.1.2016" eventKey="1">
                    1. 10 x 30kg
                  </Panel>
                  <Panel header="Set #2" eventKey="2">
                    lol2
                  </Panel>
                  <Panel header="Set #3" eventKey="3">
                    lol3
                  </Panel>
                </Accordion>
              </Tab>
              <Tab eventKey={3} title="Timer">
              <Timer></Timer>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
		);
	}
}
