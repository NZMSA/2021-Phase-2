import { makeStyles, createStyles } from "@material-ui/core";

const CardListStyles = makeStyles(createStyles({
    cardList: {
        maxWidth: '600px',
        gap: '1%'
    },
    cardListItem: {
        minWidth: '280px'
    }
}));

export default CardListStyles;