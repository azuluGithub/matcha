import React, { Component } from 'react';
import Card from './Card';

class MatchesDetails extends Component {
    render() {
      return <React.Fragment>        
          {
            this.props.users_matches && this.props.users_matches.map(user => <Card key={Math.random() * 100000} user={user} auth={this.props.auth}/>) 
          }
        </React.Fragment>
    }
}

export default MatchesDetails;
