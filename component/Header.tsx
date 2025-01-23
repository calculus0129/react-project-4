import styled from "styled-components";

const StyledHeader = styled.header`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  & img {
    object-fit: contain; /* Image is reiszed to fit the given dimension */
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }

  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: Audiowide, sans-serif;
    margin: 0;
  }

  & p {
    text-align: center;
    color: #0073cf;
    margin: 0;
  }

  @media (min-width: 768px) {
    /* more margin: 2rem --> 4rem */
    & {
      margin-bottom: 4rem;
    }

    /* Bigger h1 font size: 1.5rem --> 2.25rem */
    & h1 {
      font-size: 2.25rem;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <img src="/logo.png" alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </StyledHeader>
  );
};

export default Header;
