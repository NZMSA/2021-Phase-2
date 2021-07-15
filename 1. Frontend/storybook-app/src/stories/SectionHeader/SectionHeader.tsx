import { Divider, IconButton, Typography } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import React from 'react';
import SectionHeaderStyles from './SectionHeaderStyles';

export interface SectionHeaderProps {
    sectionTitle: string,
    doClick: Function
}

const SectionHeader = ({sectionTitle, doClick} : SectionHeaderProps) : JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const styles = SectionHeaderStyles();

    const handleClick = () => {
        setOpen(!open);
        doClick();
    }

    return <div className={styles.wrapper}> 
        <div className={styles.divider}>
            <Typography className={styles.title}>
                {sectionTitle}
            </Typography>
        </div>
        {/* <IconButton className={styles.button} onClick={handleClick} color={'primary'}>
                {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton> */}
    </div>
}

export default SectionHeader;