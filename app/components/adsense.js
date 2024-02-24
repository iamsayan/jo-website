'use client'

import NoSsr from "@/app/utils/nossr";
import { Adsense as GoogleAdsense } from "@ctrl/react-adsense";

function Adsense(props) {
    return (
        <div className="text-center my-3">
            <NoSsr>
                <GoogleAdsense
                    client="ca-pub-2589621197191732"
                    style={{ display: "block" }}
                    className="ad"
                    {...props}
                />
            </NoSsr>
        </div>
    );
}

export default Adsense