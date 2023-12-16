import { useState, useEffect, useCallback } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");

  const currencyInfo = useCurrencyInfo(fromCurrency);
  const options = Object.keys(currencyInfo);

  const convert = useCallback(
    (amount) => {
      setConvertedAmount(amount * currencyInfo[toCurrency]);
    },
    [currencyInfo, toCurrency]
  );

  const swap = () => {
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    convert(amount);
  }, [fromCurrency, toCurrency, amount, convert]);

  return (
    <>
      <div
        className="bg-slate-800 w-screen h-screen"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="bg-white/30 p-10 rounded-xl backdrop-blur border-[3px] border-white/40">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col justify-center items-center gap-3"
            >
              <InputBox
                // label={"from"}
                amount={amount}
                selectCurrency={fromCurrency}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFromCurrency(currency)}
                onAmountChange={(amount) => setAmount(amount)}
              />
              <button
                type="button"
                className="rounded-lg px-3 hover:bg-blue-700 py-1 bg-blue-600 text-white -mb-5 -mt-5 z-10"
                onClick={swap}
              >
                swap
              </button>
              <InputBox
                // label={"to"}
                amount={convertedAmount}
                selectCurrency={toCurrency}
                currencyOptions={options}
                onCurrencyChange={(currency) => setToCurrency(currency)}
              />
              {/* <button
                className="rounded-lg px-3 hover:bg-blue-700 py-1 bg-blue-600 text-lg font-semibold text-white "
                type="submit"
                onClick={() => convert(amount)}
              >
                {`Convert from ${fromCurrency} to ${toCurrency}`}
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
