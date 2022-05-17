import { useReducer } from "react"

const PLUS  = 'PLUS'
// const MINUS = 'MINUS'

const reducerCount = (prevState,action)=>{
    if(action.type === PLUS){
        return prevState +1
    }
}

export const Counter = () =>{

    const [counter, dispatchCount] = useReducer(reducerCount,0)

    const PlusHandler = ()=>{
        dispatchCount({
            type: PLUS
        })
    }
    return(
        <div>
            <h1>{counter}</h1>
            <button onClick={PlusHandler}>+</button>
            <button>-</button>
        </div>
    )
}