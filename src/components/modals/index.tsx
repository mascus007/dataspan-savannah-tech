import { ReactNode } from "react";


interface IModal{
    showModal: boolean;
    setShowModal: (showModal : boolean) => void;
    title: ReactNode;
    body: ReactNode;
    width: string;
}
const ModalDialog = ({showModal, setShowModal, title, body, width}:IModal) => {
    return(
        <>
        {showModal && 
        <>
          <div
            className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none "
          >
            <div className={`relative w-auto my-6 mx-auto max-w-3xl ${width}`}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
               
                  <button
                    className="right-0 absolute p-2 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-2xl block outline-none focus:outline-none">
                    <i className="bi bi-x text-gray-300"/>
                    </span>
                  </button>
                    <div className="mt-5 px-6">
                   {title}
                  </div>
                <div className=" p-6 flex-auto">
                    {body}
                  
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-[#697ba2]"></div>
          </>
        }
         
        </>
       
    )
}

export default ModalDialog