import { useState } from 'react'
import { InputBox } from './components'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
function App() {
  
  const [amount,setAmount] = useState(0)
  const[from,setFrom] = useState("usd")
  const[to,setTo] = useState("inr")
  const [convertedAmount, setConvertAmount]=useState(0)

  // custom hook
  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertAmount(amount * currencyInfo[to])
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-center bg-gradient-to-br from-black to-slate-700 bg-no-repeat"
        // style={{
        //   backgroundImage:"url('https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg')"
        // }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-100 rounded-lg p-5 backdrop-blur-xl bg-white/40">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions = {options}
                            onCurrencyChange = {(currency) => setFrom(currency)}
                            selectCurrency = {from}
                            onAmountChange = {(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 hover:border-white
                             border-blue-800 rounded-md bg-gradient-to-b from-white to-slate-900 text-slate-100 px-2 py-0.5"
                            onClick={swap}
                        >
                            SWAP
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-br from-blue-200 to-purple-800 text-white hover:border-white border-blue-500 border-2 px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
