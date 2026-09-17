import React from "react";
import { Link } from "react-router-dom";
import {
  Gavel,
  ShoppingBag,
  ShieldCheck,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { MOCK_PRODUCTOS, MOCK_SUBASTAS, COFFEE_IMAGES } from "../data/mockData";
import { CoffeeCard } from "../components/common/CoffeeCard";
import { AuctionCard } from "../components/common/AuctionCard";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export const LandingPage: React.FC = () => {
  const cafesDestacados = MOCK_PRODUCTOS.slice(0, 3);
  const subastasEnVivo = MOCK_SUBASTAS.filter((s) => s.estado === "INICIADA");

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100/70 via-cream-50 to-white pt-12 pb-24 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 border border-forest-200 text-forest-900 text-xs font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                <span>Revolución en Subastas de Café de Especialidad</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-coffee-950 tracking-tight leading-[1.1]">
                El café conecta <span className="text-earth-600">personas</span>, historias y <span className="text-forest-700">oportunidades</span>.
              </h1>

              <p className="text-base sm:text-lg text-coffee-700 max-w-2xl font-normal leading-relaxed">
                Descubre cafés excepcionales del Eje Cafetero, participa en subastas en tiempo real con puja abierta y conecta directamente con productores sin intermediarios.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/productos">
                  <Button variant="primary" size="lg" icon={<ShoppingBag className="w-4 h-4" />}>
                    Explorar Cafés
                  </Button>
                </Link>

                <Link to="/subastas">
                  <Button variant="forest" size="lg" icon={<Gavel className="w-4 h-4" />}>
                    Subastas en Vivo
                  </Button>
                </Link>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-cream-200/80 max-w-lg">
                <div>
                  <span className="font-display font-black text-2xl text-coffee-950 block">86+ pts</span>
                  <span className="text-xs text-coffee-500 font-medium">Calificación SCA</span>
                </div>
                <div>
                  <span className="font-display font-black text-2xl text-forest-700 block">+140</span>
                  <span className="text-xs text-coffee-500 font-medium">Caficultores Aliados</span>
                </div>
                <div>
                  <span className="font-display font-black text-2xl text-earth-600 block">100%</span>
                  <span className="text-xs text-coffee-500 font-medium">Trazabilidad Origen</span>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-coffee-900 aspect-[4/5]">
                  <img
                    src={COFFEE_IMAGES.plantation}
                    alt="Cafetal colombiano en el Eje Cafetero"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/20 to-transparent" />

                  {/* Floating Overlay Card: Live Auction Snippet */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/80 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="forest" dot>EN VIVO AHORA</Badge>
                      <span className="text-[11px] font-bold text-coffee-500">Pitalito, Huila</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-coffee-950 truncate">
                      Geisha Honey Finca El Paraíso
                    </h4>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-cream-200">
                      <div>
                        <span className="text-[10px] text-coffee-400 font-bold block">PUJA LÍDER</span>
                        <span className="font-display font-black text-forest-800 text-sm">$1.850.000 COP</span>
                      </div>
                      <Link to="/subastas/subasta-activa-01">
                        <span className="text-xs font-bold text-earth-700 hover:underline flex items-center gap-1">
                          Pujar <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Decorative floating badge */}
                <div className="absolute -top-4 -left-4 bg-coffee-900 text-cream-50 p-3 rounded-2xl shadow-xl border border-coffee-800 flex items-center gap-3">
                  <Award className="w-6 h-6 text-earth-400" />
                  <div className="text-left pr-2">
                    <span className="text-[10px] uppercase font-bold text-earth-300 block">Certificación</span>
                    <span className="font-display font-bold text-xs">Eje Cafetero Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CARACTERÍSTICAS ("Todo el mundo del café en un solo lugar") */}
      <section id="caracteristicas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <Badge variant="coffee">Ecosistema Completo</Badge>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-coffee-950 tracking-tight">
            Todo el mundo del café en un solo lugar
          </h2>
          <p className="text-sm sm:text-base text-coffee-600">
            Una plataforma integral diseñada para transformar la manera en que se valora, compra y subasta el café de especialidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* Tarjeta 1: Subastas */}
          <div className="p-6 rounded-2xl bg-white border border-cream-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Gavel className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-coffee-950 mb-2">Subastas en Vivo</h3>
            <p className="text-xs text-coffee-600 leading-relaxed">
              Participa en subastas de lotes exclusivos con puja en tiempo real, regla anti-sniping y transparencia total.
            </p>
          </div>

          {/* Tarjeta 2: Compra Directa */}
          <div className="p-6 rounded-2xl bg-white border border-cream-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-earth-100 text-earth-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-coffee-950 mb-2">Compra Directa</h3>
            <p className="text-xs text-coffee-600 leading-relaxed">
              Encuentra cafés empacados y listos para despacho inmediato a precio fijo, directo de la finca tostadora.
            </p>
          </div>

          {/* Tarjeta 3: Trazabilidad */}
          <div className="p-6 rounded-2xl bg-white border border-cream-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-coffee-100 text-coffee-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-coffee-950 mb-2">Trazabilidad Total</h3>
            <p className="text-xs text-coffee-600 leading-relaxed">
              Conoce el origen exacto, altitud, variedad, proceso de beneficio y ficha técnica de catación de cada lote.
            </p>
          </div>

          {/* Tarjeta 4: Productores */}
          <div className="p-6 rounded-2xl bg-white border border-cream-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cream-200 text-coffee-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-coffee-950 mb-2">Productores Aliados</h3>
            <p className="text-xs text-coffee-600 leading-relaxed">
              Conecta con caficultores apasionados, descubre nuevas variedades exóticas y apoya el comercio justo real.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN SUBASTAS EN TIEMPO REAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">En Vivo Ahora</span>
            </div>
            <h2 className="font-display font-black text-3xl text-coffee-950">Subastas en tiempo real</h2>
            <p className="text-sm text-coffee-600 mt-1">
              Pujas abiertas, cronómetro sincronizado con el servidor y transmisión en directo.
            </p>
          </div>

          <Link to="/subastas">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Ver todas las subastas
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subastasEnVivo.map((subasta) => (
            <AuctionCard key={subasta.id} subasta={subasta} />
          ))}
        </div>
      </section>

      {/* 4. SECCIÓN CAFÉS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left gap-4">
          <div>
            <Badge variant="earth" className="mb-2">Vitrina de Especialidad</Badge>
            <h2 className="font-display font-black text-3xl text-coffee-950">Cafés destacados</h2>
            <p className="text-sm text-coffee-600 mt-1">
              Microlotes seleccionados listos para comprar con envío directo desde el Eje Cafetero.
            </p>
          </div>

          <Link to="/productos">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Explorar todo el catálogo
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cafesDestacados.map((producto) => (
            <CoffeeCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

      {/* 5. BANNER DE IMPACTO: RUPTURA DEL CONTRATO C DE NY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-coffee-950 text-cream-100 p-8 sm:p-14 border border-coffee-800 shadow-2xl text-left">
          <div className="relative z-10 max-w-2xl space-y-4">
            <Badge variant="forest" className="bg-forest-900/90 text-cream-50 border-forest-600">
              Manifiesto CafeOrbe
            </Badge>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-cream-50 tracking-tight">
              ¿Por qué romper el precio de la Bolsa de Nueva York?
            </h3>
            <p className="text-sm sm:text-base text-coffee-200 leading-relaxed">
              El Contrato C fija el precio del café como un commodity indiferenciado. En CafeOrbe creemos que la calidad artesanal, la altura y la dedicación de cada familia caficultora merecen un precio fijado por la libre competencia entre catadores del mundo.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-earth-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> +40% retorno al caficultor
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Trazabilidad de origen
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
