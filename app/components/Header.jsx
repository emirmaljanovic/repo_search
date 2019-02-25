import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'

class Header extends Component {

  constructor(props) {
    super(props);

    this.onBackClick = this.onBackClick.bind(this);
  }

  onBackClick() {
    // this.props.history.push('/');
    this.props.history.goBack();
  }

  render() {
    const showBackBtn = this.props.history.location.pathname !== '/';

    return (
      <header>
        { showBackBtn ?
          <div className="action-button">
            <button className="back-btn" onClick={this.onBackClick} />
          </div>
          : null
        }
        <div className="title">
          <Link to="/">GitHub Demo Project</Link>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);