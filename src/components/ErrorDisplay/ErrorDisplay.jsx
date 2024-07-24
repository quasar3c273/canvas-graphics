import React, { useEffect, useState } from 'react';
import ErrorDisplayView from "./ErrorDisplayView";

const ErrorDisplay = ({ errorText, onSetError }) => {
  const [visible, setVisible] = useState(!!errorText);

  useEffect(() => {
    if (errorText) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onSetError('')
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorText, onSetError]);

  return (
    visible && <ErrorDisplayView errorText={errorText} visible={visible} />
  );
};

export default ErrorDisplay;
