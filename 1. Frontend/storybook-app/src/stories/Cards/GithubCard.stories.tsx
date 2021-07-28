import React from 'react';
import { Story, Meta } from '@storybook/react';
import GithubCard, { GithubCardProps } from './GithubCard';
import { Avatar, Typography } from '@material-ui/core';

export default {
  title: 'UI Components/Feed/GithubCard',
  component: GithubCard,
} as Meta;

const Template: Story<GithubCardProps> = (args) => <GithubCard {...args} />;

export const BasicCard = Template.bind(this);
BasicCard.args = {
    avatar: <Avatar>
            R
        </Avatar>,
    cardTitle: "Project Lorem Ipsum",
    subHeader: "Rodger Gu",
    cardContent: <Typography>
            some content
        </Typography>,
    url: "https://github.com/NZMSA"
};
