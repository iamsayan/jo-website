'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Loader = () => {
    return <ProgressBar
        height="2px"
        color="#eab308"
        options={{ showSpinner: false }}
        shallowRouting
    />
};

export default Loader