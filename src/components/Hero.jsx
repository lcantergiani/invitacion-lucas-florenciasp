import { motion } from 'motion/react'
import { wedding } from '../data/wedding'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-[50px] text-center"
    >
      {/* Fondo beige claro (igual que la segunda página) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-sand/40" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
      />

      <div className="relative mx-auto flex min-h-[calc(100svh_-_100px)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.25rem] bg-ivory px-5 py-10 shadow-[0_25px_70px_-30px_rgba(43,41,37,0.45)] ring-1 ring-ink/5 sm:px-16 sm:py-16">
        {/* Textura de papel (imagen) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${import.meta.env.BASE_URL}textura2.png")` }}
        />
        {/* Marco interno */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-3 z-0 border border-ink/15 sm:inset-8"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex w-full flex-1 flex-col justify-between text-center font-serif uppercase tracking-[0.12em] text-ink"
        >
          {/* Padres (arriba) */}
          <motion.div
            variants={item}
            className="flex w-full items-start justify-between gap-2 text-[0.6rem] leading-tight tracking-normal sm:gap-6 sm:text-lg"
          >
            <div className="space-y-1 text-left">
              {wedding.parents.groom.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
            <div className="space-y-1 text-right">
              {wedding.parents.bride.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </motion.div>

          {/* Centro: capilla + nombres + invitación */}
          <motion.div variants={item} className="flex flex-col items-center">
            <img
              src={`${import.meta.env.BASE_URL}capilla2.png`}
              alt="Capilla"
              className="mx-auto w-40 sm:w-56"
            />

            <h1 className="mt-6 flex flex-col items-center gap-1 text-base leading-tight sm:mt-10 sm:text-2xl">
              <span>{wedding.couple.groom}</span>
              <span>{wedding.couple.bride}</span>
            </h1>

            <p className="mt-8 max-w-3xl text-[0.6rem] leading-relaxed tracking-normal lining-nums tabular-nums sm:mt-14 sm:text-lg">
              Te invitamos a celebrar nuestro matrimonio con una ceremonia
              religiosa en Casa Olivos de Chacabuco, Colina el día sábado 14 de
              noviembre a las 17:00 horas.
            </p>
          </motion.div>

          {/* Pie: recepción/ubicación · lista de novios · confirmar (centrado) */}
          <motion.div
            variants={item}
            className="w-full text-[0.6rem] leading-tight tracking-normal sm:mt-12 sm:text-lg"
          >
            <div className="flex w-full items-end justify-between gap-3 sm:gap-6">
              <div className="flex flex-col items-start space-y-1 text-left sm:space-y-0">
                <p>Y a una recepción</p>
                <p>en el mismo lugar</p>
                <a
                  href={wedding.map.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 transition-colors hover:text-accent hover:underline"
                >
                  (Ver ubicación)
                </a>
              </div>

              <div className="flex flex-col items-end space-y-1 text-right sm:space-y-0">
                <p>Novios Paris</p>
                <p className="lining-nums tabular-nums">({wedding.registryCode})</p>
                <a
                  href={wedding.registryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 transition-colors hover:text-accent hover:underline"
                >
                  Ver lista
                </a>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="#rsvp"
                className="underline-offset-2 transition-colors hover:text-accent hover:underline"
              >
                Confirma aquí
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
