import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import SideBar from "styleguide/layout/SideBar";
import ScenerioExplorer from "pages/ScenerioExplorer";
import JobManager from "pages/JobManager";
const NewWebApplication = () => {
  return (
    <Router>
      <div>
        <SideBar>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/JobManager" exact>
              <JobManager />
            </Route>
            <Route exact path="/scenerio">
              <ScenerioExplorer />
            </Route>
          </Switch>
        </SideBar>
      </div>
    </Router>
  );
};

export default NewWebApplication;
