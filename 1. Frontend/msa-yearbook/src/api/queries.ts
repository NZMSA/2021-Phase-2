import { gql } from "@apollo/client";
import * as fragments from "./fragments";

export const PROJECTS = gql`
    query Projects($first: Int, $after: String, $last: Int, $before: String) {
        projects(first: $first, after: $after, last: $last, before: $before) {
            pageInfo{
                ...pageInfoFields
            }
            edges{
                cursor
            } 
            nodes { 
                ...projectFields
                student{
                    ...studentFields
                }
            }
        }
    }
    ${fragments.PROJECT}
    ${fragments.PAGE_INFO}
    ${fragments.STUDENT}
`

export const PROJECT  = gql`
    query Project($id: ID!) {
        project(id: $id) {
            ...projectFields
        }
    }
    ${fragments.PROJECT}
`

export const STUDENTS = gql`
    query Students($first: Int, $after: String, $last: Int, $before: String) {
        students(first: $first, after: $after, last: $last, before: $before) {
            pageInfo{
            ...pageInfoFields
            }
            edges{
                cursor
            } 
            nodes { 
                ...studentFields
            }
        }
    }
    ${fragments.STUDENT}
    ${fragments.PAGE_INFO}
`

export const STUDENT = gql`
    query Student($id: ID!) {
        student(id: $id){
            ...studentFields
        }
    }
    ${fragments.STUDENT}
`

export const SELF = gql`
    query Self {
        self {
            ...studentFields
        }
    }
    ${fragments.STUDENT}
`