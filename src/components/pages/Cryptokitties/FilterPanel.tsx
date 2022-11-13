import { FTL_API_MAP } from 'API/FTL_API'
import React, { useEffect, useState } from 'react'
import './FilterPanel.scss'

interface PaginationProps {
  setRequestURL: (requestURL: string) => void
  setSortAsc: (sortAsc: boolean) => void
  sortAsc: boolean
  currentPage: number
}

type SortCategory = 'none' | 'name' | 'category' | 'price'
const FilterPanel = ({
  setRequestURL,
  currentPage,
  sortAsc,
  setSortAsc,
}: PaginationProps) => {
  const [selectedSortCategory, setSelectedSortCategory] =
    useState<SortCategory>('none')

  useEffect(() => {
    switch (selectedSortCategory) {
      case 'name':
        sortByName()
        break
      case 'category':
        sortByCategory()
        break
      case 'price':
        sortByPrice()
        break
    }
  }, [sortAsc])

  const sortByName = () => {
    setRequestURL(
      `${
        FTL_API_MAP.cryptokitties
      }?page=${currentPage}&per_page=20&sort_by=name&sort_dir=${
        sortAsc === true ? 'asc' : 'desc'
      }`,
    )
    setSelectedSortCategory('name')
  }
  const sortByCategory = () => {
    setRequestURL(
      `${
        FTL_API_MAP.cryptokitties
      }?page=${currentPage}&per_page=20&sort_by=category&sort_dir=${
        sortAsc === true ? 'asc' : 'desc'
      }`,
    )
    setSelectedSortCategory('category')
  }
  const sortByPrice = () => {
    setRequestURL(
      `${
        FTL_API_MAP.cryptokitties
      }?page=${currentPage}&per_page=20&sort_by=price&sort_dir=${
        sortAsc === true ? 'asc' : 'desc'
      }`,
    )
    setSelectedSortCategory('price')
  }
  const setSortType = () => {
    setSortAsc(!sortAsc)
  }
  return (
    <div className="filterPanel">
      <button className="filterPanel__button" onClick={sortByName}>
        Name
      </button>
      <button className="filterPanel__button" onClick={sortByCategory}>
        Category
      </button>
      <button className="filterPanel__button" onClick={sortByPrice}>
        Price
      </button>
      <button className="filterPanel__button" onClick={setSortType}>
        {sortAsc === true ? 'Asc' : 'Desc'}
      </button>
    </div>
  )
}

export default FilterPanel
