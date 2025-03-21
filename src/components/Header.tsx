export const Header = () => {
    return (
        <div className="flex justify-between border w-full h-32 max-w-md">
            <div className="border flex">
                <div className="border">pic</div>
                <div className="border">username</div>
                <div className="border">edit</div>
            </div>
            <div className="border">logout</div>
        </div>
    )
}