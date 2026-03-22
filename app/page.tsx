"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type UserRole = "parent" | "school" | "catering" | "other";
type ChildrenCount = "1" | "2" | "3+";
type PlanningTime = "lt30" | "30to60" | "1to2h" | "gt2h";
type InterestLevel =
  | "definitely_yes"
  | "probably_yes"
  | "not_sure"
  | "probably_no"
  | "definitely_no";
type ValuableFeature =
  | "menus_comedor"
  | "shopping_list"
  | "quick_recipes"
  | "reminders"
  | "community";
type FrustrationKey =
  | "daily_choice"
  | "cooking_time"
  | "food_waste"
  | "balanced_nutrition";

interface SurveyFormValues {
  email: string;
  role: UserRole | "";
  childrenCount: ChildrenCount | "";
  planningTime: PlanningTime | "";
  frustrations: Record<FrustrationKey, number>;
  interest: InterestLevel | "";
  valuableFeatures: ValuableFeature[];
  mustHave: string;
}

interface FormErrors {
  email?: string;
  role?: string;
  childrenCount?: string;
  planningTime?: string;
  interest?: string;
  valuableFeatures?: string;
}

const roleOptions: Array<{ value: UserRole; label: string }> = [
  { value: "parent", label: "Padre/madre con hijos en el colegio" },
  { value: "school", label: "Trabajo en un colegio/centro educativo" },
  { value: "catering", label: "Trabajo en catering escolar" },
  { value: "other", label: "Otro" },
];

const planningTimeOptions: Array<{ value: PlanningTime; label: string }> = [
  { value: "lt30", label: "Menos de 30 minutos" },
  { value: "30to60", label: "30 min - 1 hora" },
  { value: "1to2h", label: "1-2 horas" },
  { value: "gt2h", label: "Más de 2 horas" },
];

const interestOptions: Array<{ value: InterestLevel; label: string }> = [
  { value: "definitely_yes", label: "Definitivamente sí" },
  { value: "probably_yes", label: "Probablemente sí" },
  { value: "not_sure", label: "No estoy seguro/a" },
  { value: "probably_no", label: "Probablemente no" },
  { value: "definitely_no", label: "Definitivamente no" },
];

const valuableFeatureOptions: Array<{ value: ValuableFeature; label: string }> =
  [
    {
      value: "menus_comedor",
      label: "Menús personalizados según el comedor",
    },
    {
      value: "shopping_list",
      label: "Lista de compra con cantidades exactas",
    },
    { value: "quick_recipes", label: "Recetas rápidas (< 30 min)" },
    { value: "reminders", label: "Recordatorios y notificaciones" },
    { value: "community", label: "Ver qué comen otras familias" },
  ];

const frustrationItems: Array<{ key: FrustrationKey; label: string }> = [
  { key: "daily_choice", label: "No sé qué cocinar cada día" },
  { key: "cooking_time", label: "Tengo poco tiempo para cocinar" },
  { key: "food_waste", label: "Desperdicio mucha comida" },
  {
    key: "balanced_nutrition",
    label: "No sé si mis hijos comen equilibrado",
  },
];

const initialFormValues: SurveyFormValues = {
  email: "",
  role: "",
  childrenCount: "",
  planningTime: "",
  frustrations: {
    daily_choice: 3,
    cooking_time: 3,
    food_waste: 3,
    balanced_nutrition: 3,
  },
  interest: "",
  valuableFeatures: [],
  mustHave: "",
};

