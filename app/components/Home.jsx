import React, { Component } from 'react';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchVal: ''
    };

    this.onCheckClick = this.onCheckClick.bind(this);
    this.onSearchKeyUp = this.onSearchKeyUp.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchVal: event.target.value });
  }

  onSearchKeyUp(event) {
    if (event.which === 13 && this.state.searchVal !== '') {
      this.props.history.push(`/${this.sanitizeSearch(this.state.searchVal)}`);
    }
  }

  onCheckClick() {
    this.props.history.push(`/${this.sanitizeSearch(this.state.searchVal)}`);
  }

  sanitizeSearch(searchTerm) {
    return searchTerm.replace(/ /g, '-');
  }

  render() {
    return (
      <div className="home-page">
        <div className="form-wrapper">
          <input type="text" placeholder="Enter Github Username" value={this.state.searchVal} onChange={this.onSearchChange} onKeyUp={this.onSearchKeyUp} />
          <span className="check-icon" onClick={this.onCheckClick} />
        </div>
      </div>
    );
  }
}
