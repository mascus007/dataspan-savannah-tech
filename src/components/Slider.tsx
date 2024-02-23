
interface ISlider {
    rangeMin:number;
    setSelectedMinRange: (range:number) => void
    rangeMax:number;
    setSelectedMaxRange: (range:number) => void
}
export default function Slider({rangeMin, rangeMax, setSelectedMinRange, setSelectedMaxRange}:ISlider){
    
   
    const maxValue = parseInt(`${rangeMax}`) + 2; 
    
    return(
        <div className="grid w-full">
            
            <div className="flex justify-between mb-5 mt-3 px-3">
                    <div>min <span className="font-[600]">{rangeMin}</span> </div>
                    <div>max  <span className="font-[600]">{maxValue}</span></div>
            </div>
            <div className="flex-1 relative ">
                <div className=" grid grid-cols-2 gap-1">
                    <div className="">
                        <div className="flex  gap-2 ">
                            <div className={`w-1/2 h-1 ${rangeMin > 0 ? `border border-[#FFD75C]`: "bg-[#FFD75C]"} left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-xl`}/>
                            <div className="w-1/2 h-1 bg-[#FFD75C] left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-xl"/>
                        </div>
                        <input type="range" min="0" max="2" defaultValue={rangeMin}
                            className={`absolute w-[50%]s h-full opacity-0s cursor-pointer bg-transparent -mt-3 `}  
                            onChange={(e: any) => setSelectedMinRange(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="flex  gap-2 ">
                            <div className="w-1/2 h-1 bg-[#FFD75C] left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-xl"/>
                            <div className={`w-1/2 h-1 ${rangeMax < 2 ? `border border-[#FFD75C]`: "bg-[#FFD75C]"} left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-xl`}/>
                        </div>
                        <input type="range" min="0" max="2" defaultValue={rangeMax}
                            className={`absolute w-[50%]s h-full opacity-0s cursor-pointer bg-transparent -mt-3`}  
                            onChange={(e: any) => setSelectedMaxRange(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}