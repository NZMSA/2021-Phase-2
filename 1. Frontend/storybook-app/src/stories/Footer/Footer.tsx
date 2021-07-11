import React from 'react';
import microsoftLogo from "../assets/logos/microsoft_logo.svg"
import facebookLogo from "../assets/logos/facebook_logo.svg"
import discordLogo from "../assets/logos/discord_logo.svg"
import facebookgroupLogo from "../assets/logos/facebookgroup_logo.svg"
import youtubeLogo from "../assets/logos/youtube_logo.svg"
import githubLogo from "../assets/logos/github_logo.svg"
import { FooterSocialIcon, SocialIconProps } from '../SocialIcon/SocialIcon';

import { Box, Container, Grid, Hidden, Link, Typography } from '@material-ui/core';


import './footer.css';

const SOCIAL_MEDIA = [
    {
        name: "Facebook",
        url: "https://www.facebook.com/studentaccelerator/",
        logo: facebookLogo
    },
    {
        name: "Discord",
        url: "https://discord.gg/c4Y5SAZ",
        logo: discordLogo
    },
    {
        name: "Facebook Group",
        url: "https://www.facebook.com/groups/msaccelerator/",
        logo: facebookgroupLogo
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/channel/UCCegNuS_AZjK-P3ZMN3JXNw",
        logo: youtubeLogo
    },
    {
        name: "GitHub",
        url: "https://github.com/nzmsa",
        logo: githubLogo
    }
]

const MICROSOFT_LOGO = {
    name: "Microsoft logo",
    url: "https://www.microsoft.com/en-nz",
    logo: microsoftLogo
}
const PRIVACY_POLICY = "https://go.microsoft.com/fwlink/?LinkId=521839"
const TERMS_OF_USE = "https://go.microsoft.com/fwlink/?LinkID=206977"


export default function Footer() {

    return (
        <footer className="footer">
            <Hidden smDown>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={4}>
                    <Grid item xs={4}>
                        <FooterSocialIcon {...MICROSOFT_LOGO} />
                        {`Copyright © Microsoft Student Accelerator, 2021. All rights reserved`}
                    </Grid>
                    <Grid item xs={6}>
                        {SOCIAL_MEDIA.map((icon: SocialIconProps) => {
                            return (
                                <FooterSocialIcon {...icon} />
                            )
                        })}
                    </Grid>
                </Grid>
            </Hidden>
            {/* Mobile view of footer, looks very different :) */}
            <Hidden smUp>
                <Grid container direction="row">
                    <Grid item>
                        <Grid container direction="row" justify="space-between" spacing={3}>
                            <Grid item>
                                <Box marginLeft={2}>
                                    {`© MSA 2021`}
                                </Box>
                            </Grid>
                            <Grid item>
                                <Link color="inherit" href={PRIVACY_POLICY}>Privacy policy</Link>
                            </Grid>
                            <Grid item>
                                <Link color="inherit" href={TERMS_OF_USE}>Terms of use</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box marginLeft={8}>
                            {SOCIAL_MEDIA.map((icon: SocialIconProps) => {
                                return (
                                    <FooterSocialIcon {...icon} />
                                )
                            })}
                        </Box>
                    </Grid>
                </Grid>
            </Hidden>
        </footer >
    );
}

