// Pagination.tsx 파일 내의 수정된 부분
interface PaginationProps {
  pageNum: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNum,
  totalPages,
  onPageChange,
}) => {
  const isPprevButtonDisabled = pageNum <= 3;
  const isPrevButtonDisabled = pageNum <= 1;
  const isNextButtonDisabled = pageNum >= totalPages;
  const isNnextButtonDisabled = pageNum >= totalPages - 2;

  const startPage = Math.max(pageNum - 2, 1);
  const endPage = Math.min(pageNum + 2, totalPages);

  return (
    <div className="pagination-container">
      <span
        className={`pagination-arrow ${
          isPprevButtonDisabled ? "disabled" : ""
        }`}
        onClick={() => onPageChange(1)}
      >
        &lt;&lt;
      </span>
      <span
        className={`pagination-arrow ${isPrevButtonDisabled ? "disabled" : ""}`}
        onClick={() => onPageChange(pageNum - 1)}
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
            onClick={() => onPageChange(page)}
          >
            {page}
          </span>
        ))}
      </div>
      <span
        className={`pagination-arrow ${isNextButtonDisabled ? "disabled" : ""}`}
        onClick={() => onPageChange(pageNum + 1)}
      >
        &gt;
      </span>
      <span
        className={`pagination-arrow ${
          isNnextButtonDisabled ? "disabled" : ""
        }`}
        onClick={() => onPageChange(totalPages)}
      >
        &gt;&gt;
      </span>
    </div>
  );
};

export default Pagination;
