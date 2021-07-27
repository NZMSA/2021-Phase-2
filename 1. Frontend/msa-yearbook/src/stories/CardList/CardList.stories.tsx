import React from 'react';
import { Story, Meta } from '@storybook/react';
import CardList, { CardListProps} from './CardList';
import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';

export default {
  title: 'UI Components/Feed/CardList',
  component: CardList,
} as Meta;

const Template: Story<CardListProps> = (args) => <CardList {...args} />;

const makeCard = () : JSX.Element => {
    return <Card variant="outlined">
            <CardHeader title={"Some Header"}>
            </CardHeader>
            <Divider />
            <CardContent>
                Lorem Ipsum Dolor Est Et Cetera Et Cetera
            </CardContent>
        </Card>
}

export const BasicCardList = Template.bind(this);
BasicCardList.args = {
    cards: [makeCard(), makeCard()],
    cols: 4
};

