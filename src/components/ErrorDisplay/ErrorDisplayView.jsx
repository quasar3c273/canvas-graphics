import React from 'react';

const ErrorDisplayView = ({ errorText, visible }) => (
  <div className={`errorBlock ${ visible && 'show' }`}>
    {errorText}
  </div>
);

export default ErrorDisplayView;
