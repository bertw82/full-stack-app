import React from "react";
import { Redirect } from "react-router";

function UserSignOut(props) {
    props.signOut();

  return (
    <Redirect to="/" />
  );
}
 
export default UserSignOut;