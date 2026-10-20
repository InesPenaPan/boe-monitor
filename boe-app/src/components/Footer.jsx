import { ExternalLink } from 'lucide-react';

/**
 * Footer component displaying institutional disclaimer and an external link to the official BOE portal.
 *
 * @component
 * @returns {JSX.Element} The rendered application footer.
 */
export default function Footer() {
  return (
    <footer className="mt-20 bg-[#002b49] text-slate-300 text-xs border-t-2 border-[#fabd00] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          Portal informativo independiente. Datos obtenidos a través de los canales RSS públicos y abiertos de la Agencia Estatal BOE.
        </p>

        <a
          href="https://www.boe.es"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors duration-150"
        >
          <span>Acceso al BOE</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </footer>
  );
}