import { ImageList, ImageListItem } from '@material-ui/core';
import CardListStyles from './CardListStyles';

export interface CardListProps {
    cards: JSX.Element[],
    cols: number
};

const CardList = ({cards, cols} : CardListProps) : JSX.Element => {
    const styles = CardListStyles();
    return <ImageList className={styles.cardList} cols={cols} rowHeight={'auto'}>
            {Itemize(cards)}
        </ImageList>
};

const Itemize = (cards : JSX.Element[]) : JSX.Element[] => {
    const styles = CardListStyles();
    const out : JSX.Element[] = [];
    
    //TODO: If we have time, set the rows and cols taken up based on the code size / some metric.
    cards.forEach(card => {
        out.push(<ImageListItem className={styles.cardListItem}>
                {card}
            </ImageListItem>)
    });

    return out;
}

export default CardList;