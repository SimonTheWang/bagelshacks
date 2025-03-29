import { cn } from '../lib/utils'

const Sponsors = ({className}: {className: string}) => {
    return (
        window.innerWidth >= 768 ?
        <div className={cn(className, "flex flex-col")}>
            <h1 className="text-center text-2xl font-bold"> Exec Sponsors</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 justify-center">
                    <img src="/Cohere.png" alt="Cohere" className="w-[500px]" />
                    <img src="/neo4j.png" alt="neo4j" className="w-[350px] m-auto p-auto" />
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <img src="/Panache.png" alt="Panache" className="w-[500px]" />
                    <img src="/Rootly.png" alt="Rootly" className="w-[350px] m-auto p-auto" />
                </div>

            </div>  
            <h1 className="text-center text-xl font-bold">In collaboration with</h1>
            <div className="flex flex-row gap-4">
                <div className="w-1/2 overflow-hidden flex justify-center items-center">
                    <img src="/northstart.png" alt="nortstart" className="m-5 p-4 w-[1000px]" />
                </div>
                <div className="w-1/2 overflow-hidden flex justify-center items-center">
                    <img src="/elantech.png" alt="nortstart" className="m-5 p-4 w-[700px]" />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-4">
                <div className="w-1/2 overflow-hidden flex justify-center items-center">
                    <img src="/trails.png" alt="nortstart" className="w-[200px]" />
                </div>
                <div className="w-1/2 overflow-hidden flex justify-center items-center">
                    <img src="/ensemble.png" alt="nortstart" className="w-[300px]" />
                </div>
            </div>
        </div>
        :
        <div className={cn(className)}>
            <h2 className="text-center text-lg font-bold"> Exec Sponsors</h2>
            <div className="flex flex-col">
                <div className="flex flex-row gap-4 justify-center items-center">
                    <img src="/Cohere.png" alt="Cohere" className="w-[280px]" />
                </div>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <img src="/neo4j.png" alt="neo4j" className="w-[150px]" />
                </div>
                <div className="h-[40px]"></div>
                <div className="flex flex-row gap-4 justify-center items-center mt-8">
                    <img src="/Rootly.png" alt="Rootly" className="w-[220px]" />
                </div>
                <div className="h-[10px]"></div>
                <div className="flex flex-row gap-4 justify-center items-center mt-8">
                    <img src="/Panache.png" alt="Panache" className="w-[250px]" />
                </div>
            </div>  
            <div className="h-[30px]">

            </div>
            <h2 className="text-center text-xl font-bold mt-32">In colaboration with</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 justify-center items-center">
                    <img src="/northstart.png" alt="nortstart" className="m-5 p-4 w-[1100px]" />
                </div>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <img src="/elantech.png" alt="nortstart" className="m-5 p-4 w-[700px]" />
                </div>
                <div className="h-[10px]"></div>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <img src="/trails.png" alt="nortstart" className="w-[100px]" />
                </div>
                <div className="h-[10px]"> </div>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <img src="/ensemble.png" alt="nortstart" className="w-[200px]" />
                </div>
            </div>
        </div>
    )
}   

export default Sponsors;