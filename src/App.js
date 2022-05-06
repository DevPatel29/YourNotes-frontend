import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import axios from "axios";
import { getApiUrl } from "./config";

const API_URL = getApiUrl();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLogin: false,
    };
  }

  setLoginDetails = (val, usr) => {
    this.setState({ ...this.state, isLogin: val, username: usr });
  };

  async componentDidMount() {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const res = await axios.get(`${API_URL}/users-api/verify`, {
          headers: { Authorization: token },
        });
        this.setLoginDetails(res.data.msg, res.data.username);
        if (res.data.msg === false) return localStorage.clear();
      } else {
        this.setLoginDetails(false, "");
      }
    };
    checkLogin();
  }

  render() {
    return (
      <div>
        {this.state.isLogin ? (
          <MainPage
            setLoginDetails={this.setLoginDetails}
            username={this.state.username}
          />
        ) : (
          <Login setLoginDetails={this.setLoginDetails} />
        )}
      </div>
    );
  }
}

export default App;
