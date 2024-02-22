
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({ currentPage, totalPages, onPageChange }:PaginationProps){
  const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
  
    return (
      <nav className="flex items-center justify-center mt-4 ">
       
          {currentPage > 1 && (
            <i className="bi bi-chevron-left mr-2 px-3 py-1 cursor-pointer text-xl text-[#D1D1D6]" onClick={() => onPageChange(currentPage - 1)}>
            </i>
          )}
          <div className="bg-gray-100 rounded-xl">
          {range(1, totalPages).map((page) => (
            <button
              key={page}
              className={`mx-0 w-[29px] h-[29px]  rounded-full ${page === currentPage ? 'bg-[#FFD75C] text-white' : 'hover:bg-gray-200'}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
           </div>
    
          {currentPage < totalPages && (
          <i className="bi bi-chevron-right mr-2 px-3 py-1 cursor-pointer text-xl text-[#D1D1D6]" onClick={() => onPageChange(currentPage + 1)}>
          </i>
          )}
       
      </nav>
    );
  };
  

  export const getPageData = (array: string[], currentPage: number, itemsPerPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };