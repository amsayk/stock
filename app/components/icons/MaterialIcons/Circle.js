import React from 'react';
import T from 'prop-types';

function Blank({ size, color, className, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      fill={color}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

function Checked({ size, color, className, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      fill={color}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

Checked.propTypes = Blank.propTypes = {
  color: T.string,
  size: T.number.isRequired,
};

Checked.defaultProps = Blank.defaultProps = {
  color: 'currentColor',
};

export default { Blank, Checked };
