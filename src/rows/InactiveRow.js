const InactiveRow = () => {
  return (
    <>
      {Array.from({length: 5}).map((_, index) => {
          return <div className="border-4 border-x-slate-300 rounded-sm bg-gray-100 p-3 shadow-orange-300 md:p-7 shadow-2xl outline-2 outline-white" key={index}></div>
      })}
    </>
)
};

export default InactiveRow;