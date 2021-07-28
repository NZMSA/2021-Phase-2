import React from 'react';
import { IconButton } from '@material-ui/core';


export interface SocialIconProps {
    name: string,
    url: string,
    logo: string,
}

export const FooterSocialIcon: React.FC<SocialIconProps> = ({ name, url, logo }) => {
    return (
        <IconButton href={url}>
            <img src={logo} id={logo} height="20px" alt={name} />
        </IconButton>
    )
}