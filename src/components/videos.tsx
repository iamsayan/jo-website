'use client';

import { useState } from 'react';
import { YouTubeEmbed } from '@next/third-parties/google'
import { LuPlay } from 'react-icons/lu';

interface VideoInfo {
    id: string;
    name: string;
    description: string;
    played: number;
}

export default function Videos() {
    const [videoId, setVideoId] = useState<string>('67g1r7Hin0E');

    const videos: VideoInfo[] = [
        {
            id: 'OiK_ZWpZgeA',
            name: 'Best of Jagadhatri Puja 2024',
            description: 'Best of Jagadhatri Puja 2022 | Rathersarak | Barabazar | Moranroad | Neogibagan | Circus Math',
            played: 1000,
        },
        {
            id: 'SGqn6Y2MAEI',
            name: 'World Famous Lighting',
            description: 'Best LED Lighting at Chandannagar Jagadhatri Puja 2023',
            played: 1000,
        },
        {
            id: 'CczMV6ep6p8',
            name: 'Chandannagar Jagadhatri Puja Procession 2023',
            description: 'Best video of Jagadhatri Puja',
            played: 1000,
        },
        {
            id: '67g1r7Hin0E',
            name: 'Best of Jagadhatri Puja 2022',
            description: 'Helapukur | Krisnapatty | Palpara | Daibakpara | Ambika',
            played: 1000,
        },
        {
            id: 'm53r9tdlp5Y',
            name: 'Best of Jagadhatri Puja 2022',
            description: 'Rathersarak | Barabazar | Moranroad | Neogibagan | Circus Math',
            played: 1000,
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-5">
            <div className="md:col-span-3">
                <YouTubeEmbed videoid={videoId} params="controls=0&playsinline=1&cc_load_policy=1&modestbranding=1&rel=0" />
            </div>
            <div className="flex flex-col">
                {/* <div className="flex flex-row justify-between p-4 border-b-2 border-gray-200">
                    <div>Playlist</div>
                    <div>{videos.length} videos</div>
                </div> */}
                <div className="flex flex-col justify-between gap-2">
                    <ul className="list bg-base-100 border border-neutral-200 text-left">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played videos this week</li>
                        {videos.map((info, index) => (
                            <li key={index} className="list-row">
                                <div><img className="size-10 rounded-box object-cover" src={`https://i3.ytimg.com/vi/${info.id}/maxresdefault.jpg`} /></div>
                                <div className="list-col-grow overflow-hidden">
                                    <div className="truncate">{info.name}</div>
                                    <div className="text-xs uppercase font-semibold opacity-60">{info.description}</div>
                                </div>
                                <button className="btn btn-square btn-ghost" onClick={() => setVideoId(info.id)}>
                                    <LuPlay />
                                </button>
                            </li>
                        ))}
                    </ul>
                    {/* {videos.map((info, index) => (
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
                    ))} */}
                </div>
            </div>
        </div>
    );
}