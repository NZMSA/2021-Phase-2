/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Student
// ====================================================

export interface Student_student {
  __typename: "Student";
  id: string;
  name: string;
  gitHub: string;
  imageURI: string;
}

export interface Student {
  student: Student_student;
}

export interface StudentVariables {
  id: string;
}
