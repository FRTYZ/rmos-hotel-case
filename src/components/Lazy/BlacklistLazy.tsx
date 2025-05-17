
function BlacklistLazy() {
    const TableData = () => {
        return (
            Array.from({ length: 8 }).map((_, index) => (
                <th 
                    key={index}
                    className="p-2 whitespace-nowrap"
                >
                    <div className='w-full h-5 bg-gray-600 animate-pulse'></div>
                </th>
            ))
        )
    }

    return (
        <div className="w-full mx-auto bg-white rounded-sm">
            <header className="flex px-3 py-4 justify-end border-b border-gray-100">
                <div className='w-[30%] h-10 bg-gray-600 animate-pulse'></div>
            </header>
            <hr />
            <header className="flex px-1 py-4 justify-start border-b border-gray-100">
                <div className='w-[8%] h-9 bg-gray-600 animate-pulse'></div>
            </header>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            {TableData()}
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <tr key={index}>
                                {TableData()}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BlacklistLazy