import React, { Component } from 'react';
import { Tabs, Tab, Accordion, Panel, Input, Button } from 'react-bootstrap';

export default class Exercise extends Component {
	render() {
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>{this.props.location.query.name}</h3>
            <Tabs defaultActiveKey={1} animation={false} justified>
              <Tab eventKey={1} title="Current">
                <Accordion>
                  <Panel header="Set #1" eventKey="1">
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
                  <Panel header="Set #2" eventKey="2">
                    lol2
                  </Panel>
                  <Panel header="Set #3" eventKey="3">
                    lol3
                  </Panel>
                </Accordion>
              </Tab>
              <Tab eventKey={2} title="Previous results">Tab 2 content</Tab>
            </Tabs>
          </div>
        </div>
      </div>
		);
	}
}