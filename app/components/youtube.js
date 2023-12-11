'use client'

import classNames from 'classnames';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

const YouTube = ({ className, id, title }) => {
    const classes = classNames( 'yt-player', className );

    return (
        <MediaPlayer title={title} src={`youtube/${id}`} className={classes} playsinline>
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
    )
};

export default YouTube;