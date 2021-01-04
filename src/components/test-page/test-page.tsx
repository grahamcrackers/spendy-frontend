import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';

export const TestPage = () => {
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        (async () => {
            const publicResponse = await fetch('http://localhost:8080/api/public');
            const publicData = await publicResponse.json();
            console.log(publicData);

            const token = await getAccessTokenSilently({ audience: 'https://menu-api.demo.com' });
            const privateResponse = await fetch('http://localhost:8080/api/private', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const privateData = await privateResponse.json();
            console.log(privateData);

            const scopedToken = await getAccessTokenSilently({
                audience: 'https://menu-api.demo.com',
            });
            const scopedResponse = await fetch('http://localhost:8080/api/private-scoped', {
                headers: {
                    Authorization: `Bearer ${scopedToken}`,
                },
            });
            const scopedData = await scopedResponse.json();
            console.log(scopedData);
        })();
    }, []);
    return <div></div>;
};
