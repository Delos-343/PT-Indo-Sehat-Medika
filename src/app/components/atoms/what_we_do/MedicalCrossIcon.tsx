'use client';

import React from 'react';

export type MedicalCrossIconProps = {
  className?: string;
  ariaHidden?: boolean;
  width?: number;
  height?: number;
  responsive?: boolean;
  src?: string;
  srcSet?: string;
  sizes?: string;
};

export const MedicalCrossIcon: React.FC<MedicalCrossIconProps> = ({
  className = 'opacity-90',
  ariaHidden = true,
  width = 120,
  height = 120,
  responsive = false,
  src = '/assets/medical_cross_ready.png',
  srcSet,
  sizes
}) => {
  
  const wrapperStyle: React.CSSProperties = responsive
    ? {
        maxWidth: width,
        width: '100%',
        aspectRatio: `${width} / ${height}`,
        display: 'block'
      }
    : {
        width,
        height,
        display: 'block'
      };

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
          alt={ariaHidden ? '' : 'Medical cross icon'}
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
