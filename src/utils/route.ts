import { NavigationState } from '@react-navigation/native';

export const getActiveRouteName = (state: NavigationState) => {
  let route;
  route = state.routes[state.index];
  while (route.state && route.state.index) {
    route = route.state.routes[route.state.index];
  }
  return route.name;
};
