import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { graphql, compose } from "react-apollo";
import { Form, Icon, Table, Button, Loader, Segment } from "semantic-ui-react";
import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";
import { createPicture } from "../gql/mutations";
import { getAlbum } from "../gql/queries";
import config from "../aws-exports";

class AlbumPhotos extends Component {
  state = {
    name: "",
    file: undefined
  };

  handleSubmit = async e => {
    e.preventDefault();
    const visibility = "private";
    const bucket = config.aws_user_files_s3_bucket;
    const region = config.aws_user_files_s3_bucket_region;
    const id = uuid();
    const { name, file: selectedFile } = this.state;
    const { identityId } = await Auth.currentCredentials();
    const { username: owner } = await Auth.currentUserInfo();
    const createdAt = new Date().toISOString();
    const pictureAlbumId = this.props.match.params.id;

    let file;
    if (selectedFile) {
      const { name: fileName, type: mimeType } = selectedFile;
      const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(fileName);
      const key = `${visibility}/${identityId}/${uuid()}${extension && "."}${extension}`;

      file = {
        bucket,
        key,
        region,
        mimeType,
        localUri: selectedFile
      };
    }

    this.props.createPicture({
      id,
      name,
      owner,
      visibility,
      file,
      createdAt,
      pictureAlbumId
    });
  };

  handleDownload = async ({ visibility: level, file }) => {
    try {
      const { bucket, region, key } = file;
      const [, , keyWithoutPrefix] = /([^/]+\/){2}(.*)$/.exec(key) || key;
      const url = await Storage.get(keyWithoutPrefix, { bucket, region, level });
      window.open(url);
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (field, event) => {
    const {
      target: { value, files }
    } = event;
    const [file] = files || [];
    this.setState({ [field]: file || value });
  };

  handleBackClick = album => {
    this.props.history.push("/albums");
  };

  render() {
    const isSubmitEnabled = this.state.name.length && !!this.state.file;
    return (
      <React.Fragment>
        <Segment.Group raised>
          <Segment clearing>
            <Button icon labelPosition="left" onClick={this.handleBackClick}>
              Back
              <Icon name="left arrow" />
            </Button>
          </Segment>
          <Segment color="orange">
            <h1>{this.props.title} </h1>
          </Segment>
        </Segment.Group>

        <fieldset>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                label="Photo Title"
                type="text"
                placeholder="Photo Title"
                value={this.state.name}
                onChange={this.handleChange.bind(this, "name")}
              />
              <Form.Input
                key={this.state.lastUpdate}
                label="Select Photo"
                type="file"
                onChange={this.handleChange.bind(this, "file")}
              />
              <Form.Button icon labelPosition="right" label="Upload" type="submit" disabled={!isSubmitEnabled}>
                <Icon name="upload" />
                Upload Photo
              </Form.Button>
            </Form.Group>
          </Form>
        </fieldset>
        <Table celled={true}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Icon name={"info"} />
                Title
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Icon name={"user"} />
                Owner
              </Table.HeaderCell>
              <Table.HeaderCell>
                 <Icon name={"download"} />
                Download
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.photos &&
              this.props.photos.items &&
              []
                .concat(this.props.photos.items)
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map(photo => (
                  <Table.Row key={photo.id}>
                    <Table.Cell>{photo.name}</Table.Cell>
                    <Table.Cell>{photo.owner}</Table.Cell>
                    <Table.Cell>
                      {photo.file ? (
                        <Button icon labelPosition="right" onClick={() => this.handleDownload(photo)}>
                          <Icon name="download" />
                          Download
                        </Button>
                      ) : (
                        <Loader inline="centered" active size="tiny" />
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(createPicture, {
    options: props => ({
      update: (proxy, { data: { createPicture } }) => {
        const query = getAlbum;
        const variables = {
          id: props.match.params.id
        };
        const data = proxy.readQuery({ query, variables });
        data.getAlbum.pictures.items = [
          ...data.getAlbum.pictures.items.filter(photo => photo.id !== createPicture.id),
          createPicture
        ];
        proxy.writeQuery({ query, data });
      }
    }),
    props: props => ({
      createPicture: photo =>
        props.mutate({
          variables: { input: photo },
          optimisticResponse: () => ({
            createPicture: {
              ...photo,
              id: uuid(),
              __typename: "Picture",
              file: { ...photo.file, __typename: "S3Object" }
            }
          })
        })
    })
  }),
  graphql(getAlbum, {
    options: props => ({
      fetchPolicy: "cache-and-network",
      variables: {
        id: props.match.params.id
      }
    }),
    props: props => ({
      title: props.data.getAlbum ? props.data.getAlbum.title : "Loading",
      photos: props.data.getAlbum ? props.data.getAlbum.pictures : []
    })
  })
)(AlbumPhotos);
