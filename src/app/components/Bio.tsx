import React from 'react'
type BioProps ={
    description: string
}
const Bio = ({description}: BioProps) => {
    return (
        <div>
            <p className="mt-4 text-lg">
                {description}
            </p>
        </div>
    )
}
export default Bio
