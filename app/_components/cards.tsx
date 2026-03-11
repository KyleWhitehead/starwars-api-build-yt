"use client";

import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Image from "next/image";

type Character = {
  id: number;
  name: string;
  image: string;
  species?: string;
  gender?: string;
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.a`
  display: block;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }
`;

const Name = styled.h3`
  padding: 0.75rem 0.75rem;
  color: #fff;
  font-size: 0.96rem;
  text-align: center;
  margin: 0;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 480px;
  padding: 10px 12px;
  margin-bottom: 18px;
  border-radius: 8px;
  border: 1px solid #222;
  background: #0d0d0d;
  color: #eee;
  outline: none;
`;

const pulse = keyframes`
  0% { opacity: 1; transform: translateY(0); }
  50% { opacity: 0.6; transform: translateY(-4px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const SkeletonCard = styled.div`
  height: 320px;
  border-radius: 12px;
  background: linear-gradient(90deg, #111 0%, #0f0f0f 50%, #111 100%);
  animation: ${pulse} 1s ease-in-out infinite;
`;

export default function Cards() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState(q);

  // debounce the query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    let canceled = false;
    setLoading(true);

    fetch("https://akabab.github.io/starwars-api/api/all.json")
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((data: any[]) => {
        if (canceled) return;
        // map minimal fields — defensive
        const mapped = data
          .map((d) => ({
            id: d.id,
            name: d.name,
            image: d.image,
            species: d.species,
            gender: d.gender,
          }))
          .slice(0, 80); // load a reasonable amount
        setCharacters(mapped);
      })
      .catch((err) => {
        console.error("Failed to fetch characters", err);
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, []);

  const visible = useMemo(() => {
    if (!debouncedQ) return characters;
    return characters.filter((c) => c.name.toLowerCase().includes(debouncedQ));
  }, [characters, debouncedQ]);

  return (
    <>
      <SearchBar
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search characters (e.g. luke, vader, yoda)..."
        aria-label="Search characters"
      />
      {loading ? (
        // show skeleton grid
        (<Grid>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>)
      ) : (
        <Grid>
          {visible.map((char) => (
            <Link key={char.id} href={`/characters/${char.id}`}>
              {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
              }
              <div>
                {/* next/image will optimize the image; width/height help layout stability */}
                <div style={{ position: "relative", width: "100%", height: 220 }}>
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, 180px"
                    priority={false}
                  />
                </div>
                <Name>{char.name}</Name>
              </div>
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
}

