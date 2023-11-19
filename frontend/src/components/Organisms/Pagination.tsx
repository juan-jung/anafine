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
  const isPprevButtonDisabled = pageNum === 1;
  const isPrevButtonDisabled = pageNum - ((pageNum - 1) % 5) - 5 < 1;
  const isNextButtonDisabled = pageNum - ((pageNum - 1) % 5) + 5 > totalPages;
  const isNnextButtonDisabled = pageNum === totalPages;

  const startPage = pageNum - ((pageNum - 1) % 5);

  return (
    <div className="pagination-container">
      <span
        className={`pagination-arrow ${
          isPprevButtonDisabled ? "disabled" : ""
        }`}
        onClick={() => (!isPprevButtonDisabled ? onPageChange(1) : null)}
      >
        &lt;&lt;
      </span>
      <span
        className={`pagination-arrow ${isPrevButtonDisabled ? "disabled" : ""}`}
        onClick={() =>
          !isPrevButtonDisabled
            ? onPageChange(pageNum - ((pageNum - 1) % 5) - 5)
            : null
        }
      >
        &lt;
      </span>
      <div>
        {Array.from({ length: 5 }, (_, i) => startPage + i).map(
          (page, index) =>
            startPage + index <= totalPages && (
              <span
                key={index}
                className={`pagination-number ${
                  startPage + index === pageNum ? "selected" : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </span>
            )
        )}
      </div>
      <span
        className={`pagination-arrow ${isNextButtonDisabled ? "disabled" : ""}`}
        onClick={() =>
          !isNextButtonDisabled
            ? onPageChange(pageNum - ((pageNum - 1) % 5) + 5)
            : null
        }
      >
        &gt;
      </span>
      <span
        className={`pagination-arrow ${
          isNnextButtonDisabled ? "disabled" : ""
        }`}
        onClick={() =>
          !isNnextButtonDisabled ? onPageChange(totalPages) : null
        }
      >
        &gt;&gt;
      </span>
    </div>
  );
};

export default Pagination;
