/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Year } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Project
// ====================================================

export interface Project_project {
  __typename: "Project";
  id: string;
  name: string;
  description: string;
  link: string;
  year: Year;
  modified: any;
  created: any;
}

export interface Project {
  project: Project_project;
}

export interface ProjectVariables {
  id: string;
}
