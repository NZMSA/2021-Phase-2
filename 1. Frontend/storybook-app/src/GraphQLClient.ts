import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const graphQLClient = new ApolloClient({
    uri: '',
    cache: new InMemoryCache()
});

interface GithubProject {
    
}

export enum QueryType {
    QUERY, MUTATION
}

export const QueryGQL = async (query: string, queryType: QueryType) => {
    var res;
    
    switch(queryType) {
        case QueryType.QUERY:
            res = await graphQLClient.query({
                query: gql`${query}`
            });
            break;
        case QueryType.MUTATION:
            res = await graphQLClient.mutate({
                mutation: gql`${query}`
            });
            break;
    }

    return res;
}

export default graphQLClient;