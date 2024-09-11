import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [charAllowed,setCharAllowed] = useState(false)
  const [numAllowed, setNumAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_=+[]{}?"
    for (let i = 0; i < length; i++) {
      let char = (Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },
    [length,numAllowed,charAllowed,setPassword])

  useEffect(()=>{passwordgenerator()},
  [length,numAllowed,charAllowed,passwordgenerator])

  const passwordRef = useRef(null)
  const copyToClipBoard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <><div className='relative w-screen bottom-44 left-80'>
      <h1 className=''>Password Generator</h1>
      <div className='bg-gray-700 w-full max-w-md rounded-lg text-orange-500 '>
        <div className='flex flex-wrap m-3 pt-4 '>
        <input type="text" className='bg-white rounded-l-lg w-full max-w-80 p-2' value={password} readOnly ref={passwordRef}
        placeholder='password'/>
        <button onClick={copyToClipBoard}
        className='outline-none bg-blue-700 text-white rounded-none shrink-0'>Copy</button>
        </div>
        <div className='flex flex-wrap pb-2 gap-2 '>
        <input type="range" className='ml-3 cursor-pointer' min={6} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}}
        />
        <div>Length({length})</div>
        <input 
        type="checkbox" defaultChecked={numAllowed}
        onChange={()=>{setNumAllowed((prev)=>!prev)}}
        />Numbers
        <input type="checkbox" defaultChecked={charAllowed}
        onChange={()=>setCharAllowed((prev)=>!prev)}
        /> Characters
        </div>
      </div>
    </div>
    </>
  )
}

export default App
