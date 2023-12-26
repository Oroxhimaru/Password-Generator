import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characAllowed, setCharacAllowed] = useState(false);
  const [password, setPassword] = useState('');

  
  const passwordGenerator = useCallback(
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if (numberAllowed) str += '0123456789'
      if (characAllowed) str += '!@#$%^&*()_+~{}[]":,./'
      for (let i = 0; i <= length; i++) {
        let charc = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(charc);
      }
      setPassword(pass);

    },
    [length,numberAllowed,characAllowed,setPassword],
  );
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characAllowed, passwordGenerator])

  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

const passwordRef = useRef(null);

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
    <h1 className='my-3 text-center text-white'>Password Generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input  ref={passwordRef} type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly />
      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
     </div>
     <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
      <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={characAllowed}
              id="characterInput"
              onChange={() => {
                  setCharacAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
     </div>
    </div>
    </>
  )
}

export default App
