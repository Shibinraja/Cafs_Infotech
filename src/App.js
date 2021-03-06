import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import {
  LandingPage,
  TablePage,
  ProfileEdit,
} from "./Components/Container/Container";

export default function App() {
  const [state, setState] = React.useState("");
  const [data, setData] = React.useState([]);
  const [deleteStatus, setDeleteStatus] = React.useState([]);

  const userDetails = (data) => {
    if (data.data) {
      axios
        .post("/login", { ...data })
        .then((res) => {
          console.log(res)
          localStorage.setItem("name", res.data.Name);
          setState(res.data);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("/registration", { ...data })
        .then((res) => {
          setState(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const profileDetails = (data) => {
    if (data) {
      axios
        .post("/profilecreation", { ...data })
        .then((res) => {
          setState(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const profileFetch = () => {
    axios
      .get("/profilefetch")
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((error) => console.error(error));
  };

  const updateProfile = (data) => {
    if (data) {
      axios
        .put("/profileupdate", { ...data })
        .then((res) => {
          setState(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const deleteprofile = (data) => {
    console.log(data);
    axios
      .delete("/profiledelete", { data })
      .then((res) => {
        setDeleteStatus(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <LandingPage loginDetails={userDetails} data={state} />
            )}
          />

          <Route
            exact
            path="/table"
            render={() => (
              <TablePage
                profileCreation={profileDetails}
                profileGrasp={profileFetch}
                data={state}
                profile={data}
                updateProfileDetails={updateProfile}
                deleteprofile={deleteprofile}
                deleteStatus={deleteStatus}
              />
            )}
          />

          <Route exact path="/">
            {localStorage.getItem("name") !== null ? (
              <Redirect to="/table" />
            ) : (
              <LandingPage />
            )}
          </Route>
        </Switch>
      </Router>
    </>
  );
}
