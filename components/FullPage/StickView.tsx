'use client'

import { useContext, useEffect, useRef, useState } from 'react';
import ScrollContext from './ScrollContext';
import { log } from 'utils/util';

export default function StickyView(props) {
    const { height, background, children } = props;
    const elRef = useRef<HTMLDivElement>();
    const { scrollingElement } = useContext(ScrollContext);
    const [proportion, setProportion] = useState(null);

    function onScroll(container) {
        if (!elRef.current) {
            return
        }
        const containerRect = container.getBoundingClientRect();
        const selfRect = elRef.current.getBoundingClientRect();
        const offTop = containerRect.y - selfRect.y;

        if (containerRect.height < selfRect.height) {
            const viewHeight = selfRect.height - containerRect.height;
            setProportion(offTop / viewHeight);
        } else {
            const viewHeight = containerRect.height;
            const result = offTop < 0 ? offTop / viewHeight : offTop / viewHeight + 1;
            setProportion(result);
        }
    }

    useEffect(() => {
        if (scrollingElement) {
            scrollingElement.addEventListener('scroll', (e) => onScroll(e.target));
        }
        return () => scrollingElement?.removeEventListener('scroll', onScroll);
    }, [scrollingElement]);

    return (
        <div className="relative bg-pink-50 opacity-30" ref={elRef} style={{ height, background }}>
            <div
                className="sticky top-0 w-full"
                style={{ height: scrollingElement?.clientHeight }}
            >
                {children(proportion)}
            </div>
        </div>
    );
}
