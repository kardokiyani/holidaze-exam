import { useState } from "react";

import { Link } from "react-router-dom";

import { Container, Form, Button, Alert } from "react-bootstrap";

const API_LOGIN = "https://api.noroff.dev/api/v1/holidaze/auth/login";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out both email and password.");
      return;
    }

    try {
      const response = await fetch(API_LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setError("Invalid email or password.");
        return;
      }

      const { accessToken, name } = await response.json();
      console.log(accessToken, name);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("name", name);
      setToken(accessToken);
      setEmail("");
      setPassword("");
      setError(null);
      window.location.href = "/profile";
      console.log("Successful login!");
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <Container className="login-container">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="form-control"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && (
          <Alert variant="danger" className="errorStyle">
            {error}
          </Alert>
        )}

        <Button className="submit-btn" variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <p>
        Don't have an account yet? <Link to="/signUp">Sign up here</Link>
      </p>
    </Container>
  );
}

export default SignIn;
