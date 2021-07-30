import { createStyles, makeStyles } from '@material-ui/core';

const makeGCardStyles = makeStyles(createStyles({
    card: {
        minWidth: '200px',
        maxWidth: '400px',
        minHeight: '200px',
        width: '100%'
    },
    wrapper: {
        width: '100%',
        minHeight: '200px'
    },
    divider: {
        width: '90%',
        marginLeft: '5%'
    },
    header: {
        display: 'flex'
    }
}));

export const makeDialogStyles = makeStyles(createStyles({
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: '10px'
    }
}));

export default makeGCardStyles;