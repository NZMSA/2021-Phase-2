import React from 'react';
import { Card, CardActionArea, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import makeGCardStyles from './GCardStyles';

export interface GithubCardProps {
    avatar: JSX.Element;
    cardTitle: string;
    subHeader: string;
    cardContent: JSX.Element;
    url: string;
};

const GithubCard = ({avatar, cardTitle, subHeader, cardContent, url} : GithubCardProps) : JSX.Element => {
    const styles = makeGCardStyles();

    return <Card className={styles.card} variant={"outlined"}>
        <CardActionArea className={styles.wrapper} onClick={() => window.location.href = url}>
            <CardHeader className={styles.header} 
                avatar={avatar} 
                title={cardTitle} 
                subheader={subHeader} />
            <Divider className={styles.divider}/>
            <CardContent>
                {cardContent}
            </CardContent>
        </CardActionArea>
    </Card>
};

export default GithubCard;