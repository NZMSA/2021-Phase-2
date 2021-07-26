import { gql } from "@apollo/client";
import * as fragments from "./fragments";

export const PROJECTS = gql`
    query Projects($first: Int, $after: String, $last: Int, $before: String) {
        pageInfo{}
        edges{} 
        nodes { 
            ...projectFields
        }
    }
    ${fragments.PROJECT}
`