import ModalDialog from "@/components/modals";
import Pagination, { getPageData } from "@/components/Pagination";
import { getFileContent } from "@/utils/helpers";
import { useState } from "react";
import PolygonCanvas from "./PolygonCanvas";
import { PAGE_SIZE } from "@/utils/constants";

export default function ImageCard({photos}:{photos: any[]}){
    const [showImage, setShowImage]= useState<boolean>(false)
    const [photoData, setPhotoData]= useState<any>({})
    const handleShow = (data: any) => {
        setPhotoData(data)
        setShowImage(true)
    }

    const totalItems = photos.length;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  
    const [currentPage, setCurrentPage] = useState(1);
    const currentData = getPageData(photos, currentPage, PAGE_SIZE);
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    return(
        <div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 gap-y-2">
                {currentData?.map((photo:any, idx:number) => (
                    <div key={idx} className="mb-1">
                        <div style={{ position: 'relative', width: '100%' }}  onClick={() => handleShow(photo)}>
                            <img 
                                className="w-full h-24 cursor-pointer" 
                                src={photo.thumbnail} alt={photo.thumbnail} 
                            />
                            <PolygonCanvas photo={photo} />
                        </div>
                        <div className="truncate" title={photo.name}>{photo.name}</div>
                    </div>
                ))}
            </div>
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                {showImage &&
                    <ModalDialog
                        width={'md:w-[500px] sm:!mt-40'}
                        title={photoData.name}
                        showModal={showImage}
                        body={<div>
                                <p className="mb-3">Details: </p>
                                <button className=" rounded-full  px-5 mb-4 bg-yellow-400">fracture_1</button>
                                <div style={{ position: 'relative', width: '100%' }}>
                                <img className="w-full h-full rounded-lg bg-white shadow-inner object-cover cursor-pointer"  src={photoData?.image} alt={photoData?.image} />
                                <PolygonCanvas photo={photoData} />
                                </div>
                            </div>}
                        setShowModal={setShowImage}
                    />
                }
            </div>
        </div>
    )
}