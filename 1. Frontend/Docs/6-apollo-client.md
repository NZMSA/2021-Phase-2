# Apollo Client

> 


Check out the official documentation about how to use [Mutation](https://www.apollographql.com/docs/react/data/mutations/).

Now we can integrate `SubmitForm` using Apollo Client.

1. Let's create a corresponding GraphQL mutation named `ADD_PROJECT`. Remember to wrap GraphQL strings in the `gql` function to parse them into query documents:

   ```typescript
   import { gql } from "@apollo/client";
   import * as fragments from "./fragments";

   export const ADD_PROJECT = gql`
    mutation AddProject(
        $name: String!
        $description: String!
        $link: String!
        $year: String!
    ) {
        addProject(input: { name: $name, description: $description, link: $link, year: $year }) {
            ...projectFields
        }
    }
    ${fragments.PROJECT}
   `;
   ```

2. We want to pass our `ADD_PROJECT` mutation to the `useMutation` hook.

   Firstly, we have to import `ADD_PROJECT` the mutation, `AddProject`the type, `useMutation` the hook within the `SubmitForm` component, like the following:

   ```typescript
    import { ADD_PROJECT} from '../../api/mutations';
    import { AddProject } from '../../api/__generated__/AddProject';
    import { useMutation } from '@apollo/client';
   ```

 > To generate types of all operation, you can check out [TypeScript GraphQL Code Generator – Generate GraphQL Types with Apollo Codegen Tutorial](https://www.apollographql.com/blog/tooling/apollo-codegen/typescript-graphql-code-generator-generate-graphql-types/).

   Then declare the mutate function `addproject` and edit the `handleSubmit` function as the following:

   ```typescript
    const [addProject] = useMutation<AddProject>(ADD_PROJECT);

    const handleSubmit = async() => {
        if (projectName !== "" && isGithubUrl(githubUrl)) {
            try {
                await addProject({variables: {
                    name: projectName,
                    description: description,
                    link: githubUrl,
                    year: year,
                }})
                setSubmit(true)
            } catch(e) {
                console.log(e)
            }
        }else{
            setHasFocus(true);
        }
    };
   ```

In this example, the mutate function `addProject` called by the `onClick` handler that's returned by the `useMutation` hook. This 
tells Apollo Client to execute the mutation by sending it to our GraphQL server.

## Summary

In this part, we looked at how to integrate with the GraphQl server using Apollo Client. It is important to know how to send request to the backend. The example of how to add project shows how to mutate data in our database using `useMutation` hook.

[**<< Part #7 - Azure Development >>**](7-azure-development.md)
