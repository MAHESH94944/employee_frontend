// SummaryCard.jsx
const SummaryCard = ({ icon, text, number, color, trend }) => {
    const trendIcons = {
        up: (
            <div className="flex items-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium">5%</span>
            </div>
        ),
        down: (
            <div className="flex items-center text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium">2%</span>
            </div>
        ),
        stable: (
            <div className="flex items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium">0%</span>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100">
            <div className={`bg-gradient-to-r ${color} p-5 flex items-center justify-between`}>
                <div className="p-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm">
                    {icon}
                </div>
                {trend && trendIcons[trend]}
            </div>
            <div className="p-5">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{text}</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{number}</p>
                <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${color.split(' ')[0].replace('from-', 'bg-')} rounded-full`}
                        style={{ width: `${Math.min(100, Math.max(10, Math.random() * 100))}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard