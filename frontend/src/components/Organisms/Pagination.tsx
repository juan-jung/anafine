// Pagination.tsx 파일 내의 수정된 부분
interface PaginationProps {
  pageNum: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNum,
  totalPages,
  handlePageChange,
}) => {
  const isPrevButtonDisabled = pageNum <= 1;
  const isNextButtonDisabled = pageNum >= totalPages;

  const startPage = Math.max(pageNum - 2, 1);
  const endPage = Math.min(pageNum + 2, totalPages);

  return (
    <div className="pagination-container">
      <span
        className={`pagination-arrow ${isPrevButtonDisabled ? "disabled" : ""}`}
        onClick={() => handlePageChange(pageNum - 1)}
      >
        &lt;
      </span>
      <div>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page, index) => (
          <span
            key={index}
            className={`pagination-number ${
              startPage + index === pageNum ? "selected" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </span>
        ))}
      </div>
      <span
        className={`pagination-arrow ${isNextButtonDisabled ? "disabled" : ""}`}
        onClick={() => handlePageChange(pageNum + 1)}
      >
        &gt;
      </span>
    </div>
  );
};

export default Pagination;
