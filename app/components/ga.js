'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import NoSsr from "@/app/components/nossr";

export default function GoogleAnalyticsProvider() {
    return <NoSsr><GoogleAnalytics gaId="G-9SC8PWR57R" /></NoSsr>
}