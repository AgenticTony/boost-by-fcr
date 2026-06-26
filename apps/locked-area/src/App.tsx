// P4: Testing CI/CD workflow
// Force fresh workflow run
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './auth/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Header from './components/Header'
import Login from './pages/login'
import Library from './pages/Library'
import ArticleDetail from './pages/ArticleDetail'
import ExerciseDetail from './pages/ExerciseDetail'
import { Resources } from './pages/Resources'
import { HandbookReader } from './pages/HandbookReader'
import { KnowledgeSection } from './pages/KnowledgeSection'

const queryClient = new QueryClient()

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: "80px" }}>
        {children}
      </div>
    </>
  );
}

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              <LoginLayout>
                <Login />
              </LoginLayout>
            } />
            
            <Route path="/" element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Library />
                </ProtectedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/article/:slug" element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <ArticleDetail />
                </ProtectedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/resources" element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Resources />
                </ProtectedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/exercise/:id" element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <ExerciseDetail />
                </ProtectedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/exercises" element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <ExerciseDetail />
                </ProtectedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/handbook" element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <HandbookReader />
                </ProtectedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/knowledge" element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <KnowledgeSection />
                </ProtectedLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}
