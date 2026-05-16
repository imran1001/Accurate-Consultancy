# Replace `src/App.jsx` With This Full Code

Copy ALL the code below and paste it into `src/App.jsx`.

```jsx
import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Accurate Consultancy"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* CONTACT */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+92 316 0285386</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>info@accurate-consultancy.com</span>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-24 px-6 text-center bg-gradient-to-b from-[#0a1628] to-[#102340]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Accurate Consultancy
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Premium Immigration & Visa Consultancy for Canada, UK, USA,
            Australia, Europe and UAE.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923160285386"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold transition"
            >
              WhatsApp Consultation
            </a>

            <a
              href="mailto:info@accurate-consultancy.com"
              className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-xl font-semibold transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl shadow-lg border">
              <h3 className="text-2xl font-bold mb-4">Study Visas</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional student visa guidance for top international universities.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-lg border">
              <h3 className="text-2xl font-bold mb-4">Immigration</h3>
              <p className="text-gray-600 leading-relaxed">
                PR, skilled migration and settlement pathways for families and professionals.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-lg border">
              <h3 className="text-2xl font-bold mb-4">Tourist Visas</h3>
              <p className="text-gray-600 leading-relaxed">
                Fast and reliable tourist and visit visa assistance worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#07111f] py-12 px-6 text-center">
        <img
          src="/logo.png"
          alt="Accurate Consultancy"
          className="h-20 mx-auto mb-6"
        />

        <p className="text-gray-400 mb-4">
          Accurate Consultancy — Trusted Visa & Immigration Experts
        </p>

        <div className="flex justify-center gap-6 text-sm text-gray-300 mb-6">
          <span>+92 316 0285386</span>
          <span>info@accurate-consultancy.com</span>
        </div>

        <p className="text-gray-500 text-sm">
          © 2026 Accurate Consultancy. All rights reserved.
        </p>
      </footer>

      {/* WHATSAPP FLOAT BUTTON */}
      <a
        href="https://wa.me/923160285386"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
      >
        <MessageCircle size={30} className="text-white" />
      </a>
    </div>
  );
}
```

After pasting:

1. Save file
2. Commit changes on GitHub
3. Wait 1 minute
4. Refresh Vercel website

Your logo.png will automatically appear on the website.
