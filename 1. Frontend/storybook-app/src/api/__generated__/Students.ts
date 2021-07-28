/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Students
// ====================================================

export interface Students_students_pageInfo {
  __typename: "PageInfo";
  /**
   * Indicates whether more edges exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
  /**
   * Indicates whether more edges exist prior the set defined by the clients arguments.
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface Students_students_edges {
  __typename: "StudentEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
}

export interface Students_students_nodes {
  __typename: "Student";
  id: string;
  name: string;
  gitHub: string;
  imageURI: string;
}

export interface Students_students {
  __typename: "StudentConnection";
  /**
   * Information to aid in pagination.
   */
  pageInfo: Students_students_pageInfo;
  /**
   * A list of edges.
   */
  edges: Students_students_edges[] | null;
  /**
   * A flattened list of the nodes.
   */
  nodes: Students_students_nodes[] | null;
}

export interface Students {
  students: Students_students | null;
}

export interface StudentsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
