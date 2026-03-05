import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: #0d0d0d;
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  color: #aaaaaa;
  margin-bottom: 3rem;
  text-align: center;
  font-size: 1.1rem;
`;

const CodeTag = styled.code`
  background: #222;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-family: monospace;
`;

export { Container, Main, Title, Description, CodeTag };