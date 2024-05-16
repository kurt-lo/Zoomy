'use client';

import { tokenProvider } from '@/actions/stream.actions';
import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call('default', 'my-first-call');
// call.join({ create: true });

export const StreamClientProvider = ({ children }: { children: ReactNode }) => {

    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser(); // from clerk

    useEffect(() => {
        if (!user || !isLoaded) return;
        if(!apiKey) throw new Error("Stream api key is missing!");
        
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl,
            },
            tokenProvider: tokenProvider,
        })

        setVideoClient(client);
    }, [user, isLoaded])

    if (!videoClient) return <p>Loading video client...</p>

    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};

export default StreamClientProvider;