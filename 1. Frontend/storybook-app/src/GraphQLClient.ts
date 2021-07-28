import { ApolloClient, InMemoryCache, gql, useQuery,createHttpLink, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://msa-yearbook.azurewebsites.net/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const graphQLClient = new ApolloClient({
    link: authLink.concat(httpLink),
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


export interface Self_self {
    __typename: "Student";
    id: string;
    name: string;
    gitHub: string;
    imageURI: string;
}
  
export interface Self {
    self: Self_self;
}
  
const FETCH_PROJECTS = gql`
    query FetchProjects {
        projects {
            nodes {
                id
                name
                description
                link
                year
                student {
                    name
                    gitHub
                    imageURI
                }
                modified
                created
            }
        }
    }
`;

export const FETCH_TOKEN = gql`
    mutation Login($code: String!) {
        login(input: {code: $code}) {
            jwt
            student {
                id
                name
            }
        }
    }
`
;

export const SELF = gql`
    query Self {
        self {
            name
            gitHub
            imageURI
        }
    }
`
;


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