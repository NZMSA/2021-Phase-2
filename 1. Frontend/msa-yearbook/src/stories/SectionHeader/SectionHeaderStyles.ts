import { makeStyles, createStyles } from "@material-ui/core";

const SectionHeaderStyles = makeStyles(createStyles({
    wrapper: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingBottom: '10px'
    },
    divider: {
        background: 'linear-gradient(#0000 0 48%, #000 48% 52%, #0000 0)',
        width: '100%'
    },
    title: {
        background: '#7851a9',
        color: '#FFF',
        border: '5px solid #8861b9',
        width: 'max-content',
        padding: '5px',
        fontSize: '120%'
    },
    button: {
        
    }
}));

export default SectionHeaderStyles;