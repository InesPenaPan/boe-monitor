import escudoEspana from '../assets/escudo-espana.png';

/**
 * Header component representing the institutional branding banner for the application.
 *
 * Renders the official Spanish coat of arms, the application title and subtitle,
 * and a decorative national flag accent bar.
 *
 * @component
 * @returns {JSX.Element} The rendered institutional header banner.
 */
export default function Header() {
  return (
    <header className="bg-[#002b49] text-white select-none shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[110px] py-6 flex items-center justify-between gap-6">
   
        <div className="flex items-center gap-5">
          <img
            src={escudoEspana}
            alt="Escudo de España"
            className="h-20 w-auto object-contain shrink-0 drop-shadow-sm"
          />

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-light tracking-wide text-white leading-tight">
              Monitor de <strong className="font-semibold text-white">Ayudas y Subvenciones</strong>
            </span>
            <span className="text-xs font-normal text-slate-300 tracking-[0.24em] uppercase mt-1.5">
              Seguimiento del Boletín Oficial del Estado
            </span>
          </div>
        </div>
      </div>

      <div className="h-1.5 w-full flex">
        <div className="w-1/4 bg-[#ad1519]" />
        <div className="w-1/2 bg-[#fabd00]" />
        <div className="w-1/4 bg-[#ad1519]" />
      </div>
    </header>
  );
}