import ModalDialog from "@/components/modals";
import Pagination, { getPageData } from "@/components/pagination";
import { useState } from "react";

export default function Test({photos}:{photos: any[]}){

    const [showImage, setShowImage]= useState<boolean>(false)
    const [photoData, setPhotoData]= useState<any>({})
    const handleShow = (data: any) => {
        setPhotoData(data)
        setShowImage(true)
    }

    const PAGE_SIZE = 50;

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
            <div className="grid grid-cols-10 gap-3 gap-y-2">
                {currentData?.map((photo:any, idx:number) => (
                    <div key={idx} >
                        <img 
                            className="w-24 h-24 rounded-lg bg-white shadow-inner  object-cover cursor-pointer" 
                            onClick={() => handleShow(photo)} src={photo.image} alt={photo.image} 
                        />
                        <small className="truncate">{photo.name}</small>
                    </div>
                ))}
            </div>
            <div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {showImage &&
                <ModalDialog
                    width={'md:w-[500px] sm:!mt-40'}
                    title={'Register for the '}
                    showModal={showImage}
                    body={<div>
                            <p className="mb-5">Details: </p>
                            <img className="w-full h-full rounded-lg bg-white shadow-inner object-cover cursor-pointer"  src={photoData?.image} alt={photoData?.image} />
                        </div>}
                    setShowModal={setShowImage}
                />
            }
            </div>
        </div>
    )
}