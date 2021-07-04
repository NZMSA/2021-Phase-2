import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Header, HeaderProps } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    firstName: "John",
    lastName: "Doe",
    image: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
};
