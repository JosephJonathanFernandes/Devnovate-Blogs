
import { HomeTabs } from "@/components/HomeTabs";
import { LoadMoreSection } from "@/components/LoadMoreSection";

const Home = () => {
  const { activeTab, setActiveTab, allBlogs, loading } = useHomePage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header />
      <Hero />
      <main id="articles" className="container mx-auto px-4 py-16">
        <HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} allBlogs={allBlogs} loading={loading} />
        <LoadMoreSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;