import React, { Component } from 'react';

import { Markdown } from 'react-showdown';
import { API } from '../config/index';
import { fetchStatusHandler } from '../helpers/fetchSatusHandler';

import Loading from './Loading';
import ErrorContainer from './ErrorContainer';

export default class Project extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      readme: ''
    };

    this.onListItemClick = this.onListItemClick.bind(this);
  }

  componentDidMount() {
    const userName = this.props.match.params.user_name;
    const repoSlug = this.props.match.params.project_name;
    const { host, version } = API;

    this.setState({ loading: true })

    fetch(`${host}/${version}/repositories/${userName}/${repoSlug}/src/master/README.md`)
      .then(fetchStatusHandler)
      .then(response => response.text())
      .then(data => this.setState({ readme: data, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  }

  onListItemClick(repoSlug) {
    const userName = this.props.match.params.user_name;

    this.props.history.push(`/${userName}/${repoSlug}`);
  }

  render() {
    let content = '';

    if (this.state.loading) {
      content = <Loading />;
    } else if (this.state.error) {
      content = <ErrorContainer message={this.state.error.message} />;
    } else {
      content = (
        <div className="readme">
          <Markdown markup={this.state.readme} />
        </div>
      );
    }

    return (
      <div className="project-details">
        <div className="content-wrapper">
          {content}
        </div>
      </div>
    );
  }
}