function validateEmail(value: string): boolean {
  const trimmed = value.trim();
  const atPosition = trimmed.indexOf("@");
  const dotPosition = trimmed.lastIndexOf(".");
  return atPosition > 0 && dotPosition > atPosition + 1 && dotPosition < trimmed.length - 1;
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-emerald-50/70">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 md:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-800">
            EnSuPunto
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Menos estrés en la cocina, más tiempo en familia
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-700">
            Planifica cenas equilibradas para tu familia en función de lo que
            tus hijos ya han comido en el colegio.
          </p>
          <p className="mt-4 max-w-xl text-base text-slate-600">
            Más tiempo en familia, menos desperdicio y mejor alimentación.
            Todo, en su punto.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#encuesta"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-700"
            >
              Únete a la lista de espera
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Ver cómo funciona
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-emerald-100/60">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-600">Vista previa de la app</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-emerald-100 bg-white p-4">
                <p className="text-sm font-medium text-slate-500">Menú del comedor</p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  Lentejas + merluza + fruta
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-500">Cena recomendada</p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  Crema de calabacín + tortilla + yogur natural
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-500">Lista de compra</p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  9 ingredientes para la semana
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const cards = [
    {
      title: "No sé qué cocinar hoy.",
      description:
        "Terminas improvisando cada noche y repitiendo platos que no siempre encajan con lo que ya han comido.",
    },
    {
      title: "Tiro comida cada semana.",
      description:
        "Compras de más, cocinas de más o te faltan ingredientes justo cuando más prisa tienes.",
    },
    {
      title: "No tengo tiempo para planificar.",
      description:
        "Entre trabajo, colegio y actividades, pensar menús completos cada semana se vuelve una carga.",
    },
  ];

  return (
    <section id="problema" className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ¿Te suena familiar?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: "Conecta con el colegio",
      description: "Sabemos qué ha comido tu hijo en el comedor escolar.",
    },
    {
      title: "Recibe propuestas equilibradas",
      description:
        "Te proponemos cenas y, más adelante, desayunos y meriendas para complementar el día.",
    },
    {
      title: "Compra sin sobrecostes",
      description: "Generamos una lista de la compra exacta para toda la semana.",
    },
  ];

  return (
    <section id="como-funciona" className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Tu copiloto de alimentación familiar
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const familyBenefits = [
    "Ahorro de tiempo en decisiones diarias.",
    "Menos desperdicio y mejor control de la compra.",
    "Más variedad en las cenas y más tranquilidad en casa.",
  ];

  const schoolBenefits = [
    "Servicio extra para familias del centro.",
    "Mayor engagement con el comedor escolar.",
    "Sin cambios en su operativa habitual.",
  ];

  return (
    <section id="beneficios" className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Beneficios para todos
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Para familias</h3>
            <ul className="mt-4 space-y-3 text-slate-700">
              {familyBenefits.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Para colegios</h3>
            <ul className="mt-4 space-y-3 text-slate-700">
              {schoolBenefits.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

interface SurveySectionProps {
  formValues: SurveyFormValues;
  errors: FormErrors;
  featureLimitError: string;
  submitSuccess: boolean;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  onRoleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInterestChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFrustrationChange: (key: FrustrationKey, value: number) => void;
  onFeatureToggle: (feature: ValuableFeature) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function SurveySection({
  formValues,
  errors,
  featureLimitError,
  submitSuccess,
  onInputChange,
  onRoleChange,
  onInterestChange,
  onFrustrationChange,
  onFeatureToggle,
  onSubmit,
}: SurveySectionProps) {
  const isParent = formValues.role === "parent";

  return (
    <section id="encuesta" className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:px-10 md:py-24 lg:grid-cols-[1fr_1.35fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Cuéntanos tu situación
          </h2>
          <p className="mt-4 text-slate-600">
            Queremos validar las prioridades reales de familias y colegios para
            construir EnSuPunto con foco en lo importante.
          </p>
          <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Este formulario es de validación temprana. Tus respuestas nos
            ayudan a priorizar el producto.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-800">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={onInputChange}
              placeholder="tu@email.com"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">¿Eres...? *</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {roleOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition ${
                    formValues.role === option.value
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={formValues.role === option.value}
                    onChange={onRoleChange}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role}</p>}
          </fieldset>

          {isParent && (
            <div>
              <label
                htmlFor="childrenCount"
                className="block text-sm font-semibold text-slate-800"
              >
                ¿Cuántos hijos tienes? *
              </label>
              <select
                id="childrenCount"
                name="childrenCount"
                value={formValues.childrenCount}
                onChange={onInputChange}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
              >
                <option value="">Selecciona una opción</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3 o más</option>
              </select>
              {errors.childrenCount && (
                <p className="mt-2 text-sm text-red-600">{errors.childrenCount}</p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="planningTime"
              className="block text-sm font-semibold text-slate-800"
            >
              ¿Cuánto tiempo dedicas semanalmente a planificar qué cocinar? *
            </label>
            <select
              id="planningTime"
              name="planningTime"
              value={formValues.planningTime}
              onChange={onInputChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
            >
              <option value="">Selecciona una opción</option>
              {planningTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.planningTime && (
              <p className="mt-2 text-sm text-red-600">{errors.planningTime}</p>
            )}
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">
              En una escala del 1 al 5, ¿cuánto te identificas con estos puntos?
            </legend>
            <div className="mt-4 space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              {frustrationItems.map((item) => (
                <div key={item.key}>
                  <div className="mb-2 flex items-center justify-between gap-2 text-sm">
                    <label htmlFor={item.key} className="font-medium text-slate-700">
                      {item.label}
                    </label>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {formValues.frustrations[item.key]}/5
                    </span>
                  </div>
                  <input
                    id={item.key}
                    type="range"
                    min={1}
                    max={5}
                    value={formValues.frustrations[item.key]}
                    onChange={(event) =>
                      onFrustrationChange(item.key, Number(event.target.value))
                    }
                    className="w-full accent-emerald-600"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">
              Si existiera una app que generara menús para tu familia según lo
              que comió tu hijo en el colegio, ¿la usarías? *
            </legend>
            <div className="mt-3 space-y-2">
              {interestOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                    formValues.interest === option.value
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="interest"
                    value={option.value}
                    checked={formValues.interest === option.value}
                    onChange={onInterestChange}
                    className="mt-0.5 h-4 w-4 accent-emerald-600"
                  />
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.interest && <p className="mt-2 text-sm text-red-600">{errors.interest}</p>}
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">
              ¿Qué funciones te aportarían más valor? (máximo 3) *
            </legend>
            <div className="mt-3 grid gap-2">
              {valuableFeatureOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-400"
                >
                  <input
                    type="checkbox"
                    checked={formValues.valuableFeatures.includes(option.value)}
                    onChange={() => onFeatureToggle(option.value)}
                    className="mt-0.5 h-4 w-4 accent-emerald-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {featureLimitError && (
              <p className="mt-2 text-sm text-amber-700">{featureLimitError}</p>
            )}
            {errors.valuableFeatures && (
              <p className="mt-2 text-sm text-red-600">{errors.valuableFeatures}</p>
            )}
          </fieldset>

          <div>
            <label htmlFor="mustHave" className="block text-sm font-semibold text-slate-800">
              ¿Hay algo que te gustaría que esta app hiciera sí o sí?
            </label>
            <textarea
              id="mustHave"
              name="mustHave"
              rows={4}
              value={formValues.mustHave}
              onChange={onInputChange}
              placeholder="Opcional"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
            />
          </div>

          <p className="text-xs leading-relaxed text-slate-500">
            Al enviar este formulario, aceptas que guardemos tus datos para
            informarte sobre el proyecto. Podrás darte de baja en cualquier
            momento.
          </p>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-700"
          >
            Enviar validación
          </button>

          {submitSuccess && (
            <p className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
              Gracias. Hemos guardado tu respuesta de validación.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function TeamSection() {
  const members = [
    {
      name: "Nombre fundador/a 1",
      bio: "Perfil producto y tecnología. Experiencia construyendo productos digitales para familias.",
    },
    {
      name: "Nombre fundador/a 2",
      bio: "Perfil negocio y operaciones. Foco en colegios, partnerships y crecimiento.",
    },
  ];

  return (
    <section id="equipo" className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Quiénes somos
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {members.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="h-28 w-28 rounded-2xl border border-slate-300 bg-slate-200" />
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{member.name}</h3>
              <p className="mt-2 text-slate-600">{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>Contacto: hola@ensupunto.com</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="transition hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="transition hover:text-white">
            Instagram
          </a>
          <a href="#" className="transition hover:text-white">
            X / Twitter
          </a>
          <a href="/privacidad" className="transition hover:text-white">
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [formValues, setFormValues] = useState<SurveyFormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [featureLimitError, setFeatureLimitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setSubmitSuccess(false);
    setErrors((previous) => ({ ...previous, [name]: undefined }));

    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedRole = event.target.value as UserRole;
    setSubmitSuccess(false);
    setErrors((previous) => ({
      ...previous,
      role: undefined,
      childrenCount: undefined,
    }));

    setFormValues((previous) => ({
      ...previous,
      role: selectedRole,
      childrenCount: selectedRole === "parent" ? previous.childrenCount : "",
    }));
  };

  const handleInterestChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedInterest = event.target.value as InterestLevel;
    setSubmitSuccess(false);
    setErrors((previous) => ({ ...previous, interest: undefined }));
    setFormValues((previous) => ({ ...previous, interest: selectedInterest }));
  };

  const handleFrustrationChange = (key: FrustrationKey, value: number) => {
    setSubmitSuccess(false);
    setFormValues((previous) => ({
      ...previous,
      frustrations: {
        ...previous.frustrations,
        [key]: value,
      },
    }));
  };

  const handleFeatureToggle = (feature: ValuableFeature) => {
    setSubmitSuccess(false);

    if (formValues.valuableFeatures.includes(feature)) {
      setFeatureLimitError("");
      setErrors((previous) => ({ ...previous, valuableFeatures: undefined }));
      setFormValues((previous) => ({
        ...previous,
        valuableFeatures: previous.valuableFeatures.filter((item) => item !== feature),
      }));
      return;
    }

    if (formValues.valuableFeatures.length >= 3) {
      setFeatureLimitError("Puedes seleccionar un máximo de 3 opciones.");
      return;
    }

    setFeatureLimitError("");
    setErrors((previous) => ({ ...previous, valuableFeatures: undefined }));
    setFormValues((previous) => ({
      ...previous,
      valuableFeatures: [...previous.valuableFeatures, feature],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: FormErrors = {};
    const trimmedEmail = formValues.email.trim();

    if (!validateEmail(trimmedEmail)) {
      newErrors.email = "Introduce un email válido.";
    }

    if (!formValues.role) {
      newErrors.role = "Selecciona tu perfil.";
    }

    if (formValues.role === "parent" && !formValues.childrenCount) {
      newErrors.childrenCount = "Indica cuántos hijos tienes.";
    }

    if (!formValues.planningTime) {
      newErrors.planningTime = "Selecciona una opción.";
    }

    if (!formValues.interest) {
      newErrors.interest = "Selecciona una opción.";
    }

    if (formValues.valuableFeatures.length === 0) {
      newErrors.valuableFeatures = "Selecciona al menos una función.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitSuccess(false);
      return;
    }

    const payload: SurveyFormValues = {
      ...formValues,
      email: trimmedEmail,
    };

    // Punto de integración recomendado:
    // 1) API interna: POST /api/lead para guardar en Supabase.
    //    await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    // 2) Servicio externo: reenviar estos datos a Tally/Typeform desde aquí o desde la API.
    console.log("EnSuPunto validation payload", payload);
    setSubmitSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <a href="#" className="text-lg font-bold tracking-tight text-slate-900">
            EnSuPunto
          </a>
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
            <a href="#problema" className="transition hover:text-slate-900">
              Problema
            </a>
            <a href="#como-funciona" className="transition hover:text-slate-900">
              Cómo funciona
            </a>
            <a href="#beneficios" className="transition hover:text-slate-900">
              Beneficios
            </a>
            <a href="#encuesta" className="transition hover:text-slate-900">
              Encuesta
            </a>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <BenefitsSection />
        <SurveySection
          formValues={formValues}
          errors={errors}
          featureLimitError={featureLimitError}
          submitSuccess={submitSuccess}
          onInputChange={handleInputChange}
          onRoleChange={handleRoleChange}
          onInterestChange={handleInterestChange}
          onFrustrationChange={handleFrustrationChange}
          onFeatureToggle={handleFeatureToggle}
          onSubmit={handleSubmit}
        />
        <TeamSection />
      </main>

      <SiteFooter />
    </div>
  );
}
