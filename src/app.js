import React from "react";
import { Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading } from "./components";
import {
  Home,
  Profile,
  CreatePost,
  SeeDraft,
  Politics,
  Economy,
  Sports,
  Entertainment,
  Bookmarks,
} from "./views";
import ProtectedRoute from "./auth/protected-route";

import "./app.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/CreatePost" component={CreatePost} />
          <ProtectedRoute path="/SeeDraft" component={SeeDraft} />
          <ProtectedRoute path="/Politics" component={Politics} />
          <ProtectedRoute path="/Sports" component={Sports} />
          <ProtectedRoute path="/Economy" component={Economy} />
          <ProtectedRoute path="/Entertainment" component={Entertainment} />
          <ProtectedRoute path="/Bookmarks" component={Bookmarks} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
