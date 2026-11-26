import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [lastMessage, setLastMessage] = useState<number>(-1);

    useEffect(() => {
        // при смене источника сообщений от него ещё не было
        setLastMessage(-1);

        const callback = (message: number) => {
            setLastMessage(message);
        };

        subscribe(props.sourceId, callback);

        return () => {
            unsubscribe(props.sourceId, callback);
        };
    }, [props.sourceId]);

    return (
        <div>
            {props.sourceId}: {lastMessage}
        </div>
    );
}
