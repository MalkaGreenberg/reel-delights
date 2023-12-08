import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      movieMingles {
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

export const GET_MINGLE_BY_ID = gql`
  query getMingleById($mingleId: ID!) {
    mingleById(mingleId: $mingleId) {
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
