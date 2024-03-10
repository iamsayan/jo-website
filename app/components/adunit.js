import React, { Suspense } from 'react';
import GoogleAdUnitClient from "@/app/components/adunitclient";

const GoogleAdUnit = (props) => {
    return (
        <Suspense fallback={<div className="skeleton w-full h-16"></div>}>
            <GoogleAdUnitClient>
            <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
                    {...props}
                ></ins>
            </GoogleAdUnitClient>
        </Suspense>
    );
};

export default GoogleAdUnit;