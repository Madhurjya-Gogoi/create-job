import { Switch, Route } from 'react-router-dom';
import { JobDetails, JobListing } from '../pages/job';
import Error from '../pages/error';

const NotFound = () => <h1>Page Not Found</h1>;

const notFoundRoute: RouteDefinition = {
  path: '*',
  component: NotFound,
  exact: false,
};

const paths = {
  jobDetails: '/job',
};

export const routes: RouteDefinition[] = [
  {
    path: paths.jobDetails + '/:id',
    component: JobDetails,
    exact: true,
  },
  {
    path: '/',
    component: JobListing,
    exact: true,
  },
  {
    path: '/error',
    component: Error,
    exact: true,
  },
].concat(notFoundRoute as any);

export interface RouteDefinition {
  path: string;
  component?: any;
  exact: boolean;
}

const Routes = () => {
  return (
    <Switch>
      {routes.map((route: any, i: number) => {
        return <Route key={i} path={route.path} exact={route.exact} component={route.component} />;
      })}
    </Switch>
  );
};

export default Routes;
