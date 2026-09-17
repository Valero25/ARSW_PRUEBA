import { useEffect, useState } from "react";

/**
 * "El temporizador se calcula, no se recibe" (README). El servidor manda un
 * deadline absoluto una vez; este hook calcula el desfase local una sola
 * vez y desde ahí cuenta hacia abajo. Nunca vuelve a preguntarle al
 * servidor cuánto tiempo queda.
 */
export function useCountdown(deadlineIso: string | null): number {
  const [segundosRestantes, setSegundosRestantes] = useState(0);

  useEffect(() => {
    if (!deadlineIso) {
      setSegundosRestantes(0);
      return;
    }

    const deadline = new Date(deadlineIso).getTime();

    const tick = () => {
      const restante = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setSegundosRestantes(restante);
    };

    tick();
    const intervalo = setInterval(tick, 250);
    return () => clearInterval(intervalo);
  }, [deadlineIso]);

  return segundosRestantes;
}
