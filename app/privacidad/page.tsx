import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad | EnSuPunto",
  description:
    "Información sobre cómo tratamos tus datos personales en EnSuPunto.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-semibold text-emerald-700">EnSuPunto</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Política de privacidad
        </h1>
        <p className="mt-4 text-sm text-slate-500">Última actualización: 23 de marzo de 2026</p>

        <div className="mt-8 space-y-8 text-slate-700">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">1. Responsable del tratamiento</h2>
            <p>
              Responsable: <strong>EnSuPunto</strong> (pendiente de completar denominación social
              definitiva).
            </p>
            <p>Email de contacto: hola@ensupunto.es</p>
            <p>
              Antes de publicar, completa aquí la razón social, NIF y domicilio legal de la
              entidad titular del proyecto.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">2. Qué datos tratamos</h2>
            <p>
              Tratamos los datos que nos facilitas en el formulario de validación, incluyendo:
              email, perfil, respuestas de encuesta y comentarios opcionales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">3. Finalidades del tratamiento</h2>
            <p>Usamos tus datos para:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Gestionar la lista de espera de EnSuPunto.</li>
              <li>Enviarte comunicaciones sobre evolución del proyecto y lanzamientos.</li>
              <li>Analizar necesidades de usuarios para priorizar funcionalidades.</li>
              <li>Atender solicitudes o consultas que nos envíes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">4. Base jurídica</h2>
            <p>
              La base legal es tu <strong>consentimiento</strong> al enviar el formulario y aceptar
              que tratemos tus datos para las finalidades anteriores (art. 6.1.a RGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              5. Conservación de los datos
            </h2>
            <p>
              Conservaremos tus datos mientras mantengamos la finalidad de validación y comunicación
              del proyecto, o hasta que solicites su supresión.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              6. Destinatarios y encargados
            </h2>
            <p>
              No cedemos tus datos a terceros salvo obligación legal. Podemos usar proveedores
              tecnológicos (por ejemplo, alojamiento, email o base de datos) que actúan como
              encargados del tratamiento bajo contrato.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              7. Transferencias internacionales
            </h2>
            <p>
              Algunos proveedores pueden estar fuera del Espacio Económico Europeo. En ese caso,
              aplicaremos garantías adecuadas conforme al RGPD (por ejemplo, cláusulas contractuales
              tipo).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">8. Tus derechos</h2>
            <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad.</p>
            <p>
              Para ello, escribe a <strong>hola@ensupunto.es</strong> indicando el derecho que
              deseas ejercer.
            </p>
            <p>
              También puedes presentar una reclamación ante la Agencia Española de Protección de
              Datos (AEPD) si consideras que el tratamiento no se ajusta a la normativa.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">9. Menores de edad</h2>
            <p>
              Esta web está dirigida a personas adultas. Si detectamos datos de menores sin
              autorización válida, los eliminaremos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">10. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política para reflejar cambios legales o del servicio. La
              versión vigente será siempre la publicada en esta página.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Volver a la landing
          </Link>
        </div>
      </div>
    </main>
  );
}
