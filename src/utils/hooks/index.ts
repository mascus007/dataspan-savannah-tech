import { useEffect, useState } from "react";

export default function useSearchData(data:any[]){
    const [responseData, setData] = useState<any[]>([])
    useEffect(() =>{
        setData(data)
    },[data])

    function handleSearchData(data: any[], searchText:any[]){
        const finalData = searchText.length > 0 ? 
        data.filter(item => searchText.includes(item["polygCount"]) || searchText.includes(item["className"])) : data;
        setData(finalData)
    }
    return {handleSearchData, responseData}
}

export function areAllNone(array: string[]) {
    return array.every(item => item === "none");
  }