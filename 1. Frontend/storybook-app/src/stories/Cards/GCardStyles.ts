import { createStyles, makeStyles } from '@material-ui/core';

const makeGCardStyles = makeStyles(createStyles({
    card: {
        minWidth: '200px',
        maxWidth: '400px',
        width: '100%'
    },
    wrapper: {
        width: '100%'
    },
    divider: {
        width: '90%',
        marginLeft: '5%'
    },
    header: {
        display: 'flex'
    }
}));

export default makeGCardStyles;