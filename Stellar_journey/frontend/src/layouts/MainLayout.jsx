import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}