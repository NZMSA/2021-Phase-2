import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Page } from './Page';
import * as HeaderStories from '../Header/Header.stories';

export default {
  title: 'Example/Page',
  component: Page,
} as Meta;

const Template: Story<any> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
