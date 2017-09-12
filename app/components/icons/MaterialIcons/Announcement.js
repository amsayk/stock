import React from 'react';
import T from 'prop-types';

export default function Announcement({ size, color, className }) {
  return (
    <svg
      className={className}
      fill={color}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

Announcement.propTypes = {
  color: T.string,
  size: T.number.isRequired,
};

Announcement.defaultProps = {
  color: 'currentColor',
};
