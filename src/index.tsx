import React, { useContext, Suspense, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Auth0ProviderWithHistory from "auth/auth0-provider-with-history";
import '@fontsource/roboto';
import './index.css';
import Theme from 'styleguide/theme1';
import { Provider as AuthorizationProvider } from './account/Context';
import { Context as AuthorizationContext } from './account/Context';
import { checkJWTSession, checkJWTUserData } from './utility/sessions';

import Login from './account/Login';
import CommonLayout from './common';
import { LogoutDisplay } from './account/Logout';
import SinglePage from 'styleguide/layout/SinglePage';
// import SideBarNavigation from 'account/Navigation/Navigation';
import HorizontalNavigation from 'account/Navigation/HorizontalNavigation';
import LogoutDashboard from 'account/Logout';

import SettingsInputAntenna from '@material-ui/icons/SettingsInputAntenna';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GraphicEq from '@material-ui/icons/GraphicEq';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Apartment from '@material-ui/icons/Apartment';
// import Ballot from '@material-ui/icons/Ballot';
import ClientUserJobSettings from 'client/user/Dashboard/JobSettings';
import AccountInformation from 'client/admin/Dashboard/AccountInformation';
import ClientAdminMembersList from 'client/admin/Members/MembersList';
import ClientAdminMembersAdd from 'client/admin/Members/MembersAdd';
import ClientAdminSubscriptions from 'client/admin/Subscriptions';
import ProfileDashboard from 'profile/Dashboard';
import UnderConstructionLayout from 'common/UnderConstruction';
import ClientsAdd from 'client/admin/SapiatAccounts/ClientsAdd';
import ClientsList from 'client/admin/SapiatAccounts/ClientsList';
import MembersList from 'client/admin/Members/MembersList';
import MembersAdd from 'client/admin/Members/MembersAdd';

import BusinessIcon from '@material-ui/icons/Business';
import Group from '@material-ui/icons/Group';
import Assessment from '@material-ui/icons/Assessment';
import Security from '@material-ui/icons/Security';


import Settings from '@material-ui/icons/Settings';
import ScenariosListing from 'scenarios/Dashboard/ScenariosListing';
import ScenariosAdd from 'scenarios/Dashboard/ScenariosAdd';
import ScenariosEdit from 'scenarios/Dashboard/ScenariosEdit';
import ScenariosListingsDashboard from 'scenarios/Listings';
import PortfolioListing from 'portfolios/Dashboard/PortfolioListing';
import PortfoliosAdd from 'portfolios/Dashboard/PortfoliosAdd';
import PortfoliosEdit from 'portfolios/Dashboard/PortfoliosEdit';
import ClientUserProfile from 'client/user/Dashboard/ClientProfile';
import JobListing from 'jobs/JobListing';
import JobAdd from 'jobs/JobAdd';
import JobEdit from 'jobs/JobEdit';
import Plots from 'plots/plots';
import { API_ASSETS } from 'services/api/config';
import { serviceQuery } from 'services/query';
import Register from 'account/Register';
import NewWebApplication from 'WebApplicationRoutes';



const WebApplicationRoutes = () => {
  const { userData } = useContext(AuthorizationContext);
  const loggedInStatus: boolean = checkJWTSession(userData);
  const loggedInUser: any = checkJWTUserData();
  const navigateTo = userData?.navigateTo || '';
  const [hideNavs, setHideNavs] = useState<boolean>(false);
  const user: any = checkJWTUserData();

  const [fetchRecords, setFetchRecords] = useState<boolean>(true);

  useMemo(() => {
      if (!fetchRecords) return;
      if (window.sessionStorage.getItem('assets')) return;

      const assetURL = `${API_ASSETS}`;
      serviceQuery(assetURL).fetchAll().then((result) => {
    
    const d = result.data;
    window.sessionStorage.setItem('assets', JSON.stringify(d));

    let namesMap = new Map();
    let classMap = new Map();
    let classArray: any[] = [{ value: '', label: '-- Choose --' }];
    let currencyMap = new Map();
    let currencyArray: any[] = [{ value: '', label: '-- Choose --' }];
    let geographyMap = new Map();
    let geographyArray: any[] = [{ value: '', label: '-- Choose --' }];
    let names = [];

    for (let i = 0; i < d.length; i += 1) {
      let r = d[i];
      names.push({ value: r.id, label: r.name })
      namesMap.set(r.id, r.name);
      classMap.set(r.assetClass, '');
      geographyMap.set(r.region, '');
      currencyMap.set(r.priceCurrency, '');
    }

    for (let key of classMap.keys()) {
      classArray.push({ value: key, label: key });
    }
    for (let key of currencyMap.keys()) {
      currencyArray.push({ value: key, label: key });
    }
    for (let key of geographyMap.keys()) {
      geographyArray.push({ value: key, label: key });
    }

    window.sessionStorage.setItem('assetNames', JSON.stringify(names)); // list
    window.sessionStorage.setItem('assetClasses', JSON.stringify(classArray));
    window.sessionStorage.setItem('geographies', JSON.stringify(geographyArray));
    window.sessionStorage.setItem('currencies', JSON.stringify(currencyArray));
      });
      setFetchRecords(false);
  }, [fetchRecords]);



  let leftNavigationItems: any = [];
  let rightNavigationItems: any = [
      ['Logout', 'logout', <ExitToApp />]
  ];

  if (user.role === 'super_admin') {
      leftNavigationItems = [
          ['Sapiat Clients', 'clients', <BusinessIcon />],
          ['Scenarios', 'scenarios', <SettingsInputAntenna />],
          ['Profile', 'profile', <AccountCircle />],
      ];
  }

  if (user.role === 'client_user') {
      leftNavigationItems = [
          ['Scenarios', 'scenarios', <SettingsInputAntenna />],
//            ['All Scenarios', 'scenarios-listing', <Ballot />],
          ['Portfolios', 'portfolios', <Apartment />],
          ['Jobs', 'jobs', <Settings />], //job-settings
          ['Profile', 'profile', <AccountCircle />],
    ['Plots', 'plots', <GraphicEq />],
      ];
  }

  if (user.role === 'client_admin') {
      leftNavigationItems = [
          ['Sapiat Account', 'account', <BusinessIcon />],
          ['Manage Members', 'members', <Group />],
          ['Scenarios', 'scenarios', <SettingsInputAntenna />],
          ['Security', 'security', <Security />],
          ['Usage Metrics', 'usage', <Assessment />],
          ['Profile', 'profile', <AccountCircle />],
      ]
  }


const handleRightNavigation = () => {
  setHideNavs(Boolean(true));
}

  const leftNavigation =  leftNavigationItems?.length > 0 ? <HorizontalNavigation items={leftNavigationItems} 
   /> : <></>
   const rightNavigation =  rightNavigationItems?.length > 0 ? <HorizontalNavigation items={rightNavigationItems} 
  onChange={handleRightNavigation} 
   /> : <></>

  //  const rightNavigation =  rightNavigationItems?.length > 0 ? <HorizontalNavigation items={rightNavigationItems} slug={contentSection} onChange={handleRightNavigation} /> : <></>
  //  const leftSidebarNavigation = leftSidebarNavItems?.length > 0 ? <SideBarNavigation items={leftSidebarNavItems} slug={contentSection} onChange={handleLeftNavigation} /> : <></>
  //  const spacing = (contentSection === 'scenarios-listing') ? 0 : 4;



   const Logout=()=>{
     return(
       <>
        <Route path="/logout">
           <LogoutDashboard />
        </Route>
        <Route path="/*" component={CommonLayout} />
       </>
     )
   }



  return(
    <>
    {(loggedInStatus && loggedInUser)? 
    <Router>
      <div>
    <SinglePage 
    navigation1={leftNavigation} 
    navigation2={rightNavigation} 
    // leftSideBar={leftSidebarNavigation} 
    hideNav={hideNavs} 
    // spacing={spacing}
    />
        {
          user.role==='client_user'
          &&
          <Switch>
          <Route path="/" exact>
            <ScenariosListing />
        </Route>
          <Route path="/scenarios" exact>
            <ScenariosListing />
            </Route>
            <Route path='/scenarios/add'>
              <ScenariosAdd/>
          </Route>
            <Route path='/scenarios/edit/:slug3' exact>
              <ScenariosEdit/>
          </Route>
          <Route path="/scenarios-listing">
            <ScenariosListingsDashboard/>
          </Route>
        <Route path="/profile">
          <ClientUserProfile/>
        </Route>
        <Route path="/portfolios" exact>
          <PortfolioListing />
        </Route>
        <Route path="/portfolios/add">
          <PortfoliosAdd />
        </Route>
        <Route path="/portfolios/edit/:slug3">
          <PortfoliosEdit />
        </Route>
        <Route path="/jobs" exact>
          <JobListing />
        </Route>
        <Route path="/jobs/add">
          <JobAdd />
        </Route>
        <Route path="/jobs/edit/:slug3">
          <JobEdit />
        </Route>
        <Route path="/plots">
          <Plots />
        </Route>
        <Route path="/job-settings">
        <ClientUserJobSettings />
        </Route>
        <Logout/>
          </Switch>
        }
        {
          user.role==='client_admin'
          &&
          <Switch>
        <Route path="/" exact>
        <AccountInformation />
        </Route>
        <Route path="/account">
        <AccountInformation />
        </Route>
        <Route path="/scenarios" exact>
        <ClientAdminSubscriptions />
        </Route>
        <Route path="/profile">
          <ProfileDashboard/>
        </Route>
        <Route path="/members" exact>
        <ClientAdminMembersList />
        </Route>
        <Route path="/members/add">
        <ClientAdminMembersAdd />
        </Route>
        <Route path="/security" exact>
        <UnderConstructionLayout />
        </Route>
        <Route path="/usage" exact>
        <UnderConstructionLayout />
        </Route>
        <Logout/>
        </Switch>
        }
        {
          user.role==='super_admin'&&
          <Switch>
        <Route path="/" exact>
        <ClientAdminSubscriptions />
        </Route>
        <Route path="/scenarios" exact>
        <ClientAdminSubscriptions />
        </Route>
        <Route path="/profile">
          <ProfileDashboard/>
        </Route>
        <Route path="/clients" exact>
        <ClientsList />
        </Route>
        <Route path="/clients/add" exact>
        <ClientsAdd />
        </Route>
        <Route path="/clients/edit/:id" exact>
        <ClientsAdd/>
        </Route>
        <Route path="/clients/members/:id/member" exact>
        <MembersAdd/>
        </Route>
        <Route path="/clients/members/:id" exact>
        <MembersList/>
        </Route>
        <Logout/>
        </Switch>
        }
    </div>
  </Router>
  :
    <Router>
      <Switch>
        {navigateTo === 'exit' && (
          <Route path="/logout" exact component={LogoutDisplay} />)}
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/*" component={CommonLayout} />
        </Switch>
    </Router>
}
    </>

  )
}
const WebApplication = () => (
  <React.StrictMode>
      <Theme>
        <AuthorizationProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Auth0ProviderWithHistory>
            <NewWebApplication />
          </Auth0ProviderWithHistory>
        </Suspense>
        </AuthorizationProvider>
      </Theme>
  </React.StrictMode>
);

ReactDOM.render(
  <WebApplication />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
