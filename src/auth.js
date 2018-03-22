import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import decode from "jwt-decode";

export const checkAuth = () => {
	const token = getCookieValue("token");
	const refreshToken = getCookieValue("refresh-token");
  
	if (!token || !refreshToken) {
	  return false;
	}
  
	try {
	  const { exp } = decode(refreshToken);
  
	  if (exp < new Date().getTime() / 1000) {
		return false;
	  }
	} catch (e) {
	  return false;
	}
  
	return true;
};

export const getCookieValue = (name) => {
	var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
	if (match) return match[1];
	return null;
}

export const clearCookie = (name) => {
    document.cookie = `${name}=''; max-age=0; expires=${new Date().getTime() - 86400 * 1000};`;
}

export const AuthRoute = ({ component: Component, ...rest }) => (
	<Route
	  {...rest}
	  render={props => checkAuth() ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />}
	/>
)
  
export const NotAuthRoute = ({ component: Component, ...rest }) => (
	<Route
	  {...rest}
	  render={props => !checkAuth() ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />}
	/>
)