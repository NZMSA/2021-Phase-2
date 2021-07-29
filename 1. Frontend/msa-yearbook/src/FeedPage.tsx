import { makeStyles, createStyles, CircularProgress, Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { CardList, GithubCard, SectionHeader } from './stories';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PROJECTS } from './api/queries';
import { Projects,Projects_projects_nodes } from './api/__generated__/Projects';

const FeedPageStyles = makeStyles(
  createStyles({
    header: {
        position: 'sticky'
    },
    page: {
        padding: '20px'
    }
}));

export interface FeedPageProps {
  pageTitle: string;
}

const FeedPage = ({ pageTitle }: FeedPageProps): JSX.Element => {
  const [cards, setCards] = React.useState<JSX.Element[]>([]);
  
  const {loading, error, data} = useQuery<Projects>(PROJECTS)
  const styles = FeedPageStyles();

    useEffect(() => {
        if(!loading && !error) {
            setCards(data!.projects!.nodes!.map((project : Projects_projects_nodes) => {
                return <GithubCard 
                    avatar={<Avatar>{project.student.name[0]}</Avatar>}
                    cardTitle={project.name}
                    subHeader={project.student.name}
                    cardContent={<Typography>{project.description}</Typography>}
                    url={project.link}
                 />
            }))
        }
    }, [data]);

    return <div className={styles.page}>
        <div className={styles.header}>
            <SectionHeader sectionTitle={pageTitle} doClick={() => { }} />
        </div>
        {cards.length === 0 ? <CircularProgress /> : <CardList cards={cards} cols={window.innerWidth / 650} />}
    </div>
  
};

export default FeedPage;
