import { gql } from "@apollo/client";
import * as fragments from "./fragments";

export const LOGIN = gql`
  mutation Login($code: String!) {
    login(input: { code: $code }) {
      student {
        ...studentFields
      }
      jwt
    }
  }
  ${fragments.STUDENT}
`;

export const EDIT_SELF = gql`
  mutation EditSelf($name: String, $imageURI: String) {
    editSelf(input: { name: $name, imageURI: $imageURI }) {
      ...studentFields
    }
  }
  ${fragments.STUDENT}
`;


export const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $link: String!
    $year: String!
  ) {
    addProject(input: { name: $name, description: $description, link: $link, year: $year }) {
      ...projectFields
    }
  }
  ${fragments.PROJECT}
`;

export const EDIT_PROJECT = gql`
  mutation EditProject(
    $projectId: ID!
    $name: String
    $description: String
    $link: String
  ) {
    editProject(
      input: {
        projectId: $projectId,
        name: $name,
        description: $description,
        link: $link
      }
    ) {
      ...projectFields
    }
  }
  ${fragments.PROJECT}
`;

export const ADD_COMMENT = gql`
  mutation AddComment(
    $content: String!,
    $projectId: ID!
  ) {
    addComment(input: { content: $content, projectId: $projectId }) {
      ...commentFields
    }
  }
  ${fragments.COMMENT}
`

export const EDIT_COMMENT = gql`
  mutation EditComment(
    $commentId: ID!,
    $content: String
  ) {
    editComment(input: { commentId: $commentId, content: $content}) {
      ...commentFields
    }
  }
  ${fragments.COMMENT}
`