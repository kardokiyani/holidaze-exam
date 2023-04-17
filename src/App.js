import React from "react";

import "./App.css";

import "./styles.css";

import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/UI/layout";

import HomePage from "./components/home";

import Contact from "./components/contact";

import SignIn from "./components/signIn";

import SignUp from "./signUp";

export function Home() {
  return (
    <main>
      <HomePage/>
    </main>
  );
}

function RouteNotFound() {
  return <div>Page not found</div>;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
