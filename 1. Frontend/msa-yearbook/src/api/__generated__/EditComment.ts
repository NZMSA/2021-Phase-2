/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditComment
// ====================================================

export interface EditComment_editComment {
  __typename: "Comment";
  id: string;
  content: string;
  modified: any;
  created: any;
}

export interface EditComment {
  editComment: EditComment_editComment;
}

export interface EditCommentVariables {
  commentId: string;
  content?: string | null;
}
