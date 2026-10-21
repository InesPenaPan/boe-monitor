import { useState } from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import GrantCard from '../components/GrantCard';
import CategoryFilter from '../components/CategoryFilter';
import { useFetchGrants } from '../hooks/useFetchGrants';

const CATEGORIES = ['Todas', 'Pymes', 'Autónomos', 'Estudiantes', 'General'];

/**
 * GrantsPage component that coordinates state management, category filtering,
 * and presentation layers for the grants portal.
 *
 * @component
 * @returns {JSX.Element} The rendered grants portal page.
 */
export default function GrantsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const { grants, isLoading, error } = useFetchGrants();

  const filteredGrants = selectedCategory === 'Todas'
    ? grants
    : grants.filter((item) => item.perfil?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1e293b] font-sans antialiased selection:bg-[#002b49] selection:text-white">
      <Header />
      <HeroBanner />

      {/* Catalog of open grants */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-light text-[#002b49] tracking-tight">
              Convocatorias Registradas
            </h3>
          </div>

          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            Consultando registros en la base de datos...
          </div>
        ) : error ? (
          <div className="p-4 bg-amber-50 border-l-4 border-[#ad1519] text-slate-800 text-sm">
            {error}
          </div>
        ) : filteredGrants.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm bg-white border border-dashed border-slate-300">
            No constan convocatorias registradas para el perfil seleccionado.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGrants.map((grant) => (
              <GrantCard
                key={grant.boe_id || grant.id}
                grant={grant}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}