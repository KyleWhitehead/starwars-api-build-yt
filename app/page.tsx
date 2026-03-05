import {
  Container,
  Main,
  Title,
  Description,
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
        <Title>Star Wars Characters</Title>
        <Description>
          Browse characters from the Star Wars universe
        </Description>
        <Cards />
      </Main>
    </Container>
  );
}