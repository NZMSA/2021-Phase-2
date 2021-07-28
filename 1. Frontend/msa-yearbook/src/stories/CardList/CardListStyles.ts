import { makeStyles, createStyles } from "@material-ui/core";

const CardListStyles = makeStyles(createStyles({
    cardList: {
        width: '100%',
        gap: '1%'
    },
    cardListItem: {
        minWidth: '280px'
    }
}));

export default CardListStyles;