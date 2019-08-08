// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateAlbum = `subscription OnCreateAlbum {
  onCreateAlbum {
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
export const onUpdateAlbum = `subscription OnUpdateAlbum {
  onUpdateAlbum {
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
export const onDeleteAlbum = `subscription OnDeleteAlbum {
  onDeleteAlbum {
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
export const onCreatePicture = `subscription OnCreatePicture {
  onCreatePicture {
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
export const onUpdatePicture = `subscription OnUpdatePicture {
  onUpdatePicture {
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
export const onDeletePicture = `subscription OnDeletePicture {
  onDeletePicture {
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
