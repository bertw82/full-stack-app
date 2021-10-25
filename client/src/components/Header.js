import React from 'react';
// import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><a href="index.html">Courses</a></h1>
          {/* <nav>
            {
              <React.Fragment>
              </React.Fragment>

            }
            <ul class="header--signedin">
              <li>Welcome, Joe Smith!</li>
              <li><a href="sign-out.html">Sign Out</a></li>
            </ul>
          </nav> */}
        </div>
        </header>
    )
  }
}