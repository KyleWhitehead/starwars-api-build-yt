// app/characters/[id]/loading.tsx
export default function LoadingCharacter() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 12 }}>Loading character…</div>
        <div style={{ width: 220, height: 220, borderRadius: 8, background: "#111", margin: "0 auto", boxShadow: "inset 0 0 0 2px #222" }} />
      </div>
    </div>
  );
}
