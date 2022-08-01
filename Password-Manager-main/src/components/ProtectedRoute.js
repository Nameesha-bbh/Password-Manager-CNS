import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./Authentication/Login";
const jwt = require('jsonwebtoken');
 

function ProtectedRoute(){
    const isLoggedIn = useSelector(state => state.loggedIn)
    const token = useSelector(state => state.token)

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    
}

export default ProtectedRoute;