"use client";
import { useState } from "react";
import styled, { css } from "styled-components";

// specificity 0-0-1-0
const Input = styled.input<{ $invalid?: boolean }>`
  &[type="email"] {
    // specificity 0-0-2-0
    width: 100%;
    padding: 0.75rem 1rem;
    line-height: 1.5;
    background-color: #d1d5db;
    color: #374151;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);

    ${(props) => {
      if (props.$invalid) {
        return css`
          color: #0073cf;
          border-color: #a06080;
          background-color: #fed2fe;
        `;
      }
    }}
  }
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  & input {
    // This has specificity 0-0-1-1.
    width: 100%;
    padding: 0.75rem 1rem;
    line-height: 1.5;
    background-color: #d1d5db;
    color: #374151;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
`;

// Note that the styled-components stylings are applied subsequently to the .module.css or external CSS.

// With this code, Label component without the 'invalid' prop works as expected.

// Specificity: 0-0-1-0
interface LabelProps {
  invalid?: boolean;
}

// Use styled-components' `shouldForwardProp` to filter out `invalid` prop.
const Label = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "invalid", // Do not pass `invalid` to the DOM.
})<LabelProps>`
  & {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${(props) => (props.invalid ? "#f87171" : "#6b7280")};
  }
  // Specificity: 0-0-2-0
  // &.invalid {
  //   color: #0073cf;
  // }
`;

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
      <ControlContainer>
        <p>
          <Label invalid={fieldInvalid("email")}>Email</Label>
          <Input
            type="email"
            $invalid={fieldInvalid("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <Label invalid={fieldInvalid("password")}>Password</Label>
          <input
            type="password"
            className={fieldInvalid("password") ? "invalid" : undefined}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p>
      </ControlContainer>
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
