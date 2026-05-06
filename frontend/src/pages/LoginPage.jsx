// LoginPage.jsx
// Google OAuth only — Tailwind CSS
// Flow: click → GET /auth/google → Google login → /auth/google/callback → JWT → /auth/success?token=...

import { NavLink } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4">
      {/* Subtle radial glow behind the card */}
      <div className="absolute w-120 h-120 rounded-full bg-white/3 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-[#161616] border border-white/8 rounded-2xl px-8 py-10 shadow-2xl">
          {/* Logo mark */}
          <div className="flex justify-center mb-8">
            <div className="w-11 h-11 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center">
              {/* Replace with your own logo/icon */}
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-white text-[22px] font-semibold tracking-tight text-center mb-1">
            Welcome back
          </h1>
          <p className="text-white/40 text-sm text-center mb-8 leading-relaxed">
            Sign in to your account to continue
          </p>

          {/* Google OAuth button */}
          <a
            href={`${import.meta.env.VITE_API_URL}/auth/google`}
            className="flex items-center justify-center gap-3 w-full h-11 rounded-xl
                       bg-white text-[#1a1a1a] text-sm font-medium
                       hover:bg-white/90 active:scale-[0.98]
                       transition-all duration-150 shadow-sm"
          >
            {/* Google "G" logo */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.07 17.64 11.763 17.64 9.205z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </a>

          {/* Footer */}
          <p className="text-white/25 text-[11px] text-center mt-7 leading-relaxed">
            By continuing, you agree to our{' '}
            <a
              href="#"
              className="text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors"
            >
              Terms
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Bottom label */}
        <p className="text-white/20 text-xs text-center mt-5">Secured with Google OAuth 2.0</p>
      </div>
    </div>
  );
};

export default LoginPage;
