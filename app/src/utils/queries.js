import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      movieMingles{
        _id
        movie {
          title
          image
          genre
        }
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getUsers {
    getUsers {
      _id
      username
      email
    }
  }
`;

export const GET_MINGLE_BY_ID = gql`
  query getMingleById($mingleId: ID!) {
    getMingleById(mingleId: $mingleId) {
      _id
      movie {
        title
        image
        genre
      }
      time
      invites {
        _id
        username
        email
        mingleCount
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
query user($userId: ID!) {
  user(userId: $userId) {
    _id
    username
    email
    thoughts {
      _id
      thoughtText
      createdAt
    }
  }
}
`;

export const GET_MINGLES_FOR_USER= gql`
  query getMinglesForUser($userId: ID!) {
    getUserMinglesById(userId: $userId) {
      _id
      movie {
        title
        image
        genre
      }
      time
      invites {
        _id
        username
        email
        mingleCount
        movieMingles {
          _id
          movie {
            title
            image
            genre
          }
          time
        }
      }
    }
  }
`;