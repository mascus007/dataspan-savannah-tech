import { classAttr } from "@/utils/constants";
import { getFileContent } from "@/utils/helpers"
import { useEffect, useState } from "react"

export default function PolygonCanvas({photo}:{photo: any}){
    const [classId, setClassId] = useState<string>("")
    const [polygonPoints, setPolygonPoints] = useState<string>("")

   useEffect(() => {
    const fetchLabel = async () => {
      try {
       
        setClassId(`${photo?.classId}`);

       
        
          const viewBoxWidth = 1;
          const viewBoxHeight = 1;
          const absoluteCoordinates = photo?.coordinates?.map((coord: { x: number; y: number; }) => ({
            x: coord.x * viewBoxWidth,
            y: coord.y * viewBoxHeight,
          }));
        
          // Format coordinates for the points attribute
          const polygonPoints = absoluteCoordinates?.map((coord: { x: any; y: any; }) => `${coord.x} ${coord.y}`).join(' ');
          setPolygonPoints(polygonPoints)

          
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchLabel();
  }, [photo]);

  

    
    return(
        <svg
        width="100%"
        height="100%"
        viewBox={"0 0 1 1"}
        style={{ position: 'absolute', top: 0, left: 0}}
      >
        <polygon
          points={polygonPoints}
          fill={classAttr[classId]?.color}
          strokeOpacity={2}
        />
      </svg>

    )
}