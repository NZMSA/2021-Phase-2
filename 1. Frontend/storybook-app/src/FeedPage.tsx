import { makeStyles, createStyles, CircularProgress } from '@material-ui/core';
import React from 'react';
import { CardList, SectionHeader } from './stories';

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

    React.useEffect(() => {
        //TODO: Hook apollo client call into here.
    }, []);

    return <div>
            <div className={styles.header}>
                <SectionHeader sectionTitle={pageTitle} doClick={() => {}}/>
            </div>
            cards.length === 0 ? <CircularProgress /> : <CardList cards={cards} cols={2}/>
        </div>
}

export default FeedPage;