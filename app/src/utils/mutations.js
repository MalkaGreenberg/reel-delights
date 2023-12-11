import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MINGLE = gql`
  mutation addMingle($input: MingleInput!, $userId: ID!) {
    saveMingle(input: $input, userId: $userId) {
      _id
      movieMingles {
        movie {
          title
          image
          genre
        }
        time
        invites {
          _id
          username
        }
      }
    }
  }
`;

export const REMOVE_MINGLE = gql`
  mutation removeMingle($mingleId: ID!, $userId: ID!) {
    removeMingle(mingleId: $mingleId,  userId: $userId) {
      _id
      movieMingles {
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
        }
      }
    }
}
`;
