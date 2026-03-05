import { Hero } from "../components/Hero";

export function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-black selection:bg-pink-200 dark:selection:bg-pink-900">
      <Hero />
    </div>
  );
}
