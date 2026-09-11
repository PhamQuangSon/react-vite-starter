import React from "react";

// Higher-Order Component for optional custom layouts
const withLayout = (WrappedComponent: React.ComponentType) => {
  return function WithLayout(props: JSX.IntrinsicAttributes) {
    return <WrappedComponent {...props} />;
  };
};

export default withLayout;
