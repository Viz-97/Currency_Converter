import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleConvert() {
    if (fromCur === toCur) {
      setConverted(amount);
      return;
    }

    setIsLoading(true);
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
    );
    const data = await res.json();
    setConverted(data.rates[toCur]);
    setIsLoading(false);
  }

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <button onClick={handleConvert} disabled={isLoading}>
        {isLoading ? "Converting..." : "Submit"}
      </button>
      <p>
        {converted} {toCur}
      </p>
    </div>
  );
}
