import React from 'react';
import githubLogo from "../assets/logos/github_logo.svg"
import microsoftLogo from "../assets/logos/microsoft_logo.svg"
import facebookLogo from "../assets/logos/facebook_logo.svg"
import discordLogo from "../assets/logos/discord_logo.svg"
import youtubeLogo from "../assets/logos/youtube_logo.svg"
import { Story, Meta } from '@storybook/react';
import { SocialIconProps, FooterSocialIcon } from './SocialIcon';



export default {
    title: 'UI Components/SocialIcon',
    component: FooterSocialIcon,
} as Meta;



const Template: Story<SocialIconProps> = (args) => (

    <div style={{ backgroundColor: "black" }}>
        <FooterSocialIcon {...args} />
    </div>
)
export const GithubIcon = Template.bind({});
GithubIcon.args = {
    name: "GitHub",
    url: "https://github.com/nzmsa",
    logo: githubLogo
};

export const MicrosoftIcon = Template.bind({});
MicrosoftIcon.args = {
    name: "Microsoft logo",
    url: "https://www.microsoft.com/en-nz",
    logo: microsoftLogo
};

export const FacebookIcon = Template.bind({});
FacebookIcon.args = {
    name: "Facebook",
    url: "https://www.facebook.com/studentaccelerator/",
    logo: facebookLogo
};
export const DiscordIcon = Template.bind({});
DiscordIcon.args = {
    name: "Discord",
    url: "https://discord.gg/c4Y5SAZ",
    logo: discordLogo
};

export const YoutubeIcon = Template.bind({});
YoutubeIcon.args = {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCCegNuS_AZjK-P3ZMN3JXNw",
    logo: youtubeLogo
};
