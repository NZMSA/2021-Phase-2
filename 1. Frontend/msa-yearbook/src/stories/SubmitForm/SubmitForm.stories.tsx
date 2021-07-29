import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SubmitForm, SubmitFormProps } from './SubmitForm';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export default {
  title: 'UI Components/Submit Form',
  component: SubmitForm,
} as Meta;

const mockedClient = new ApolloClient({
  uri: 'https://your-graphql-endpoint',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

const Template: Story<SubmitFormProps> = (args) => (
<ApolloProvider client={mockedClient}>
  <SubmitForm {...args} />
</ApolloProvider>);

export const Submit = Template.bind({});
Submit.args = {
};