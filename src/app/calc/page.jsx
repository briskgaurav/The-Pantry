'use client'
import React, { useState } from 'react'

export default function page() {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "*", "/"]
    const [answer, setAnswer] = useState("");
    const [input, setInput] = useState("")
    // Basic arithmetic operations
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => b !== 0 ? a / b : "Cannot divide by zero";
    const calculate = () => {

        if (input.includes("+")) {
            const [a, b] = input.split("+");
            setAnswer(add(Number(a), Number(b)));
        }
        else if (input.includes("-")) {
            const [a, b] = input.split("-");
            setAnswer(subtract(Number(a), Number(b)));
        }
        else if (input.includes("*")) {
            const [a, b] = input.split("*");
            setAnswer(multiply(Number(a), Number(b)));
        }
        else if (input.includes("/")) {
            const [a, b] = input.split("/");
            setAnswer(divide(Number(a), Number(b)));
        }
        else {
            setAnswer(input);

        }
        setInput("");
    }

    const clear = () => {
        setAnswer("")
        setInput('')
    }
    return (
        <div className='h-screen w-full flex items-center justify-center bg-white relative'>
            <div className='h-fit min-h-[50vh] p-4 w-[20vw] rounded-xl bg-zinc-900 relative  '>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className='w-full border rounded-md border-white h-full bg-transparent text-white p-2' />
                <div className='px-4 py-2  h-8 min-w-[5vw] text-black bg-white rounded-md mt-4 w-fit'>{answer}</div>
                <div className='grid grid-cols-3 p-2 gap-2 absolute bottom-0 left-0 right-0'>
                    {keys.map((key, index) => (
                        <button key={index} onClick={() => setInput(input + key)} className='w-full h-full cursor-pointer bg-white text-black p-2'>{key}</button>
                    ))}
                    <button onClick={calculate} className='w-full h-full cursor-pointer bg-white text-black p-2'>=</button>
                    <button onClick={clear} className='w-full mx-auto h-full cursor-pointer bg-white text-black p-2'>CLEAR</button>
                </div>


            </div>
        </div>
    )
}
