import React, { useState } from "react";
import image1 from './assets/diagrama.png'
function ValidarEntrada() {
  const [entrada, setEntrada] = useState("");
  const [resultado, setResultado] = useState("");
  const [recorrido, setRecorrido] = useState([]);
  
  const handleValidar = () => {
    const { resultadoValidacion, recorridoPasos } = validarAutomata(entrada);
    setResultado(resultadoValidacion);
    setRecorrido(recorridoPasos);
    alert(resultadoValidacion); 
  };
  
  return (
    <div>
      <h1>Validador de Entrada</h1>
      <input
        type="text"
        placeholder="Ingresa la entrada"
        value={entrada}
        onChange={(e) => setEntrada(e.target.value)}
      />
      <button onClick={handleValidar}>Validar</button>
      <div>{resultado}</div>
      <div>
        <h2>Recorrido:</h2>
        <ul>
          {recorrido.map((paso, index) => (
            <li key={index}>{paso}</li>
          ))}
        </ul>
      </div>
      <div>
        <img  src={image1}/>
      </div>
      
    </div>
  );
}

function validarAutomata(input) {
  const states = {
    q0: { D: "q29", L: "q1" },
    q1: { P: "q2" },
    q2: { D: "q3" },
    q3: { D: "q4" },
    q4: { R: "q5" },
    q5: { 5: "q6", 4: "q22" },
    q6: { '-': "q7"},
    q7: { 4: "q8", 5: "q12", 6: "q16" },
    q8: { 8: "q9" },
    q9: { 0: "q10" },
    q10: { 0: "q11" },
    q11: {},
    q12: { 2: "q13"},
    q13: { 0: "q14" },
    q14: { 0: "q15" },
    q15: {}, 
    q16: { 4: "q17" },
    q17: { 0: "q18" },
    q18: { 0: "q19" },
    q19: {}, 
    q22: { X: "q23" },
    q23: { '-': "q24" },
    q24: { 4: "q25" },
    q25: { 2: "q26" },
    q26: { 6: "q27" },
    q27: { 6: "q28" },
    q28: {}, 
    q29: { D: "q30" },
    q30: { R: "q31"}, 
    q31: { 4: "q38", 5: "q32"}, 
    q32: { '-': "q33", 5: "q34", 2: "q39" }, 
    q33: { 4: "q34", 5: "q48"}, 
    q34: { 8: "q35"},
    q35: { 0: "q36" },
    q36: { 0: "q37" },
    q37: {},
    q38: { '-': "q39"},
    q39: { 2: "q40", 3: "q44"},
    q40: { 4: "q41" },
    q41: { 0: "q42" },
    q42: { 0: "q43" },
    q43: {}, 
    q44: { 2: "q45" },
    q45: { 0: "q46" },
    q46: { 0: "q47" },
    q47: {},
    q48: { 6: "q49", 2: "q52"},
    q49: { 0: "q50" },
    q50: { 0: "q51" },
    q51: {},
    q52: { 0: "q53"},
    q53: { 0: "q54" },
    q54: {}, 
  };

  // entradas validas
  // "DDR4-3200"
  // "DDR4-2400"
  // "LPDDR5-5200"
  // "LPDDR4X-4266"
  // "LPDDR5-6400"
  // "LPDDR5-4800"
  // "DDR54800"
  // "DDR5-5200"
  // "DDR5-5600"
  
  let currentState = "q0"; // Estado inicial
  const recorridoPasos = ["q0"];
  
  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    const transition = states[currentState][currentChar];
    
    recorridoPasos.push(`q${i}: ${currentState} -> q${i + 1}: ${transition}`);
    
    if (!transition) {
      return {
        resultadoValidacion: `Entrada no válida en el caracter ${i + 1}: '${currentChar}' en el estado ${currentState}`,
        recorridoPasos,
      };
    }
    
    currentState = transition;
  }
  
  if (currentState === "q11" || currentState === "q15" || currentState === "q19"  || currentState === "q28" || currentState === "q37" || currentState === "q43" || currentState === "q47" || currentState === "q51" || currentState === "q54") {
    return {
      resultadoValidacion: "La entrada es válida",
      recorridoPasos,
    };
  } else {
    return {
      resultadoValidacion: `La entrada es incompleta. Se quedó en el estado ${currentState}`,
      recorridoPasos,
    };
  }
}

export default ValidarEntrada;
