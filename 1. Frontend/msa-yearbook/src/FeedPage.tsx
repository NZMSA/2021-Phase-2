import {
  makeStyles,
  createStyles,
  CircularProgress,
  Avatar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { CardList, GithubCard, SectionHeader } from "./components";
import { useFetchProjects } from "./GraphQLClient";
import { useEffect } from "react";

const FeedPageStyles = makeStyles(
  createStyles({
    header: {
      position: "sticky",
    },
  })
);

export interface FeedPageProps {
  pageTitle: string;
}

const FeedPage = ({ pageTitle }: FeedPageProps): JSX.Element => {
  const [cards, setCards] = React.useState<JSX.Element[]>([]);
  var data = useFetchProjects();
  const styles = FeedPageStyles();

  useEffect(() => {
    if (data !== undefined) {
      setCards(
        data!.map((project) => {
          return (
            <GithubCard
              avatar={<Avatar>{project.student.name[0]}</Avatar>}
              cardTitle={project.name}
              subHeader={project.student.name}
              cardContent={<Typography>{project.description}</Typography>}
              url={project.link}
            />
          );
        })
      );
    }
  }, [data]);

  return (
    <div>
      <div className={styles.header}>
        <SectionHeader sectionTitle={pageTitle} doClick={() => {}} />
      </div>
      {cards.length === 0 ? (
        <CircularProgress />
      ) : (
        <CardList cards={cards} cols={2} />
      )}
    </div>
  );
};

export default FeedPage;
