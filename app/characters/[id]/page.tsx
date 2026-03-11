// app/characters/[id]/page.tsx

import { notFound } from "next/navigation";
import styled from "styled-components";

type Character = {
  id: number;
  name: string;
  image: string;
  height?: number;
  mass?: number;
  gender?: string;
  homeworld?: string;
  species?: string;
};

async function getCharacter(id: string): Promise<Character | null> {
  const url = `https://akabab.github.io/starwars-api/api/id/${id}.json`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  // If the response is a 404, return null so caller can call notFound()
  if (res.status === 404) return null;

  if (!res.ok) {
    // Non-200/404 status - throw so caller can show an error
    const text = await res.text();
    throw new Error(`Fetch failed (${res.status}) - response snippet: ${text.slice(0, 200)}`);
  }

  // Defensive: ensure the server actually returned JSON before calling .json()
  const contentType = (res.headers.get("content-type") || "").toLowerCase();
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got ${contentType || "unknown content-type"} - snippet: ${text.slice(0, 200)}`);
  }

  return res.json();
}

export default async function Page({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // IMPORTANT: unwrap params because Next may pass it as a Promise
  const { id } = (await params) as { id: string };

  // Basic sanity check: if id is missing, treat as not found
  if (!id) {
    notFound();
  }

  let character: Character | null = null;
  try {
    character = await getCharacter(id);
  } catch (err: any) {
    // If you want, you can display a nicer UI here. For now we throw so dev console shows the full error.
    throw err;
  }

  if (!character) {
    // API returned 404 or null result
    notFound();
  }

  return (
    <Container>
      <ProfileCard>
        <CharacterImage src={character.image} alt={character.name} />
        <Info>
          <Name>{character.name}</Name>

          <Stat>
            <Label>Gender:</Label> {character.gender ?? "Unknown"}
          </Stat>

          <Stat>
            <Label>Height:</Label> {character.height ?? "Unknown"}
          </Stat>

          <Stat>
            <Label>Mass:</Label> {character.mass ?? "Unknown"}
          </Stat>

          <Stat>
            <Label>Homeworld:</Label> {character.homeworld ?? "Unknown"}
          </Stat>

          <Stat>
            <Label>Species:</Label> {character.species ?? "Unknown"}
          </Stat>
        </Info>
      </ProfileCard>
    </Container>
  );
}

/* styled components (keeps layout same as before) */
const Container = styled.div`
  min-height: 100vh;
  background: #0d0d0d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const ProfileCard = styled.div`
  display: flex;
  gap: 40px;
  background: #111;
  padding: 40px;
  border-radius: 12px;
  max-width: 900px;
`;

const CharacterImage = styled.img`
  width: 300px;
  border-radius: 10px;
`;

const Info = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.h1`
  margin-bottom: 20px;
`;

const Stat = styled.p`
  font-size: 1.1rem;
`;

const Label = styled.span`
  font-weight: bold;
`;