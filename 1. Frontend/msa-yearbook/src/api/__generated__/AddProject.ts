/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Year } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddProject
// ====================================================

export interface AddProject_addProject {
  __typename: "Project";
  id: string;
  name: string;
  description: string;
  link: string;
  year: Year;
  modified: any;
  created: any;
}

export interface AddProject {
  addProject: AddProject_addProject;
}

export interface AddProjectVariables {
  name: string;
  description: string;
  link: string;
  year: string;
}
