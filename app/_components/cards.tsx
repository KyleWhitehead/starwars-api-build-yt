"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

type Character = {
  id: number;
  name: string;
  image: string;
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const Name = styled.h3`
  padding: 1rem;
  color: white;
  font-size: 1rem;
  text-align: center;
`;

export default function Cards() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch("https://akabab.github.io/starwars-api/api/all.json")
      .then((res) => res.json())
      .then((data) => setCharacters(data.slice(0, 20))); // limit to 20 for now
  }, []);

  return (
    <Grid>
      {characters.map((char) => (
        <Card key={char.id}>
          <Image src={char.image} alt={char.name} />
          <Name>{char.name}</Name>
        </Card>
      ))}
    </Grid>
  );
}
