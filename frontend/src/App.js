import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
// import ImageUploadPage from "./components/ImageUploadPage"
import Upload from "./components/ImageUploadPage/Upload";
// import CreateUserForm from "./components/CreateUserForm"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path ="/upload">
            <Upload />
          </Route>
          {/* <Route path ="/user">
            <CreateUserForm />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
