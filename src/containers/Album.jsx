import React, { Component } from "react";
import { Form, Container, Grid, Card, Image } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { graphql, compose } from "react-apollo";
import { graphqlMutation } from "aws-appsync-react";
import { Auth } from "aws-amplify";

import { buildSubscription } from "aws-appsync";

import { createAlbum } from "../gql/mutations";
import { onCreateAlbum } from "../gql/subscriptions";
import { listAlbums } from "../gql/queries";

dayjs.extend(relativeTime);
class Album extends Component {
  state = { owner: "", title: "" };

  componentDidMount = async () => {
    this.props.data.subscribeToMore(buildSubscription(onCreateAlbum, listAlbums));

    // loading currently loggedin user
    const { username: owner } = await Auth.currentUserInfo();
    this.setState({ owner });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const id = uuid();
    const { title, owner } = this.state;
    const createdAt = new Date().toISOString();

    this.props.createAlbum({
      input: {
        id,
        title,
        owner,
        createdAt
      }
    });
    this.setState({ title: "" });
  };

  handleChange = (e, { value }) => {
    this.setState({ title: value });
  };

  handleAlbumClick = album => {
    this.props.history.push(`/album/${album.id}`);
  };

  render() {
    return (
      <React.Fragment>
        <fieldset>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                label="Album Title"
                type="text"
                placeholder="Album Title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <Form.Button
                icon
                labelPosition="right"
                label="Create Album"
                type="submit"
                disabled={!this.state.title.length}
              >
                Create Album
              </Form.Button>
            </Form.Group>
          </Form>
        </fieldset>

        <Grid className="albumGrid">
          <Card.Group itemsPerRow={6} className="albumGroup">
            {this.props.albums.map((album, index) => (
              <Card color="orange" key={index} onClick={() => this.handleAlbumClick(album)}>
                <Image src="/images/color-album.svg" wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{album.title}</Card.Header>
                  <Card.Meta>
                    <span className="date"> {dayjs(album.createdOn).fromNow()}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid>
      </React.Fragment>
    );
  }
}

export default compose(
  graphqlMutation(createAlbum, listAlbums, "Album"),
  graphql(listAlbums, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: props => ({
      albums: props.data.listAlbums ? props.data.listAlbums.items : [],
      data: props.data
    })
  })
)(Album);
