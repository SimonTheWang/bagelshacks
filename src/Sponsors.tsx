import { cn } from './lib/utils'

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
                    <div className="overflow-hidden flex justify-center items-center w-[400px] h-[400px]">
                        <img src="/Rootly.png" alt="Rootly" className="m-5 p-4" />
                    </div>
                </div>
            </div>  
            <h1 className="text-center text-xl font-bold">In colaboration with</h1>
            <div className="flex flex-row gap-4">
                <div className="w-1/2 overflow-hidden">
                    <img src="/northstart.png" alt="nortstart" className="m-5 p-4" />
                </div>
                <div className="w-1/2 overflow-hidden">
                    <img src="/elantech.png" alt="nortstart" className="m-5 p-4" />
                </div>
            </div>
        </div>
        :
        <div className={cn(className)}>
            <h2 className="text-center text-lg font-bold"> Exec Sponsors</h2>
            <div className="flex flex-col">
                <div className="flex flex-row justify-center">
                    <div className="flex flex-wrap justify-center">
                        <img src="/Cohere.png" alt="Cohere" className="w-[300px]" />
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <img src="/neo4j.png" alt="neo4j" className="w-[150px] m-auto p-auto" />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center h-[0px]">

                </div>

                <div className="flex flex-wrap gap-8 justify-center mt-12">
                    <div className="h-[50px] w-[150px] pt-5 overflow-hidden py-4 flex justify-center items-center">
                        <img src="/Rootly.png" alt="Rootly" className="mt-10" />
                    </div>
                </div>
            </div>  
            <h2 className="text-center text-xl font-bold mt-16">In colaboration with</h2>
            <div className="flex flex-col gap-8">
                <div className="overflow-hidden">
                    <img src="/northstart.png" alt="nortstart" className="m-5 p-4" />
                </div>
                <div className="overflow-hidden">
                    <img src="/elantech.png" alt="nortstart" className="m-5 p-4" />
                </div>
            </div>
        </div>
    )
}   

export default Sponsors;