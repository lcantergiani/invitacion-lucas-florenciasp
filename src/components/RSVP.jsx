import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { viewportReveal } from '../lib/motion'
import SectionTitle from './SectionTitle'

const ease = [0.22, 1, 0.36, 1]

const initialForm = {
  name: '',
  attendance: 'yes',
  diet: '',
  song: '',
}

// Web app de Google Apps Script que guarda las respuestas en la planilla.
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxdng8T57kBzqieRFhPRNA69X40WwhEWj5Nv3xZ3q9dYQD1c9eqBA339ryVI0jbLwNteA/exec'

export default function RSVP() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    const asiste = form.attendance === 'yes'
    const body = new URLSearchParams({
      nombre: form.name,
      asistencia: asiste ? 'Sí' : 'No',
      acompanante: '',
      comentario: asiste ? form.diet : '',
      cancion: asiste ? form.song : '',
    })
    try {
      // mode:'no-cors' → la respuesta es opaca, pero el dato se guarda igual.
      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body })
    } catch (err) {
      // Ignoramos errores de lectura; la fila ya se agregó en la planilla.
    }
    setSending(false)
    setSent(true)
  }

  const inputClass =
    'w-full rounded-lg border border-accent/70 bg-ivory px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-stone/50 focus:border-accent'

  return (
    <section id="rsvp" className="section-pad">
      <motion.div {...viewportReveal} className="mx-auto max-w-xl">
        <SectionTitle eyebrow="Te esperamos" title="Confirma tu asistencia" />

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease }}
              className="rounded-2xl bg-sand/50 px-8 py-14 text-center"
            >
              <p className="font-serif text-3xl font-light text-ink">
                ¡Gracias{form.name ? `, ${form.name.split(' ')[0]}` : ''}!
              </p>
              <p className="mt-4 font-sans text-sm font-light text-stone">
                {form.attendance === 'yes'
                  ? 'Recibimos tu confirmación. Nos vemos el 14 de noviembre.'
                  : 'Lamentamos que no puedas acompañarnos. ¡Gracias por avisar!'}
              </p>
              <button
                onClick={() => {
                  setForm(initialForm)
                  setSent(false)
                }}
                className="mt-8 font-sans text-xs uppercase tracking-widest2 text-accent underline-offset-4 hover:underline"
              >
                Enviar otra respuesta
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Nombre */}
              <div>
                <label className="mb-2 block font-sans text-xs uppercase tracking-widest2 text-stone">
                  Nombre y apellido
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </div>

              {/* Asistencia */}
              <div>
                <label className="mb-3 block font-sans text-xs uppercase tracking-widest2 text-stone">
                  ¿Vas a asistir?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'yes', label: 'Sí, ahí estaré' },
                    { value: 'no', label: 'No podré' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update('attendance', opt.value)}
                      className={`rounded-lg border px-4 py-3 font-sans text-sm transition-colors ${
                        form.attendance === opt.value
                          ? 'border-accent bg-accent/10 text-ink'
                          : 'border-accent/70 text-stone hover:border-accent/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campos condicionales si asiste */}
              <AnimatePresence initial={false}>
                {form.attendance === 'yes' && (
                  <motion.div
                    key="extra"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="space-y-6 overflow-hidden"
                  >
                    {/* Restricciones alimentarias */}
                    <div>
                      <label className="mb-2 block font-sans text-xs uppercase tracking-widest2 text-stone">
                        Restricciones alimentarias
                      </label>
                      <textarea
                        rows={3}
                        value={form.diet}
                        onChange={(e) => update('diet', e.target.value)}
                        placeholder="Vegetariano, celíaco, alergias… (opcional)"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Canción que no puede faltar */}
                    <div>
                      <label className="mb-2 block font-sans text-xs uppercase tracking-widest2 text-stone">
                        Canción que no puede faltar
                      </label>
                      <input
                        type="text"
                        value={form.song}
                        onChange={(e) => update('song', e.target.value)}
                        placeholder="Ese tema que no puede faltar (opcional) 🎶"
                        className={inputClass}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enviar */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ y: sending ? 0 : -3 }}
                whileTap={{ scale: sending ? 1 : 0.97 }}
                transition={{ duration: 0.3, ease }}
                className="w-full rounded-full bg-ink px-8 py-4 font-sans text-xs uppercase tracking-widest2 text-ivory transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Enviando…' : 'Enviar confirmación'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
