import React from 'react';
import { Button, Card, CardActionArea, CardContent, CardHeader, Dialog, DialogTitle, Divider } from '@material-ui/core';
import makeGCardStyles, { makeDialogStyles } from './GCardStyles';

export interface GithubCardProps {
    avatar: JSX.Element;
    cardTitle: string;
    subHeader: string;
    cardContent: JSX.Element;
    url: string;
};

interface ExternalDialogProps {
    isOpen: boolean;
    setIsOpen: (newOpen: boolean) => void;
    url: string;
};

const GithubCard = ({avatar, cardTitle, subHeader, cardContent, url} : GithubCardProps) : JSX.Element => {
    const styles = makeGCardStyles();
    const [dialog, setDialog] = React.useState(false);

    return <div> 
    <Card className={styles.card} variant={"outlined"}>
        <CardActionArea className={styles.wrapper} onClick={() => setDialog(true)}>
            <CardHeader className={styles.header} 
                avatar={avatar} 
                title={cardTitle} 
                subheader={subHeader} />
            <Divider className={styles.divider}/>
            <CardContent>
                {cardContent}
            </CardContent>
        </CardActionArea>
    </Card>
    <ExternalDialog isOpen={dialog} setIsOpen={setDialog} url={url}/>
    </div>
};

const ExternalDialog = ({isOpen, setIsOpen, url} : ExternalDialogProps) : JSX.Element | null => {
    const styles = makeDialogStyles();
    
    return <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>
            {`This will take you to the GitHub website. Proceed to external URL ${url}?`}
        </DialogTitle>
        <div className={styles.buttonGroup}>
        <Button className={styles.button} 
        variant="contained" 
        color={"primary"} 
        onClick={() => window.location.href = url}>
            Continue
        </Button>
        <Button className={styles.button}
        variant="contained" 
        color={"secondary"} 
        onClick={() => setIsOpen(false)}>
            Take Me Back!
        </Button>
        </div>
    </Dialog>
}

export default GithubCard;