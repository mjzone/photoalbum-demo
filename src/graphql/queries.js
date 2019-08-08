// eslint-disable
// this is an auto generated file. This will be overwritten

export const getAlbum = `query GetAlbum($id: ID!) {
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
      }
      nextToken
    }
  }
}
`;
export const listAlbums = `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      owner
      createdAt
      pictures {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPicture = `query GetPicture($id: ID!) {
  getPicture(id: $id) {
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
export const listPictures = `query ListPictures(
  $filter: ModelPictureFilterInput
  $limit: Int
  $nextToken: String
) {
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
