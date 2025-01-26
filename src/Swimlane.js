import React from 'react';
import Card from './Card';
import './Swimlane.css';
import dragula from 'dragula';

export default class Swimlane extends React.Component {
  componentDidMount() {
    const swimlanes = document.querySelectorAll('.Swimlane-column');
    const drake = dragula(swimlanes, {
      moves: true,
      accepts: (el, target, source, sibling) => {
        // Allow cards to be moved between swimlanes
        return true;
      },
      revertOnSpill: true,
    });

    drake.on('drop', (el, target, source, sibling) => {
      const swimlaneId = target.id;
      const card = el;

      // Update card color based on swimlane
      if (swimlaneId === 'backlog-swimlane') {
        card.classList.remove('in-progress', 'complete');
        card.classList.add('backlog');
      } else if (swimlaneId === 'in-progress-swimlane') {
        card.classList.remove('backlog', 'complete');
        card.classList.add('in-progress');
      } else if (swimlaneId === 'complete-swimlane') {
        card.classList.remove('backlog', 'in-progress');
        card.classList.add('complete');
      }
    });
  }

  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
        />
      );
    })
    return (
      <div className="Swimlane-column" id={this.props.name}>
        <div className="Swimlane-title">{this.props.name}</div>
        <div className="Swimlane-dragColumn">
          {cards}
        </div>
      </div>
    );
  }
}