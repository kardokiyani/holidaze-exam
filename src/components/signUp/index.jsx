import React, { useState } from "react";

import { Container, Form, Button, Alert } from "react-bootstrap";

const API_REGISTER = "https://api.noroff.dev/api/v1/holidaze/auth/register";

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if email is valid
      const isNoroffEmail = formData.email.endsWith("@stud.noroff.no");
      if (!isNoroffEmail) {
        setIsError("Only @stud.noroff.no emails are allowed to register.");
        return;
      }
      setIsError(false);
      setIsLoading(true);
      const response = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      console.log(json); // Log the response data
      setIsLoading(false);
      // Redirect to a success page or do something else
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }; 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container className="register-container">
      <h1>Sign Up</h1>
      {isError && <Alert variant="danger">Error loading data</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="form-control"
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="submit-btn" variant="primary" type="submit">
          Register
        </Button>
      </Form>
      {isLoading && <div>Loading data</div>}
    </Container>
  );
}

export default SignUp;
