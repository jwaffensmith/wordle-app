const ActiveRow = ( { guess, showAlert } ) => {

    return (
        <>
            {Array.from({length: 5}).map((_, index) => {
                return <div className={`border-4 border-x-slate-300 rounded-sm md:p-7 bg-gray-100 p-3 shadow-orange-300 shadow-2xl outline-1 outline-white ${showAlert === true ? "animate-shake" : ''}`} key={index}>{guess[index]}</div> 
            })}
        </>
    )
};

export default ActiveRow;