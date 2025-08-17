'use client';

import React from 'react';

export type CaduceusIconProps = {
  className?: string;          // applied to wrapper
  ariaHidden?: boolean;
  width?: number;             // intrinsic width in px (used for reserved space)
  height?: number;            // intrinsic height in px
  responsive?: boolean;       // if true, image scales responsively up to max width
  src?: string;               // override image path
  srcSet?: string;            // optional srcset string, e.g. "/img-320.webp 320w, /img-640.webp 640w"
  sizes?: string;             // optional sizes attribute when srcSet is provided
};

export const CaduceusIcon: React.FC<CaduceusIconProps> = ({
  className = '',
  ariaHidden = true,
  width = 220,
  height = 220,
  responsive = false,
  src = '/assets/staff_of_hermes.png',
  srcSet,
  sizes
}) => {

  // wrapper styles:
  // - fixed mode: explicit px width/height (guarantees reserved space)
  // - responsive mode: width:100% with maxWidth and aspectRatio to preserve shape
  const wrapperStyle: React.CSSProperties = responsive
    ? {
        maxWidth: width,      // limits how big it becomes
        width: '100%',        // allow shrinking
        aspectRatio: `${width} / ${height}`, // reserve space & preserve ratio
        display: 'block'
      }
    : {
        width,
        height,
        display: 'block'
      };

  // image class: fill wrapper without overflowing
  const imgClass = 'w-full h-full object-contain max-w-full max-h-full block';

  return (
    <>
      <div
        className={`${className}`}
        aria-hidden={ariaHidden}
        style={wrapperStyle}
      >
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={ariaHidden ? '' : 'Caduceus icon'}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={imgClass}
          style={{ display: 'block' }}
        />
      </div>
    </>
  );
};
