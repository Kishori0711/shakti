import Navbar from "@/components/landingPage/layout/Navbar";
import Footer from "@/components/landingPage/layout/footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}