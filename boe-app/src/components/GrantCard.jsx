/**
 * Renders an individual grant notice card with metadata, requirements, and an official external link.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.grant - Grant details object.
 * @param {string} [props.grant.boe_id] - Official gazette identifier.
 * @param {string} [props.grant.id] - Fallback identifier.
 * @param {string} [props.grant.perfil] - Target audience or profile.
 * @param {string} props.grant.titulo_limpio - Sanitized title of the grant call.
 * @param {string} [props.grant.organo] - Issuing authority or government body.
 * @param {string} [props.grant.cuantia] - Financial allocation or amount.
 * @param {string} [props.grant.fecha_limite] - Application deadline date.
 * @param {string[]} [props.grant.requisitos] - List of eligibility criteria.
 * @param {string} props.grant.url_boe - URL link to the official publication.
 * @returns {JSX.Element} The rendered grant card element.
 */
export default function GrantCard({ grant }) {
  return (
    <article className="border border-slate-300 bg-white flex flex-col justify-between shadow-xs hover:border-[#002b49] transition">
      <div className="p-5">
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-[11px] font-semibold tracking-wider text-[#002b49] uppercase bg-slate-100 border border-slate-200 px-2 py-0.5">
            {grant.perfil || 'General'}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {grant.boe_id || grant.id || 'BOE-A-2026'}
          </span>
        </div>

        <h4 className="text-lg font-normal text-[#002b49] leading-snug mb-3">
          {grant.titulo_limpio}
        </h4>

        <div className="space-y-1.5 text-sm text-slate-600 border-t border-slate-100 pt-3">
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
          <div className="mt-3 pt-2 text-sm border-t border-slate-100">
            <span className="font-semibold text-slate-700 text-xs uppercase tracking-wider block mb-1">
              Criterios de elegibilidad:
            </span>
            <ul className="text-slate-600 space-y-1 pl-3.5 list-disc text-xs">
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
          className="text-sm font-semibold text-[#002b49] hover:text-[#ad1519] transition flex items-center gap-1.5"
        >
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-current text-[11px] leading-none">
            ›
          </span>
          Ver disposición oficial en el BOE
        </a>
      </div>
    </article>
  );
}