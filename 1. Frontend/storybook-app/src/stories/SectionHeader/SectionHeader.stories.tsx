import React from 'react';
import { Story, Meta } from '@storybook/react';
import SectionHeader, { SectionHeaderProps } from './SectionHeader';

export default {
  title: 'UI Components/Feed/SectionHeader',
  component: SectionHeader,
} as Meta;

const Template: Story<SectionHeaderProps> = (args) => <SectionHeader {...args} />;

export const BasicSectionHeader = Template.bind(this);
BasicSectionHeader.args = {
    sectionTitle: "Some Section Header",
    doClick: () => alert("Clicked")
};

