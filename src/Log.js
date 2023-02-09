import "./App.css";
import { Outlet, Link } from "react-router-dom";
import React from "react";

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    // api name
     const response=await fetch("/login", {
      method: "POST",
      CrossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json=await response.json();
    alert(json.message);
    
    

    //window.location.replace('http://localhost:3000/login');
  }
  render() {
    var lst = {
      display: "flex",
      justifyContent: "center",
      position: "relative",
      top: 200,
    };
    var st = {
      textAlign: "center",
      padding: 4,
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={lst}>
          <div className="wrap">
            <h2 style={st}>Log in</h2>
            <fieldset>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-grid gap-2 my-4">
                <button type="submit" className="btn  btn-primary">
                  Submit
                </button>
              </div>
              <div className="d-grid gap-2 my-4">
                <Link to="/sign">
                  <button className="btn  btn-dark">Sign in</button>
                </Link>
              </div>
            </fieldset>
          </div>
        </div>
        <div></div>
        <Outlet />
      </form>
    );
  }
}

export default Log;
