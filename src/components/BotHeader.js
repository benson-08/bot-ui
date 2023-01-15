import React, { Component } from 'react';

export default class BotHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <>
            <div className="logoArea">
                <img alt="Logo" src='https://immobilien-bot.de/wp-content/uploads/2023/01/immobilien-bot-error.png' height={this.props.height} />
            </div>
        </>
    );
  }
}
