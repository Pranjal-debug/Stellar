import Container from "../common/Container";

export default function FormCard({ children }) {
  return (
    <Container>
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        {children}
      </div>
    </Container>
  );
}