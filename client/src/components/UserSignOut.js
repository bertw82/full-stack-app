import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function UserSignOut(props) {
  // sign out a user from the app
  useEffect(() =>  props.signOut());

  return (
    <Redirect to="/" />
  );
}