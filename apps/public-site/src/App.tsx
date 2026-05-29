import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* Eager — always visible or needed for initial shell */
import NotFoundPage from "@/pages/not-found";

/* Lazy — code-split per route */
const HomePage = lazy(() => import("@/pages/home"));
const AnmalDigPage = lazy(() => import("@/pages/anmal-dig"));
const ArbetssokandePage = lazy(() => import("@/pages/arbetssokande"));
const BridgePage = lazy(() => import("@/pages/bridge"));
const DataskyddspolicyPage = lazy(() => import("@/pages/dataskyddspolicy"));
const ForetagPage = lazy(() => import("@/pages/foretag"));
const HalsosparetPage = lazy(() => import("@/pages/halsosparet"));
const KontaktPage = lazy(() => import("@/pages/kontakt"));
const LedigaTjansterPage = lazy(() => import("@/pages/lediga-tjanster"));
const NyheterPage = lazy(() => import("@/pages/nyheter"));
const NyheterSlugPage = lazy(() => import("@/pages/nyheter-slug"));
const PressMediaPage = lazy(() => import("@/pages/press-media"));
const ResurserPage = lazy(() => import("@/pages/resurser"));
const StudierPage = lazy(() => import("@/pages/studier"));
const VadViGorPage = lazy(() => import("@/pages/vad-vi-gor"));
const VarHistoriaPage = lazy(() => import("@/pages/var-historia"));
const VanligaFragorPage = lazy(() => import("@/pages/vanliga-fragor"));
const VemViArPage = lazy(() => import("@/pages/vem-vi-ar"));

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-brand-gold" />
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/anmal-dig" element={<AnmalDigPage />} />
            <Route path="/arbetssokande" element={<ArbetssokandePage />} />
            <Route path="/bridge" element={<BridgePage />} />
            <Route
              path="/dataskyddspolicy"
              element={<DataskyddspolicyPage />}
            />
            <Route path="/foretag" element={<ForetagPage />} />
            <Route path="/halsosparet" element={<HalsosparetPage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/lediga-tjanster" element={<LedigaTjansterPage />} />
            <Route path="/nyheter" element={<NyheterPage />} />
            <Route path="/nyheter/:slug" element={<NyheterSlugPage />} />
            <Route path="/press-media" element={<PressMediaPage />} />
            <Route path="/resurser" element={<ResurserPage />} />
            <Route path="/studier" element={<StudierPage />} />
            <Route path="/vad-vi-gor" element={<VadViGorPage />} />
            <Route path="/var-historia" element={<VarHistoriaPage />} />
            <Route path="/vanliga-fragor" element={<VanligaFragorPage />} />
            <Route path="/vem-vi-ar" element={<VemViArPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
