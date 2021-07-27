import { gql } from "@apollo/client";

export const STUDENT = gql`
    fragment studentFields on Student {
        id
        name
        gitHub
        imageURI
    }
`;

export const PROJECT = gql`
    fragment projectFields on Project {
        id
        name
        description
        link
        year
        modified
        created
    }
`;

export const COMMENT = gql`
    fragment commentFields on Comment {
        id
        content
        modified
        created
    }
`;

export const PAGE_INFO = gql`
    fragment pageInfoFields on PageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
    }
`;