import React from 'react';
import { Card, CardActionArea, CardContent, CardHeader, Avatar } from '@material-ui/core';

export interface GithubCardProps {
    avatar: typeof Avatar;
    cardTitle: string;
    subHeader: string;
    cardContent: JSX.Element;
    url: string;
};

const GithubCard = ({avatar, cardTitle, subHeader, cardContent, url} : GithubCardProps) : JSX.Element => {

    return <Card>
        <CardActionArea onClick={() => window.location.href = url}>
            <CardHeader avatar={avatar} title={cardTitle} subHeader={subHeader} />
            <CardContent>
                {cardContent}
            </CardContent>
        </CardActionArea>
    </Card>
};

export default GithubCard;