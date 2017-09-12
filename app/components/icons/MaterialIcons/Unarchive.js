import React from 'react';
import T from 'prop-types';

export default function Unarchive({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path d="M0 0h24v24H0V0z" id="a" />
      </defs>
      <clipPath
        id="b"
        dangerouslySetInnerHTML={{
          __html: `<use overflow='visible' xlink:href='#a'/>`,
        }}
      />
      <path
        clip-path="url(#b)"
        d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"
      />
    </svg>
  );
}

Unarchive.propTypes = {
  color: T.string,
  size: T.number.isRequired,
};

Unarchive.defaultProps = {
  color: 'currentColor',
};
