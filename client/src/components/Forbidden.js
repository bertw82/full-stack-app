import React from "react";

export default function Forbidden() {
  // page for when a user tries to access a private route
  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
    </div>
  );
}