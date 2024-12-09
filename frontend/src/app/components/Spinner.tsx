const Spinner = () => (
    <div className="flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></div>
    </div>
)

export default Spinner
