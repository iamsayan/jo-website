'use client';

import React from "react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Loader: React.FC = () => {
    return (
        <ProgressBar
            height="2px"
            color="#eab308"
            options={{ showSpinner: false }}
            shallowRouting
        />
    );
};

export default Loader;