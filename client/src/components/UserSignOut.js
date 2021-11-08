import React from "react";
import { Redirect } from "react-router";

export default function UserSignOut(props) {
  // sign out a user from the app
    props.signOut();

  return (
    <Redirect to="/" />
  );
}