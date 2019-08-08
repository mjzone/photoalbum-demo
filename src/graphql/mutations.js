// eslint-disable
// this is an auto generated file. This will be overwritten

export const createAlbum = `mutation CreateAlbum($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
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
export const updateAlbum = `mutation UpdateAlbum($input: UpdateAlbumInput!) {
  updateAlbum(input: $input) {
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
export const deleteAlbum = `mutation DeleteAlbum($input: DeleteAlbumInput!) {
  deleteAlbum(input: $input) {
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
export const createPicture = `mutation CreatePicture($input: CreatePictureInput!) {
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
export const updatePicture = `mutation UpdatePicture($input: UpdatePictureInput!) {
  updatePicture(input: $input) {
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
export const deletePicture = `mutation DeletePicture($input: DeletePictureInput!) {
  deletePicture(input: $input) {
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
