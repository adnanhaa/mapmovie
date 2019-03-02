import React from "react";
import * as PropTypes from "prop-types";

const ErrorView = props => {
  return <div>
      <div className="alert alert-danger" role="alert">
          {props.message}
      </div>
  </div>
};

ErrorView.defaultProps = {
    message : 'Error'
};
ErrorView.propTypes = {
    message : PropTypes.string
};

export default ErrorView;