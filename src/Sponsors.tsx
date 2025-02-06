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
                    <div className="w-[300px] overflow-hidden">
                        <img src="/Rootly.png" alt="Rootly" className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>  
            <h1 className="text-center text-xl font-bold">Coming soon...</h1>
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
                    <div className="w-[100px] overflow-hidden">
                        <img src="/Rootly.png" alt="Rootly" className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>  
            <h2 className="text-center text-xl font-bold">Coming soon...</h2>
        </div>
    )
}   

export default Sponsors;