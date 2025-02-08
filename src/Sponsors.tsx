import { cn } from './lib/utils'

const Sponsors = ({className}: {className: string}) => {
    return (
        window.innerWidth >= 768 ?
        <div className={cn(className, "flex flex-col")}>
            <h1 className="text-center text-2xl font-bold"> Everything Sponsor</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 justify-center">
                    <img src="/Cohere.png" alt="Cohere" className="w-[500px]" />
                </div>
            <h1 className="text-center text-xl font-bold">Sesame Sponsor</h1>
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="overflow-hidden flex justify-center items-center w-[300px] h-[200px]">
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
        <div className={cn(className, "flex flex-col")}>
            <h2 className="text-center text-2xl font-bold"> Everything Sponsor</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 justify-center">
                    <img src="/Cohere.png" alt="Cohere" className="w-[200px]" />
                </div>
            <h2 className="text-center text-xl font-bold">Sesame Sponsor</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="h-[50px] w-[150px] overflow-hidden py-4 flex justify-center items-center">
                        <img src="/Rootly.png" alt="Rootly" className="mt-4" />
                    </div>
                </div>
            </div>  
            <h2 className="text-center text-xl font-bold">In colaboration with</h2>
            <div className="flex flex-row gap-4">
                <div className="w-1/2 overflow-hidden">
                    <img src="/northstart.png" alt="nortstart" className="m-5 p-4" />
                </div>
                <div className="w-1/2 overflow-hidden">
                    <img src="/elantech.png" alt="nortstart" className="m-5 p-4" />
                </div>
            </div>
        </div>
    )
}   

export default Sponsors;