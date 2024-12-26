import { useCallback, useEffect, useRef, useState } from "react"


function App() {
 
  const [length, setLength] = useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState("")

  const passwordRef = useRef(null)

  const passwordGenerator= useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="1234567890";
    if(charAllowed) str+="!@#$%^&*()_+=-{}[]:~`";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor((Math.random()*str.length)+1);
     pass += str.charAt(char);
            
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
   <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-6 my-8 text-orange-600 text-center bg-gray-700">
          <h1 className="text-white text-center font-bold text-2xl mt-3">Password Manager</h1>
          <h3 className="text-white text-center font-serif italic text-lg mb-4">Create Your Strongest Password Here.</h3>
        <div className="flex shadow rounded-lg overflow-hidden mb-3 ">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 "
          placeholder="Password"
          ref={passwordRef}
          readOnly />
          <button className="outline-none bg-blue-500 text-white items-center px-2 py-1 hover:bg-blue-700 active:bg-blue-900 active:{<span>copied</span>}"
          onClick={copyToClipboard}>
          <span class="material-symbols-outlined">content_copy</span>
          </button>
          
        </div>
        <div className="flex text-sm gap-x-2.5">
            <div className="felx items-center gap-x-3">
              <input 
              type="range"
              max={40}
              min={1}
              value={length} 
                className="cursor-pointer"
                onChange={(e)=>{setLength(e.target.value)}}
              />
              <label className="mx-1"> Length = {length} </label>

            </div>
            <div className="felx items-center gap-x-3">
              <input 
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
                className="cursor-pointer"
                onChange={()=>{
                  setNumberAllowed((prev)=>!prev)
                }}
              />
              <label className="mx-1" htmlFor="numberInput">Numbers</label>

            </div>
            <div className="felx items-center gap-x-2">
              <input 
              type="checkbox"
              id="charInput"
              defaultChecked={charAllowed}
                className="cursor-pointer"
                onChange={()=>{
                  setCharAllowed((prev)=>!prev)
                }}
              />
              <label className="mx-1" htmlFor="charInput">Characters</label>

            </div>
          </div>
      </div>
   </>
  )
}

export default App
