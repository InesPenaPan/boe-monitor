import congresoImg from '../assets/congreso.jpg';
import boeLogo from '../assets/boe-logo.png';

/**
 * HeroBanner component that displays an informative overview of the BOE
 * and the grant-tracking system against a subtle background image.
 *
 * @component
 * @returns {JSX.Element} The rendered hero section.
 */
export default function HeroBanner() {
  const features = [
    {
      id: 'daily-detection',
      title: 'Detección diaria',
      desc: 'Rastreo y catalogación sistemática de subvenciones, dotaciones e incentivos económicos oficiales.',
    },
    {
      id: 'accessible-summary',
      title: 'Resumen accesible',
      desc: 'Extracción directa de cuantía presupuestaria máxima, perfil beneficiario y requisitos clave.',
    },
    {
      id: 'deadline-tracking',
      title: 'Control de plazos',
      desc: 'Seguimiento exacto de fechas límite de presentación para evitar convocatorias vencidas.',
    },
    {
      id: 'official-link',
      title: 'Disposición oficial',
      desc: 'Enlace al texto legal íntegro publicado en el BOE para tramitar la solicitud formal.',
    },
  ];

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-300 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={congresoImg}
          alt="Congreso de los Diputados"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#002b49]/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#0a3556]/30" />
      </div>

      {/* Main information card */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white/85 backdrop-blur-md border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Source identity and description */}
          <div className="lg:col-span-5 flex flex-col justify-start border-b lg:border-b-0 lg:border-r border-slate-300/60 pb-8 lg:pb-0 lg:pr-10">
            <div className="flex flex-col items-center text-center pb-2">
              <img
                src={boeLogo}
                alt="Boletín Oficial del Estado"
                className="h-28 w-auto object-contain mb-4 drop-shadow-sm"
              />
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest drop-shadow-xs">
                Fuente documental
              </span>
              <h3 className="text-xl font-normal text-[#002b49] tracking-tight mt-1 drop-shadow-xs">
                Boletín Oficial del Estado
              </h3>
            </div>

            <div className="space-y-4 text-sm text-slate-800/90 leading-relaxed mt-4 drop-shadow-xs">
              <p>
                El BOE es el diario oficial del Gobierno de España mediante el cual se promulgan las disposiciones generales, resoluciones y actos administrativos para su entrada en vigor.
              </p>
              <p>
                En su <strong className="text-slate-950 font-medium">Sección V (Anuncios: Otros anuncios particulares)</strong> se publican las convocatorias de ayudas públicas, programas sectoriales y asignaciones de crédito estatal.
              </p>
            </div>
          </div>

          {/* Right Column: Portal overview */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-4">
            <div className="mb-6">
              <span className="text-[11px] font-semibold text-[#002b49] uppercase tracking-widest drop-shadow-xs">
                Servicio de consulta
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#002b49] tracking-tight mt-1 drop-shadow-xs">
                ¿Qué es este portal?
              </h3>
              <p className="text-sm text-slate-800/90 mt-2 leading-relaxed drop-shadow-xs">
                Plataforma de seguimiento estructurado orientada a centralizar y ordenar las disposiciones relativas a financiación e incentivos públicos procedentes del BOE:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {features.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/70 border border-slate-200/80 p-4 flex flex-col justify-between shadow-xs transition-all duration-200 hover:bg-[#002b49] hover:border-[#002b49] hover:shadow-md cursor-default"
                >
                  <div>
                    <h4 className="text-xs font-semibold text-[#002b49] transition-colors duration-200 group-hover:text-white">
                      {item.title}
                    </h4>

                    <div className="h-[1px] w-8 bg-[#002b49] mt-1.5 mb-2 transition-colors duration-200 group-hover:bg-[#fabd00]" />

                    <p className="text-xs text-slate-700/90 leading-relaxed transition-colors duration-200 group-hover:text-slate-200">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}