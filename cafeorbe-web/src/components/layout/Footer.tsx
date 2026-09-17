import React from "react";
import { Link } from "react-router-dom";
import { Coffee, ShieldCheck, Award, HeartHandshake, MapPin, Mail, Phone } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-coffee-950 text-cream-200 border-t border-coffee-800/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-coffee-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-coffee-900/60 border border-coffee-800">
            <div className="w-12 h-12 rounded-xl bg-forest-900/80 text-forest-300 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-cream-50 text-sm">Café de Especialidad 86+</h4>
              <p className="text-xs text-coffee-300 mt-0.5">Lotes calificados por catadores certificados Q-Grader.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-coffee-900/60 border border-coffee-800">
            <div className="w-12 h-12 rounded-xl bg-earth-900/80 text-earth-300 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-cream-50 text-sm">Comercio 100% Directo</h4>
              <p className="text-xs text-coffee-300 mt-0.5">Rompemos el precio de bolsa para pagar lo justo al caficultor.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-coffee-900/60 border border-coffee-800">
            <div className="w-12 h-12 rounded-xl bg-coffee-800 text-earth-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-cream-50 text-sm">Pujas Auditadas y Anti-Sniping</h4>
              <p className="text-xs text-coffee-300 mt-0.5">Tecnología de subasta transparente y en tiempo real.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Column 1: Brand & Origin */}
          <div className="space-y-4 text-left md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coffee-800 flex items-center justify-center text-earth-400">
                <Coffee className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="font-display font-extrabold text-xl text-cream-50 tracking-tight">
                CafeOrbe
              </span>
            </div>
            <p className="text-xs text-coffee-300 leading-relaxed">
              La plataforma que conecta a los productores más apasionados del Eje Cafetero colombiano con catadores y compradores de todo el mundo mediante subastas en vivo.
            </p>
            <div className="flex items-center gap-2 text-xs text-earth-400 font-semibold">
              <MapPin className="w-4 h-4 text-earth-500" />
              <span>Armenia, Quindío · Eje Cafetero, Colombia</span>
            </div>
          </div>

          {/* Column 2: Explorar */}
          <div className="text-left space-y-3">
            <h4 className="font-display font-bold text-cream-50 text-sm uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2 text-xs text-coffee-300">
              <li><Link to="/productos" className="hover:text-cream-50 transition-colors">Cafés de Especialidad</Link></li>
              <li><Link to="/subastas" className="hover:text-cream-50 transition-colors">Subastas en Tiempo Real</Link></li>
              <li><Link to="/productos" className="hover:text-cream-50 transition-colors">Microlotes de Huila</Link></li>
              <li><Link to="/productos" className="hover:text-cream-50 transition-colors">Variedades Exóticas (Geisha, Wush)</Link></li>
            </ul>
          </div>

          {/* Column 3: Regiones */}
          <div className="text-left space-y-3">
            <h4 className="font-display font-bold text-cream-50 text-sm uppercase tracking-wider">Orígenes de Origen</h4>
            <ul className="space-y-2 text-xs text-coffee-300">
              <li><span className="text-cream-100 font-medium">Quindío:</span> Génova, Buenavista, Pijao</li>
              <li><span className="text-cream-100 font-medium">Huila:</span> Pitalito, San Agustín, Gigante</li>
              <li><span className="text-cream-100 font-medium">Risaralda:</span> Santa Rosa de Cabal, Belén</li>
              <li><span className="text-cream-100 font-medium">Caldas:</span> Chinchiná, Manizales</li>
              <li><span className="text-cream-100 font-medium">Nariño:</span> La Unión, Buesaco</li>
            </ul>
          </div>

          {/* Column 4: Contacto */}
          <div className="text-left space-y-3">
            <h4 className="font-display font-bold text-cream-50 text-sm uppercase tracking-wider">Contacto & Alianzas</h4>
            <div className="space-y-2 text-xs text-coffee-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-earth-400" />
                <span>contacto@cafeorbe.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-earth-400" />
                <span>+57 (6) 745-9000</span>
              </div>
              <p className="text-[11px] text-coffee-400 pt-2">
                ¿Eres productor del Eje Cafetero y quieres subastar tu lote? Escríbenos para agendar catación en laboratorio.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-coffee-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-coffee-400">
          <p>© 2026 CafeOrbe Inc. Todos los derechos reservados. Hecho con orgullo en el Eje Cafetero.</p>
          <div className="flex items-center gap-6">
            <a href="#terminos" className="hover:text-cream-50">Términos de Subasta</a>
            <a href="#privacidad" className="hover:text-cream-50">Privacidad</a>
            <a href="#trazabilidad" className="hover:text-cream-50">Certificación de Origen</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
