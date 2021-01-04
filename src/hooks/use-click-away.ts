// https://medium.com/@stopyransky/custom-react-hooks-the-useclickaway-hook-95eca10b8075
import { useEffect, useRef, useState } from 'react';

// TODO: needs moar better types
export const useClickAway = () => {
    const [active, setActive] = useState<boolean>(false);

    // not sure what this should be
    const ref = useRef<any>(null);

    const toggle = () => {
        setActive(!active);
    };

    const handleClick = (e: globalThis.MouseEvent) => {
        if (!ref.current.contains(e.target)) {
            setActive(false);
        }
    };

    useEffect(() => {
        if (active) {
            document.addEventListener('mousedown', handleClick);
        } else {
            document.removeEventListener('mousedown', handleClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [active]);

    return { ref, active, setActive, toggle };
};
