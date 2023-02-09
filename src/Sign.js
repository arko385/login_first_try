import "./App.css";
import { Outlet, Link } from "react-router-dom";
import React from "react";

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { name,mobile,email, password } = this.state;
    console.log(name,mobile,email,password);
    if (name&&mobile&&email&&password)
     {
      const response=await fetch("/register", {
        method: "POST",
        CrossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          password,
        }),
      });
      const json=await response.json();
      alert(json.message);
      window.location.replace("http://localhost:3000/login");
    }
    else
    {
      alert("Invalid input");
    }
  }
  render() {
    var lst = {
      display: "flex",
      justifyContent: "center",
      position: "relative",
      top: 120,
    };
    var nst = {
      width: 400,
    };
    var st = {
      textAlign: "center",
      padding: 4,
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={lst}>
          <div className="wrap" style={nst}>
            <h2 style={st}>Sign in</h2>
            <fieldset>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => this.setState({ mobile: e.target.value })}
                />
                <label htmlFor="floatingInput">Mobile</label>
              </div>
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
                <button className="btn  btn-primary">Submit</button>
              </div>
              <div className="d-grid gap-2 my-4">
                <Link to="/">
                  <button className="btn  btn-dark">Log </button>
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

export default Sign;
