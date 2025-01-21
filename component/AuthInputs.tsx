"use client";

import { useState } from "react";

type Policy = {
  field: string;
  content: string;
  predicate: (value: string) => boolean;
};

const FIELDS = ["email", "password"];

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
  }>(
    FIELDS.map((field) => ({ [field]: "" })).reduce((acc, curr) => {
      return { ...acc, ...curr };
    }),
  );
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

  const fieldInvalid = (field: string) => {
    return !!invalidPolicies.filter((policy) => policy.field === field).length;
  };

  return (
    <div id="auth-inputs">
      <div className="controls">
        <p>
          <label
            className={`anyClass ${fieldInvalid("email") ? "invalid" : ""}`}
          >
            Email
          </label>
          <input
            type="email"
            className={fieldInvalid("email") ? "invalid" : undefined}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <label
            className={`anyClass ${fieldInvalid("password") ? "invalid" : ""}`}
          >
            Password
          </label>
          <input
            type="password"
            className={fieldInvalid("password") ? "invalid" : undefined}
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
