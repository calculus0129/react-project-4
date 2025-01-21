"use client";

import { useState } from "react";

type Policy = {
  field: string;
  content: string;
  predicate: (value: string) => boolean;
};

const policies: Policy[] = [
  {
    field: "email",
    content: "email should contain @",
    predicate: (value: string) => value.includes("@"),
  },
  {
    field: "password",
    content: "password should be at least 6 characters",
    predicate: (value: string) => value.trim().length >= 6,
  },
];

const AuthInputs = () => {
  const [enteredContent, setEnteredContent] = useState<{
    [key: string]: string;
  }>({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setEnteredContent((prevContent) => {
      return {
        ...prevContent,
        [field]: value,
      };
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // console.log(enteredEmail, enteredPassword);
  };

  const invalidPolicies = policies.filter((policy: Policy) => {
    return !policy.predicate(enteredContent[policy.field])
      ? policy.field
      : undefined;
  });

  return (
    <div id="auth-inputs">
      <div className="controls">
        <p>
          <label>Email</label>
          <input
            type="email"
            className={
              invalidPolicies.filter((policy) => policy.field === "email")
                .length
                ? "invalid"
                : undefined
            }
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            className={
              invalidPolicies.filter((policy) => policy.field === "password")
                .length
                ? "invalid"
                : undefined
            }
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p>
      </div>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <button className="button" onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default AuthInputs;
