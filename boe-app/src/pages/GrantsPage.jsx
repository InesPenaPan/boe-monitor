import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';

const CATEGORIES = ['Todas', 'Pymes', 'Autónomos', 'Estudiantes', 'General'];
const API_URL = 'http://localhost:5678/webhook/ayudas';

/**
 * GrantsPage component that handles state management, API data fetching,
 * category filtering, and rendering of the main application layout.
 *
 * @component
 * @returns {JSX.Element} The rendered grants portal page.
 */
export default function GrantsPage() {
  const [grants, setGrants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGrants() {
      try {
        setIsLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();
        setGrants(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching grants:', err);
        setError('No se pudo conectar con el servicio local de ayudas.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchGrants();
  }, []);

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
            <p className="text-xs text-slate-500 mt-0.5">
              Convocatorias abiertas de subvención recuperadas automáticamente
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs transition cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#002b49] text-white border-[#002b49] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
              <article
                key={grant.boe_id || grant.id}
                className="border border-slate-300 bg-white flex flex-col justify-between shadow-xs hover:border-[#002b49] transition"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-[10px] font-semibold tracking-wider text-[#002b49] uppercase bg-slate-100 border border-slate-200 px-2 py-0.5">
                      {grant.perfil || 'General'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {grant.boe_id || 'BOE-A-2026'}
                    </span>
                  </div>

                  <h4 className="text-base font-normal text-[#002b49] leading-snug mb-3">
                    {grant.titulo_limpio}
                  </h4>

                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <p>
                      <strong className="text-slate-800 font-medium">Órgano:</strong>{' '}
                      {grant.organo || 'No especificado'}
                    </p>
                    <p>
                      <strong className="text-slate-800 font-medium">Importe:</strong>{' '}
                      <span className="text-emerald-700 font-semibold">{grant.cuantia || 'No especificada'}</span>
                    </p>
                    <p>
                      <strong className="text-slate-800 font-medium">Límite de entrega:</strong>{' '}
                      <span className="text-[#ad1519] font-medium">{grant.fecha_limite || 'Sin fecha fijada'}</span>
                    </p>
                  </div>

                  {Array.isArray(grant.requisitos) && grant.requisitos.length > 0 && (
                    <div className="mt-3 pt-2 text-xs border-t border-slate-100">
                      <span className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider block mb-1">
                        Criterios:
                      </span>
                      <ul className="text-slate-600 space-y-1 pl-3.5 list-disc text-[11px]">
                        {grant.requisitos.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 border-t border-slate-200 px-5 py-3">
                  <a
                    href={grant.url_boe}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#002b49] hover:text-[#ad1519] transition flex items-center gap-1.5"
                  >
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-current text-[10px] leading-none">
                      ›
                    </span>
                    Ver disposición oficial en el BOE
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}