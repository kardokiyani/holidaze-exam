import React, { useState } from "react";

import { Container, Form, Button } from "react-bootstrap";

const API_REGISTER = "https://api.noroff.dev/api/v1/holidaze/auth/register";

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venueManager: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear any previous error messages
    setIsError(false);

    // Check if name is empty
    if (formData.name.trim() === "") {
      setIsError("Please enter your name.");
      return;
    }

    // Check if email is valid
    const isNoroffEmail = formData.email.endsWith("@stud.noroff.no");
    if (!isNoroffEmail) {
      setIsError("Only @stud.noroff.no emails are allowed to register.");
      return;
    }

    // Check if password is at least 8 characters long
    if (formData.password.length < 8) {
      setIsError("Password should be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          venueManager: formData.venueManager ? true : false,
        }),
      });
      const json = await response.json();
      console.log(json); // Log the response data
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError("Error loading data");
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      venueManager: name === "venueManager" ? checked : prevState.venueManager,
    }));
  };

  return (
    <Container className="register-container">
      <h1>Sign Up</h1>
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
            isInvalid={!!isError && formData.name.trim() === ""}
          />
          <Form.Control.Feedback type="invalid" className="errorStyle">
            {isError && formData.name.trim() === "" && isError}
          </Form.Control.Feedback>
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
            isInvalid={!!isError && !formData.email.endsWith("@stud.noroff.no")}
          />
          <Form.Control.Feedback type="invalid" className="errorStyle">
            {isError && !formData.email.endsWith("@stud.noroff.no")
              ? "Only @stud.noroff.no emails are allowed to register."
              : ""}
          </Form.Control.Feedback>
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
            isInvalid={!!isError && formData.password.length < 8}
          />
          <Form.Control.Feedback type="invalid" className="errorStyle">
            {isError && formData.password.length < 8
              ? "Password should be at least 8 characters long."
              : ""}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicAvatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            placeholder="Enter avatar URL"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicVenueManager">
          <Form.Check
            className="form-control"
            type="checkbox"
            label="Are you a venue manager?"
            name="venueManager"
            checked={formData.venueManager}
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
