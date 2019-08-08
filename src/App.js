import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

// Containers
import Album from "./containers/Album";
import AlbumPhotos from "./containers/AlbumPhotos";

//Amplify
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";

//AppSync and Apollo libraries
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";

import config from "./aws-exports";

// Amplify init
Amplify.configure(config);

// AppSync client instantiation
const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_authenticationType,
    // Get the currently logged in users credential.
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  // Amplify uses Amazon IAM to authorize calls to Amazon S3. This provides the relevant IAM credentials.
  complexObjectsCredentials: () => Auth.currentCredentials()
});

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/albums" component={Album} />
          <Route exact path="/album/:id" component={AlbumPhotos} />
          <Redirect from="/" to="/albums" />
        </Switch>
      </Router>
    );
  }
}

const AppWithAuth = withAuthenticator(App, true);

export default () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <AppWithAuth />
    </Rehydrated>
  </ApolloProvider>
);
