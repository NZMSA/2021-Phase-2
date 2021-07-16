import { makeStyles, createStyles, CircularProgress } from '@material-ui/core';
import React from 'react';
import { CardList, SectionHeader } from './stories';
import { QueryGQL, QueryType } from './GraphQLClient';
import { ApolloQueryResult, FetchResult } from '@apollo/client';

const FeedPageStyles = makeStyles(createStyles({
    header: {
        position: 'sticky'
    }
}));

export interface FeedPageProps {
    pageTitle: string;
};

const FeedPage = ({pageTitle} : FeedPageProps) : JSX.Element => {
    const [cards, setCards] = React.useState<JSX.Element[]>([]);
    const styles = FeedPageStyles();

    const handleResult = (result: ApolloQueryResult<any> | FetchResult<any, Record<string, any>, Record<string, any>>) => {
        if(!result.data) return;

        var data = result.data!;
        
    }

    const fetchProjects = React.useCallback(async () => {
        var res = QueryGQL('', QueryType.QUERY);
        res.then(result => {
            handleResult(result);
        });
    }, []);

    React.useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return <div>
            <div className={styles.header}>
                <SectionHeader sectionTitle={pageTitle} doClick={() => {}}/>
            </div>
            cards.length === 0 ? <CircularProgress /> : <CardList cards={cards} cols={2}/>
        </div>
}

export default FeedPage;