import gql from "graphql-tag";

export const getAlbum = gql`
  query GetAlbum($id: ID!) {
    getAlbum(id: $id) {
      id
      title
      owner
      createdAt
      pictures {
        items {
          id
          name
          owner
          visibility
          createdAt
          file {
            bucket
            region
            key
          }
        }
        nextToken
      }
    }
  }
`;
export const listAlbums = gql`
  query ListAlbums($filter: ModelAlbumFilterInput, $limit: Int, $nextToken: String) {
    listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        owner
        createdAt
      }
      nextToken
    }
  }
`;

export const listPictures = gql`
  query ListPictures($filter: ModelPictureFilterInput, $limit: Int, $nextToken: String) {
    listPictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
      }
      nextToken
    }
  }
`;
