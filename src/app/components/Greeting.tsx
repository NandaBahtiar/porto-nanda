import React from 'react'
type GreetingProps ={
    name: string
}

const Greeting = ({name}: GreetingProps) => {
    return (
        <>
            <h1 className="text-4xl font-bold">
                Selamat Datang, {name}!
            </h1>
        </>
    )
}
export default Greeting
