'use client';

import React from 'react';
import Image, { ImageProps, ImageLoaderProps } from 'next/image';

const SmartImage: React.FC<ImageProps> = (props) => {
  const cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
    if (process.env.NODE_ENV === "development") {
        return src;
    }
    const params = [`width=${width}`];
    if (quality) {
        params.push(`quality=${quality}`);
    }
    const paramsString = params.join(',');
    return src.replace('images', `cdn-cgi/image/${paramsString}/images`);
  };

  return (
    <Image
      {...props}
      loader={cloudflareLoader}
    />
  );
};

export default SmartImage;