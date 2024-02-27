import React, { Suspense } from 'react';
import GoogleAdUnitClient from "@/app/components/adunitclient";

const GoogleAdUnit = (props) => {
    return (
        <Suspense fallback={null}>
            <GoogleAdUnitClient>
                <ins
                    className="adsbygoogle ad"
                    style={{ display: 'block', width: '100%' }}
                    data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
                    {...props}
                ></ins>
            </GoogleAdUnitClient>
        </Suspense>
    );
};

export default GoogleAdUnit;