type Character = {
  id: number;
  name: string;
  image: string;
  height: number;
  mass: number;
  gender: string;
};

async function getCharacter(id: string) {
  const res = await fetch(
    `https://akabab.github.io/starwars-api/api/id/${id}.json`
  );

  return res.json();
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const character = await getCharacter(params.id);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>{character.name}</h1>

      <img src={character.image} width="300" />

      <p>Height: {character.height}</p>
      <p>Mass: {character.mass}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
}