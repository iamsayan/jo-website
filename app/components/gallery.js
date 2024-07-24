'use client'

import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen'

function Gallery({ children, ...props }) {
    const settings = {
        ...props,
        licenseKey: 'KRLM-9HJW-HAX-CVQZ'
    }
    return (
        <LightGallery plugins={[lgThumbnail, lgZoom, lgFullscreen, lgAutoplay]} {...settings} download={false}>
            {children}
        </LightGallery>
    );
}

export default Gallery