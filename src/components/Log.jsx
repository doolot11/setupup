import { useState } from "react"

export const Log = ()=>{

const [text, setText] = useState(true)

const clickHandler=()=>{
    setText((prevState)=> !prevState)
}

    return <div>
        {text && <h1>Log</h1>}
        <button onClick={clickHandler}>click</button>
    </div> 
}