import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { config } from '../config';

interface FetchOptions extends RequestInit {
    audience?: string;
    scope?: string;
}

interface ApiResponse<T> {
    error: any;
    loading: boolean;
    data: T | null;
}

export const useSpendyApi = <T>(
    url: string,
    options: FetchOptions = { audience: 'https://api.spendy.dev/v1/', scope: config.auth0.scope },
) => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState<ApiResponse<T>>({
        error: null,
        loading: true,
        data: null,
    });
    const [refreshIndex, setRefreshIndex] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const { audience, scope, ...fetchOptions } = options;
                const accessToken = await getAccessTokenSilently({ audience });
                const res = await fetch(url, {
                    ...fetchOptions,
                    headers: {
                        ...fetchOptions.headers,
                        // Add the Authorization header to the existing headers
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setState({
                    ...state,
                    data: await res.json(),
                    error: null,
                    loading: false,
                });
            } catch (error) {
                console.log(error);
                setState({
                    ...state,
                    error,
                    loading: false,
                });
            }
        })();
    }, [refreshIndex]);

    return {
        ...state,
        refresh: () => setRefreshIndex(refreshIndex + 1),
    };
};
