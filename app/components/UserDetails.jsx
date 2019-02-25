import React, { Component } from 'react';

import { API } from '../config/index';
import { fetchStatusHandler } from '../helpers/fetchSatusHandler';

import Loading from './Loading';
import ErrorContainer from './ErrorContainer';

export default class UserDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      nextUrl: '',
      repos: []
    };

    this.loadRepos = this.loadRepos.bind(this);
    this.onListScroll = this.onListScroll.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
  }

  componentDidMount() {
    const userName = this.props.match.params.user_name;
    const { host, version } = API;

    this.loadRepos(`${host}/${version}/repositories/${userName}`);
  }

  loadRepos(url) {
    this.setState({ loading: true });

    fetch(url)
      .then(fetchStatusHandler)
      .then(response => response.json())
      .then(({ values, next }) => this.setState({ repos: values ? this.state.repos.concat(values) : [], nextUrl: next, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  }

  onListItemClick(repoSlug) {
    const userName = this.props.match.params.user_name;

    this.props.history.push(`/${userName}/${repoSlug}`);
  }

  onListScroll(event) {
    const scrollDiff = event.target.scrollHeight - event.target.scrollTop;

    if (scrollDiff <= 250 && !this.state.loading && this.state.nextUrl) {
      this.loadRepos(this.state.nextUrl);
    }
  }

  render() {
    let repos = (this.state.repos || []).map(({ name, slug }, index) => <li key={`repo-${index}`} className="list-item" title={name} onClick={() => this.onListItemClick(slug)}>{name}</li>);
    let content = '';

    if (repos.length){
      content = (
        <div>
          <h1 className="title">Projects</h1>
          <ul className="project-list" onScroll={this.onListScroll}>
            {repos}
          </ul>
        </div>
      );
    } else if (this.state.error) {
      content = <ErrorContainer message={this.state.error.message} />;
    } else if (this.state.loading) {
      content = <Loading />;
    } else {
      content = (
        <div className="no-results">
          <h1>No results</h1>
        </div>
      );
    }

    return (
      <div className="user-details">
        <div className="content-wrapper">
          {content}
        </div>
      </div>
    );
  }
}
