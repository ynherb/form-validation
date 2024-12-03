import {useEffect, useId, useRef} from "react";
import {Subscriber} from "@/entries/bokun-integration/lib/contracts/subscriber";

export default function useScrollIntoView(objectValue: Subscriber<'scrollIntoView' | 'change'>) {
    const id = useId()
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        objectValue.addSubscriber({
            id,
            action: 'scrollIntoView',
            dispatch: () => {
                ref.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            }
        })

        return () => objectValue.dispose({ id, action: 'scrollIntoView'})
    }, [objectValue, id])

    return ref
}