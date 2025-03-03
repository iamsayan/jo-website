'use client';

import { useState } from 'react';
import { YouTubeEmbed } from '@next/third-parties/google'

interface VideoInfo {
    id: string;
    name: string;
}

export default function Videos() {
    const [videoId, setVideoId] = useState<string>('67g1r7Hin0E');

    const videos: VideoInfo[] = [
        {
            id: 'OiK_ZWpZgeA',
            name: 'Best of Jagadhatri Puja 2022 | Rathersarak | Barabazar | Moranroad | Neogibagan | Circus Math',
        },
        {
            id: 'SGqn6Y2MAEI',
            name: 'World Famous Lighting || Best LED Lighting at Chandannagar Jagadhatri Puja 2023',
        },
        {
            id: 'CczMV6ep6p8',
            name: 'Best video of Jagadhatri Puja',
        },
        {
            id: '67g1r7Hin0E',
            name: 'Best video of Jagadhatri Puja',
        },
        {
            id: 'm53r9tdlp5Y',
            name: 'Best of Jagadhatri puja 2022 | Rathersarak | Barabazar | Moranroad | Neogibagan | Circus Math',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-5">
            <div className="col-span-3">
                <YouTubeEmbed videoid={videoId} params="controls=0&playsinline=1&cc_load_policy=1&modestbranding=1&rel=0" />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between p-4 border-b-2 border-gray-200">
                    <div>Playlist</div>
                    <div>{videos.length} videos</div>
                </div>
                <div className="flex flex-col justify-between gap-2">
                    {videos.map((info, index) => (
                        <div key={index} className="flex flex-row items-center gap-3 cursor-pointer" onClick={() => setVideoId(info.id)}>
                            <div className="basis-1/4">
                                <img
                                    className="pointer-events-none"
                                    width={300}
                                    height={169}
                                    src={`https://i3.ytimg.com/vi/${info.id}/maxresdefault.jpg`}
                                    alt={info.name}
                                />
                            </div>
                            <div className="basis-3/4 text-left text-ellipsis overflow-hidden whitespace-nowrap">
                                {info.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}