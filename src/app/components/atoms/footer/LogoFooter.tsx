'use client';

import React from 'react';

export type LogoFooterProps = {
  className?: string;   // wrapper className for layout (e.g. flex container)
  width?: number;       // intrinsic width in px
  height?: number;      // intrinsic height in px
  responsive?: boolean; // allow responsive downscaling
  src?: string;         // logo path override
  alt?: string;
};

export const LogoFooter: React.FC<LogoFooterProps> = ({
  className = 'flex items-start',
  width = 180,
  height = 180,
  responsive = true,
  src = '/logo/logo.png',
  alt = 'Company logo'
}) => {
  
  // Footer logos often need to scale down on small viewports.
  // Use responsive mode by default: max width of `width` px; preserve aspect ratio.
  const wrapperStyle: React.CSSProperties = responsive
    ? {
        maxWidth: width,
        width: '100%', // fills parent up to maxWidth
        aspectRatio: `${width} / ${height}`,
        display: 'block'
      }
    : {
        width,
        height,
        display: 'block'
      };

  const imgClass = 'w-full h-full object-contain max-w-full max-h-full block';

  // Use eager loading for footer logo only if it is in viewport/critical; otherwise lazy.
  const loading = 'eager';

  return (
    <>
      <div className={`${className} overflow-hidden`} style={wrapperStyle}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          draggable={false}
          className={imgClass}
          style={{ display: 'block' }}
        />
      </div>
    </>
  );
};
