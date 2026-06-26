import { Helmet } from 'react-helmet-async'

export default function Registration() {
  return (
    <>
      <Helmet>
        <title>Anmälan | Boost by FCR</title>
        <meta name="description" content="Anmäl dig till Boost by FCRs aktiviteter och initiativ. Fyll i formuläret så hör vi av oss." />
      </Helmet>

      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-boost-navy mb-4">Anmälan</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Fyll i formuläret nedan för att anmäla dig till våra aktiviteter. 
            Vi hör av oss inom kort med mer information.
          </p>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <iframe
              src={`https://docs.google.com/forms/d/e/${import.meta.env.VITE_GOOGLE_FORM_ID}/viewform?embedded=true`}
              width="100%"
              height="1200"
              frameBorder="0"
              title="Anmälningsformulär"
            >
              Läser in…
            </iframe>
          </div>
        </div>
      </div>
    </>
  )
}