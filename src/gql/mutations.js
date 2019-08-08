import gql from "graphql-tag";

export const createAlbum = gql`
  mutation CreateAlbum($input: CreateAlbumInput!) {
    createAlbum(input: $input) {
      id
      title
      owner
      createdAt
    }
  }
`;

export const createPicture = gql`
  mutation CreatePicture($input: CreatePictureInput!) {
    createPicture(input: $input) {
      id
      name
      owner
      visibility
      file {
        bucket
        region
        key
      }
      createdAt
      album {
        id
        title
        owner
        createdAt
        pictures {
          nextToken
        }
      }
    }
  }
`;
