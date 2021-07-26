
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { SideBar } from './Sidebar';

export default {
    title: 'UI Components/SideBar',
    component: SideBar,
} as Meta;

const Template: Story = () => <SideBar />;

export const SideBarExample = Template.bind({});
