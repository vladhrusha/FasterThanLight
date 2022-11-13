import React from 'react'
import './Pagination.scss'
import { PaginationInfo } from 'models/PaginationInfo'

interface PaginationProps {
  nPages: number
  paginationInfo: PaginationInfo
  setCurrentPage: (pgNumber: number) => void
}

const Pagination = ({
  nPages,
  paginationInfo,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = []

  for (
    let i = paginationInfo.current_page - 2;
    i <= paginationInfo.current_page + 2;
    i++
  ) {
    if (i > 0 || paginationInfo.next_page != null) {
      pageNumbers.push(i)
    }
  }
  const previousPage = () => {
    if (paginationInfo.prev_page != null) {
      setCurrentPage(paginationInfo.prev_page)
    }
  }
  const nextPage = () => {
    if (paginationInfo.next_page != null) {
      setCurrentPage(paginationInfo.next_page)
    }
  }

  return (
    <nav>
      <ul className="pageList">
        <li>
          <span onClick={previousPage} className="pageLink">
            Previous
          </span>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <span onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</span>
          </li>
        ))}
        <li>
          <span onClick={nextPage} className="pageLink">
            Next
          </span>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
