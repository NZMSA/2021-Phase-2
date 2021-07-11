
import React from 'react';
import { Story, Meta } from '@storybook/react';
import Footer from './Footer';

export default {
    title: 'UI Components/Footer',
    component: Footer,
} as Meta;

const Template: Story = () => <Footer />;

export const FooterExample = Template.bind({});
