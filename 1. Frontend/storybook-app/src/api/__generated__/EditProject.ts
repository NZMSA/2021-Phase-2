/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Year } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditProject
// ====================================================

export interface EditProject_editProject {
  __typename: "Project";
  id: string;
  name: string;
  description: string;
  link: string;
  year: Year;
  modified: any;
  created: any;
}

export interface EditProject {
  editProject: EditProject_editProject;
}

export interface EditProjectVariables {
  projectId: string;
  name?: string | null;
  description?: string | null;
  link?: string | null;
}
