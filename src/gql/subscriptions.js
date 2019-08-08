import gql from "graphql-tag";

export const onCreateAlbum = gql`
  subscription OnCreateAlbum {
    onCreateAlbum {
      id
      title
      owner
      createdAt
    }
  }
`;
