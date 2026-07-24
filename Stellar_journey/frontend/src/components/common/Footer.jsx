import Container from "./Container";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-12 md:flex-row">
          <Logo />

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} StellarFund. Built on Stellar Soroban.
          </p>
        </div>
      </Container>
    </footer>
  );
}