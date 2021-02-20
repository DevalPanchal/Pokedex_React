import React from 'react'

export default function Page({ goToNextPage, goToPreviousPage}) {
    return (
        <div>
            { goToPreviousPage && <button onClick={goToPreviousPage}>Previous</button> }
            { goToNextPage && <button onClick={goToNextPage}>Next</button> }
        </div>
    )
}
