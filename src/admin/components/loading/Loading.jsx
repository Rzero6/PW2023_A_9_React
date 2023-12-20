import React from "react";
import { Alert, Spinner } from "react-bootstrap";
export const Loading = () => {
  return (
    <Alert className="p-3" variant="secondary">
      <div className="text-center">
        <Spinner
          as="span"
          animation="border"
          variant="secondary"
          size="lg"
          role="status"
          aria-hidden="true"
        />
        <h6 className="mt-2 mb-0">Loading...</h6>
      </div>
    </Alert>
  );
};
