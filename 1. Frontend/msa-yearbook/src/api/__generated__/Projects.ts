/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Year } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Projects
// ====================================================

export interface Projects_projects_pageInfo {
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

export interface Projects_projects_edges {
  __typename: "ProjectEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
}

export interface Projects_projects_nodes {
  __typename: "Project";
  id: string;
  name: string;
  description: string;
  link: string;
  year: Year;
  modified: any;
  created: any;
}

export interface Projects_projects {
  __typename: "ProjectConnection";
  /**
   * Information to aid in pagination.
   */
  pageInfo: Projects_projects_pageInfo;
  /**
   * A list of edges.
   */
  edges: Projects_projects_edges[] | null;
  /**
   * A flattened list of the nodes.
   */
  nodes: Projects_projects_nodes[] | null;
}

export interface Projects {
  projects: Projects_projects | null;
}

export interface ProjectsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
