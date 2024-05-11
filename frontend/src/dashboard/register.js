import React from "react";
import { Formik, Form, Field } from "formik";
import { ReactNotifications, Store } from "react-notifications-component";
import { json } from "react-router-dom";
import * as yup from "yup";
const valiSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("This field is required"),
  fname: yup
    .string()
    .min(3, "This name is too short - should be 3 chars minimum")
    .max(26, "This name is too long - should be 26 chars maximum")
    .required("This field is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
  confrimPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], 'Must match "password" field value')
    .required("This field is required"),
});

export default function Register({ Link, useNavigate, user }) {
  let navigate = useNavigate();
  React.useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, []);

  return (
    <div class="tw-flex tw-min-h-screen tw-bg-white">
      <ReactNotifications />

      <div class="tw-flex tw-flex-row-reverse tw-w-full tw-bg-re">
        <div class="tw-hidden lg:tw-flex tw-flex-col tw-justify-between tw-bg-spacialPurple lg:tw-p-8 xl:tw-p-12 lg:tw-max-w-sm xl:tw-max-w-lg">
          <div class="tw-flex tw-items-center tw-justify-start tw-space-x-3 tw-text-4xl">
            Taskello
          </div>
          <div class="tw-space-y-5">
            <h1 class="lg:tw-text-3xl xl:tw-text-5xl xl:tw-leading-snug tw-font-extrabold">
              Enter your account and discover new experiences
            </h1>
            <p class="tw-text-lg">You do not have an account?</p>
            <Link to="/signin">
              <button class="tw-inline-block tw-flex-none tw-px-4 tw-py-3 tw-border-2 tw-rounded-lg tw-font-medium tw-border-black tw-bg-black tw-text-white">
                Sign in
              </button>
            </Link>
          </div>
          <p class="tw-font-medium">© 2024 Taskello</p>
        </div>

        <div class="tw-flex tw-flex-1 tw-flex-col tw-items-center tw-justify-center tw-px-10 tw-relative">
          <div class="tw-flex lg:tw-hidden tw-justify-between tw-items-center tw-w-full tw-py-4">
            <div class="tw-flex tw-items-center tw-justify-start tw-space-x-3">
              <span class="tw-bg-black tw-rounded-full tw-w-6 tw-h-6"></span>
            </div>
            <div class="tw-flex tw-items-center tw-space-x-2">
              <span>Do you have account? </span>
              <Link to="/signin">
                <span>Sign in</span>
              </Link>
            </div>
          </div>
          <div class="tw-flex tw-flex-1 tw-flex-col  tw-justify-center tw-space-y-5 tw-max-w-md">
            <div class="tw-flex tw-flex-col tw-space-y-2 tw-text-center">
              <h1>Sign Up</h1>
              <p>Please enter your information to sign up.</p>
            </div>
            <div class="tw-flex tw-flex-col tw-max-w-md tw-space-y-5">
              <Formik
                initialValues={{
                  email: "",
                  fname: "",
                  password: "",
                  confrimPassword: "",
                }}
                validationSchema={valiSchema}
                onSubmit={async (formData) => {
                  let response = await fetch(
                    "http://test.soft-fire.com:8000/register",
                    {
                      body: JSON.stringify(formData),
                      method: "post",
                      headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                      },
                      credentials: "include",
                    }
                  );
                  response = await response.json();
                  if (response.status == "success") {
                    Store.addNotification({
                      title: "Success!",
                      message: `${response.data}`,
                      type: "success",
                      insert: "center",
                      container: "top-left",
                      animationIn: ["animate__animated", "animate__fadeIn"],
                      animationOut: ["animate__animated", "animate__fadeOut"],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                      },
                    });
                    setTimeout(() => {
                      navigate("/app");
                    }, 2000);
                  } else if (response.data == "Already logged in") {
                    Store.addNotification({
                      title: "Ops!",
                      message: `${response.data}`,
                      type: "danger",
                      insert: "center",
                      container: "top-right",
                      animationIn: ["animate__animated", "animate__fadeIn"],
                      animationOut: ["animate__animated", "animate__fadeOut"],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                      },
                    });
                    setTimeout(() => {
                      navigate("/app");
                    }, 2000);
                  } else {
                    Store.addNotification({
                      title: "Ops!",
                      message: `${response.data}`,
                      type: "danger",
                      insert: "center",
                      container: "top-left",
                      animationIn: ["animate__animated", "animate__fadeIn"],
                      animationOut: ["animate__animated", "animate__fadeOut"],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                      },
                    });
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form className=" tw-w-full">
                    {touched.email && errors.email && (
                      <div className=" tw-text-red-600 tw-mb-3">
                        {errors.email}
                      </div>
                    )}
                    <Field
                      name="email"
                      placeholder="Email"
                      class={`flex tw-px-3 tw-py-2 md:tw-px-4 md:tw-py-3 tw-border-2 tw-border-black tw-rounded-lg tw-font-medium placeholder:tw-font-normal tw-w-full tw-mb-5 ${
                        touched.email && errors.email
                          ? "tw-border tw-border-red-500"
                          : ""
                      }`}
                    />
                    {touched.fname && errors.fname && (
                      <div className=" tw-text-red-600 tw-mb-3">
                        {errors.fname}
                      </div>
                    )}

                    <Field
                      name="fname"
                      type="text"
                      placeholder="Full name"
                      class={`flex tw-px-3 tw-py-2 md:tw-px-4 md:tw-py-3 tw-border-2 tw-border-black tw-rounded-lg tw-font-medium placeholder:tw-font-normal tw-w-full tw-mb-5 ${
                        touched.fname && errors.fname
                          ? "tw-border tw-border-red-500"
                          : ""
                      }`}
                    />
                    {touched.password && errors.password && (
                      <div className=" tw-text-red-600 tw-mb-3">
                        {errors.password}
                      </div>
                    )}

                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      class={`flex tw-px-3 tw-py-2 md:tw-px-4 md:tw-py-3 tw-border-2 tw-border-black tw-rounded-lg tw-font-medium placeholder:tw-font-normal tw-w-full tw-mb-5 ${
                        touched.password && errors.password
                          ? "tw-border tw-border-red-500"
                          : ""
                      }`}
                    />
                    {touched.confrimPassword && errors.confrimPassword && (
                      <div className=" tw-text-red-600 tw-mb-3">
                        {errors.confrimPassword}
                      </div>
                    )}

                    <Field
                      name="confrimPassword"
                      type="password"
                      placeholder="Confirm Passowrd"
                      class={`flex tw-px-3 tw-py-2 md:tw-px-4 md:tw-py-3 tw-border-2 tw-border-black tw-rounded-lg tw-font-medium placeholder:tw-font-normal tw-w-full tw-mb-5 ${
                        touched.confrimPassword && errors.confrimPassword
                          ? "tw-border tw-border-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="submit"
                      className="tw-w-full tw-flex tw-items-center tw-justify-center tw-flex-none tw-px-3 tw-py-2 md:tw-px-4 md:tw-py-3 tw-border-2 tw-rounded-lg tw-font-medium tw-border-black tw-bg-black tw-text-white hover:tw-bg-white hover:tw-text-black tw-duration-200"
                    >
                      Sign Up
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
