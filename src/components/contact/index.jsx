import React from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Container, Button } from "react-bootstrap";

const schema = yup
  .object({
    fullName: yup
      .string()
      .min(3, "Your full name should be at least 4 characters.")
      .max(15, "Your full name cannot be longer than 10 characters.")
      .required("Please enter your full name"),
    email: yup
      .string()
      .min(3, "Must be a valid email address")
      .required("Please enter your mail"),
    subject: yup
      .string()
      .min(3, "Your subject name should be at least 10 characters.")
      .max(20, "Your subject cannot be longer than 20 characters.")
      .required("Please enter your subject"),
    body: yup
      .string()
      .min(3, "Your body should be at least 10 characters.")
      .max(50, "Your body cannot be longer than 40 characters.")
      .required("Please enter your body"),
  })
  .required();

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Container className="contact-container">
      <h1>Contact Us</h1>
      <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>
        <label className="labelStyle" htmlFor="full-name">
          Full Name
        </label>
        <input
          className="form-control"
          {...register("fullName")}
          placeholder="Enter full name"
        />
        <p className="errorStyle">{errors.fullName?.message}</p>
        <label className="labelStyle" htmlFor="email">
          Email
        </label>
        <input
          className="form-control"
          {...register("email")}
          placeholder="Enter email address"
        />
        <p className="errorStyle">{errors.email?.message}</p>
        <label className="labelStyle" htmlFor="subject">
          Subject
        </label>
        <input
          className="form-control"
          {...register("subject")}
          placeholder="Enter subject"
        />
        <p className="errorStyle">{errors.subject?.message}</p>
        <label className="labelStyle" htmlFor="body">
          Body
        </label>
        <input
          className="form-control"
          {...register("body")}
          placeholder="Enter body"
        />
        <p className="errorStyle">{errors.body?.message}</p>
        <Button className="submit-btn" variant="primary" type="submit">
          Send
        </Button>
      </form>
    </Container>
  );
  
}

export default Contact;
