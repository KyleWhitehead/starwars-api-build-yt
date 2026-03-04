"use client";
import {
  Container,
  Main,
  Title,
  Description,
  CodeTag,
} from "./_components/sharedstyles";
import Cards from "./_components/cards";

export const metadata = {
  title: "Star Wars Clone",
  description: "Building a fullstack Star Wars app",
};

export default function Home() {
  return (
    <Container>
      <Main>
        <Title>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </Title>

        <Description>
          Get started by editing
          <CodeTag>app/page.tsx</CodeTag>
        </Description>

        <Cards />
      </Main>
    </Container>
  );
}