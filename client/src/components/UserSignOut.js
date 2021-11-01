import React from "react";
import { Redirect } from "react-router";

export default function UserSignOut(props) {
    props.signOut();

  return (
    <Redirect to="/" />
  );
}
 
