'use client'

import { useState } from "react";
import NoSsr from "@/app/utils/nossr";
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

export default function Videos({ children, title }) {
    const [ video, setVideo ] = useState( {
        id: '67g1r7Hin0E',
        name: 'Best video of Jagadhatri Puja'
    } )
    const videos = [
        {
            id: 'OiK_ZWpZgeA',
            name: 'Best of Jagadhatri Puja 2022 | Rathersarak | Barabazar | Moranroad | Neogibagan | Circus Math'
        },
        {
            id: 'SGqn6Y2MAEI',
            name: 'World Famous Lighting || Best LED Lighting at Chandannagar Jagadhatri Puja 2023'
        },
        {
            id: 'CczMV6ep6p8',
            name: 'Best video of Jagadhatri Puja'
        },
        {
            id: '67g1r7Hin0E',
            name: 'Best video of Jagadhatri Puja'
        },
        {
            id: 'm53r9tdlp5Y',
            name: 'Best of Jagadhatri puja 2022 | Rathersarak | Barabazar | Moranroad | Neogibagan | Circus Math'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-5">
            <div className="col-span-3">
                <NoSsr>
                    <MediaPlayer playsInline title={video.name} src={`youtube/${video.id}`}>
                        <MediaProvider />
                        <PlyrLayout icons={plyrLayoutIcons} />
                    </MediaPlayer>
                </NoSsr>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between p-4 border-b-2">
                    <div>Playlist</div>
                    <div>{videos?.length} videos</div>
                </div>
                <div className="flex flex-col justify-between gap-2">
                    {videos?.map((info, index) => (
                        <div key={index} className="flex flex-row items-center gap-3 cursor-pointer" onClick={() => setVideo(info)}>
                            <div className="basis-1/4">
                                <img className="pointer-events-none" width={300} src={`https://i3.ytimg.com/vi/${info?.id}/maxresdefault.jpg`} alt={info?.name} />
                            </div>
                            <div className="basis-3/4 text-left overflow-ellipsis overflow-hidden whitespace-nowrap">{info?.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
