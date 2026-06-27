import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, AlertCircle, Lock, Eye, EyeOff, ArrowLeft, Sparkles, BookOpen, Users, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthContext'
import { passwordAuth } from '../auth/passwordAuth'

const loginSchema = z.object({
  email: z.string().email('Ogiltig e-postadress'),
  password: z.string().min(1, 'Lösenord krävs'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')

  const onSubmit = async (data: LoginForm) => {
    setError('')
    setIsLoading(true)
    try {
      const result = await passwordAuth.login(data.email, data.password)
      if (result.success) {
        login('authenticated-user-token')
        navigate('/', { replace: true })
      } else {
        setError(result.error || 'Felaktig e-post eller lösenord')
      }
    } catch (err) {
      setError('Ett fel inträffade. Försök igen.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-boost-navy flex">
      {/* LEFT SIDE — Hero Image & Content */}
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/deltagare_boostbyfcr_pa_trappa-scaled.jpg)' }}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-boost-navy/90 via-boost-navy/70 to-boost-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-boost-navy/80 via-transparent to-boost-navy/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
          {/* Top: Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <img 
              src="/images/logo_boostbyfcr_dark.png" 
              alt="Boost by FC Rosengård"
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Middle: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-4 w-4 text-boost-gold" />
              <p className="text-sm font-medium text-boost-gold tracking-widest uppercase">
                Sedan 2003
              </p>
            </div>

            <h1 className="text-4xl xl:text-5xl font-display font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              Tillsammans{' '}
              <span className="text-boost-gold">öppnar vi</span>{' '}
              vägar framåt
            </h1>

            <p className="text-lg leading-relaxed text-white/70 mb-8">
              Vi bygger förutsättningar som ger unga möjlighet att utvecklas,
              hitta riktning och forma sin framtid.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-boost-gold/10 border border-boost-gold/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-boost-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">Övningar & Handbok</p>
                  <p className="text-xs text-white/50">Strukturerat metodmaterial</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-boost-gold/10 border border-boost-gold/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-boost-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">Kunskapsmaterial</p>
                  <p className="text-xs text-white/50">För deltagare och handledare</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-boost-gold/10 border border-boost-gold/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-boost-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">Resultat & Uppföljning</p>
                  <p className="text-xs text-white/50">Följ din utveckling</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom: Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-8"
          >
            <div>
              <p className="text-2xl font-bold text-boost-gold">3 800+</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Deltagare</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-boost-gold">20+</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Års erfarenhet</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-boost-gold">98%</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Nöjdhet</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SIDE — Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 md:p-12 relative"
      >
        {/* Mobile background image (only visible on small screens) */}
        <div className="absolute inset-0 lg:hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/deltagare_boostbyfcr_pa_trappa-scaled.jpg)' }}
          />
          <div className="absolute inset-0 bg-boost-navy/95 backdrop-blur-sm" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo (visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src="/images/logo_boostbyfcr_dark.png" 
              alt="Boost by FC Rosengård"
              className="h-8 w-auto mx-auto"
            />
          </div>

          {/* Login card */}
          <div className="bg-boost-navy-light/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-boost-gold to-transparent" />

            <div className="p-8">
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-boost-gold/20 to-boost-gold/5 border border-boost-gold/30 flex items-center justify-center mx-auto relative">
                    <Lock className="w-7 h-7 text-boost-gold" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-boost-gold rounded-full animate-pulse" />
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Metodmaterial
                </h1>
                <p className="text-white/50 mt-2 text-sm leading-relaxed">
                  Logga in för att komma åt övningar, handbok och kunskapsmaterial
                </p>
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-red-300 font-medium">Inloggning misslyckades</p>
                        <p className="text-sm text-red-400/70 mt-0.5">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative">
                    <label 
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === 'email' || emailValue
                          ? '-top-2 text-xs text-boost-gold bg-boost-navy-light px-1'
                          : 'top-3 text-sm text-white/40'
                      }`}
                    >
                      E-postadress
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      autoComplete="email"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-boost-gold/50 focus:ring-1 focus:ring-boost-gold/20 transition-all"
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-xs mt-1.5 ml-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                    <label 
                      htmlFor="password"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === 'password' || passwordValue
                          ? '-top-2 text-xs text-boost-gold bg-boost-navy-light px-1'
                          : 'top-3 text-sm text-white/40'
                      }`}
                    >
                      Lösenord
                    </label>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="current-password"
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-boost-gold/50 focus:ring-1 focus:ring-boost-gold/20 transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-xs mt-1.5 ml-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-boost-gold to-boost-gold-dark text-boost-navy py-3.5 px-6 rounded-xl font-bold hover:from-boost-gold-light hover:to-boost-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-boost-gold/20 hover:shadow-boost-gold/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-boost-navy/30 border-t-boost-navy rounded-full animate-spin" />
                        <span>Loggar in...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        <span>Logga in</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>

              {/* Divider */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <Sparkles className="w-4 h-4 text-boost-gold/50" />
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Back link */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-center"
              >
                <a 
                  href="https://boost-by-fcr.vercel.app/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-boost-gold transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Tillbaka till startsidan
                </a>
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-white/20 text-xs mt-6"
          >
            Boost by FC Rosengård — Metodmaterial för deltagare
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}