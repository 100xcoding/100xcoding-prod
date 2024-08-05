import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-300">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
