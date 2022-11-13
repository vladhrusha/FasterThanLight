import React from 'react'
import './Pagination.scss'
import { PaginationInfo } from 'models/PaginationInfo'

interface PaginationProps {
  paginationInfo: PaginationInfo
  setCurrentPage: (pgNumber: number) => void
  requestURL: string
  setRequestURL: (url: string) => void
}

const Pagination = ({
  paginationInfo,
  setCurrentPage,
  requestURL,
  setRequestURL,
}: PaginationProps) => {
  const pageNumbers = []
  for (
    let i = paginationInfo.current_page - 2;
    i <= paginationInfo.current_page + 2;
    i++
  ) {
    if (i > 0 && i <= paginationInfo.total_pages) {
      pageNumbers.push(i)
    }
  }
  const previousPage = () => {
    if (paginationInfo.prev_page != null) {
      setCurrentPage(paginationInfo.prev_page)
      setRequestURL(
        requestURL.replace(
          /page=.*&per_page/,
          'page=' + paginationInfo.prev_page.toString() + '&per_page',
        ),
      )
    }
  }
  const nextPage = () => {
    if (paginationInfo.next_page != null) {
      setCurrentPage(paginationInfo.next_page)
      setRequestURL(
        requestURL.replace(
          /page=.*&per_page/,
          'page=' + paginationInfo.next_page.toString() + '&per_page',
        ),
      )
    }
  }
  const setPage = (pgNumber: number) => {
    if (pgNumber != null) {
      setCurrentPage(pgNumber)
      setRequestURL(
        requestURL.replace(
          /page=.*&per_page/,
          'page=' + pgNumber.toString() + '&per_page',
        ),
      )
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
            <span onClick={() => setPage(pgNumber)}>{pgNumber}</span>
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
