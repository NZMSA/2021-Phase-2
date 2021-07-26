import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

const graphQLClient = new ApolloClient({
    uri: 'https://msa-yearbook.azurewebsites.net/graphql',
    cache: new InMemoryCache()
});

export interface Comment {
    id: string;
    content: string;
    project: Project;
    student: Student;
    modified: Date;
    created: Date;
    projectId: number;
    studentId: number;
  }

export interface Project {
    id: string;
    name: string;
    description: string;
    link: string;
    year: Date;
    student: Student;
    modified: Date;
    created: Date;
    studentId: number;
    comments: Comment[];
  }
  
export interface Student {
    id: string;
    name: string;
    gitHub: string;
    imageURI: string;
    projects: Project;
    comments: Comment;
  }

const FETCH_PROJECTS = gql`
    query {
        projects {
            nodes {
                id,
                name,
                description,
                link,
                year,
                student {
                    name,
                    gitHub,
                    imageURI
                },
                modified,
                created,
                studentId
            }
        }
    }
`;

export function useFetchProjects() : any | undefined {
    const {loading, data} = useQuery(FETCH_PROJECTS);

    useEffect(() => {}, [loading]);

    return data;
}

export function useAddProject() : boolean {
    //TODO: Add useMutation hook to add projects
    return false;
}

export default graphQLClient;