import { getFileContent } from "@/utils/helpers"
import { useEffect, useState } from "react"

export default function PolygonCanvas({labelUrl}:{labelUrl: string}){
    const [classId, setClassId] = useState<string>("")
    const [polygonPoints, setPolygonPoints] = useState<string>("")

   useEffect(() => {
    const fetchLabel = async () => {
      try {
        const response = await fetch(labelUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch label: ${response.statusText}`);
        }

        const labelData = await response.text();
        const labelList = labelData?.split(" ")
        const classId = labelList?.[0]
        setClassId(`${classId}`);

        const coordsList = labelList.slice(1);

        const coordinates = [];

        for (let i = 0; i < coordsList.length; i += 2) {
        const x = parseFloat(coordsList[i]);
        const y = parseFloat(coordsList[i + 1]);

        coordinates.push({ x, y });
        }
        
          const viewBoxWidth = 1;
          const viewBoxHeight = 1;
          const absoluteCoordinates = coordinates.map(coord => ({
            x: coord.x * viewBoxWidth,
            y: coord.y * viewBoxHeight,
          }));
        
          // Format coordinates for the points attribute
          const polygonPoints = absoluteCoordinates.map(coord => `${coord.x} ${coord.y}`).join(' ');
          setPolygonPoints(polygonPoints)

          
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchLabel();
  }, [labelUrl]);

  const classAttr = {
    0: {
        name: "Elbow positive",
        color: "#3D9BE9",
        classId: 0
    },
    1: {
        name: "Finger positive",
        color: "#BADA55",
        classId: 1
    },
    2:{
        name: "Humerus",
        color: "#2CE1CB",
        classId: 2
    }, 
    3:{
        name: "Forearm fracture",
        color: "#FFD75C",
        classId: 3
    }, 
    4: {
        name: "Humerus fracture",
        color: "#F25858",
        classId: 4
    }, 
    5:{
        name: "Shoulder fracture",
        color: "#F25858",
        classId: 5
    }, 
    6:{
        name: "Wrist positive",
        color: "#D783FF",
        classId: 6
    }
} as any

    
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