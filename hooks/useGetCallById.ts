import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"

export default function useGetCallById(id: string | string[]) {
  
    const [call, setCall] = useState<Call>();
    const [isLoading, setIsLoading] = useState(true);
    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client) return;

        const loadTheCall = async () => {
            const { calls } = await client.queryCalls({
                filter_conditions: {
                    id
                }
            })

            if (calls.length > 0) setCall(calls[0]);

            setIsLoading(false);
        }

        loadTheCall();
    }, [id, client])

    return {
        isLoading,
        call
    }
}
