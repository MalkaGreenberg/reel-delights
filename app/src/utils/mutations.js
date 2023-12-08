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
  mutation addMingle($input: MingleInput!) {
    saveMingle(input: $input) {
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

export const REMOVE_MINGLE = gql`
  mutation removeMingle($mingleId: ID!) {
    removeMingle(mingleId: $mingleId) {
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
