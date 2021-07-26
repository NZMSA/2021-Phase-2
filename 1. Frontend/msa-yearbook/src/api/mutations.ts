import { gql } from "@apollo/client";
import * as fragments from "./fragments";

export const LOGIN = gql`
  mutation Login($name: String, $imageURI: String) {
    editStudent(input: { name: $name, imageURI: $imageURI }) {
      student {
        ...studentFields
      }
      jwt
    }
  }
  ${fragments.STUDENT}
`;

export const EDIT_STUDENT = gql`
  mutation EditStudent($name: String, $imageURI: String) {
    editStudent(input: { name: $name, imageURI: $imageURI }) {
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
    addProject(input: { name: $name, description: $description, link: $link }) {
      ...projectFields
    }
  }
  ${fragments.PROJECT}
`;

export const EDIT_PROJECT = gql`
  mutation EditProject(
    $projectId: String!
    $name: String
    $description: String
    $link: String
  ) {
    editProject(
      input: {
        project: $projectId
        name: $name
        description: $description
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
    $projectId: String!
  ) {
    addComment(input: { content: $content, projectId: $projectId }) {
      ...commentFields
    }
  }
  ${fragments.COMMENT}
`

export const EDIT_COMMENT = gql`
  mutation EditComment(
    $commentId: String!,
    $content: String
  ) {
    editComment(input: { commentId: $commentId, content: $content}) {
      ...commentFields
    }
  }
  ${fragments.COMMENT}
`