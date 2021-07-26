import { gql } from "@apollo/client";

export const STUDENT = gql`
    fragments studentFields on Student {
        id
        name
        gitHub
        imageURI
    }
`;

export const PROJECT = gql`
    fragments projectFields on Project {
        id
        name
        description
        link
        year
        modified
        created
        student
    }
`;

export const COMMENT = gql`
    fragments commentFields on Comment {
        id
        content
        modified
        created
    }
`;

export const PAGE_INFO = gql`
    fragments pageInfoFields on PageInfo {
        hasNextPage
        hasPreviosPage
        startCursor
        endCursor
    }
`;


export const PROJECT_EDGE = gql`
    fragments projectEditFields on ProjectEdge {
        
    }
`