'use client'

import { createContext } from 'react';

const ScrollContext = createContext<{
    scrollingElement: HTMLElement;
}>({
    scrollingElement: null,
});
export default ScrollContext;
