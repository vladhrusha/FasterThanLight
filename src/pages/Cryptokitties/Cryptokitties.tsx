import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import { FTL_API_MAP } from 'API/FTL_API'
import { CryptoKittie } from 'models/CryptoKittie'
import FilterPanel from './components/FilterPanel'
import Pagination from './components/Pagination'
import { LoadingSpinner } from 'components/LoadingSpinner'
import { PaginationInfo } from 'models/PaginationInfo'
import './Cryptokitties.scss'
import { setGridSize, handleWindowSizeChange } from 'utils/setGridSize'
import { DeviceCategory } from 'models/global'

export const Cryptokitties = () => {
  const [kitties, setKitties] = useState<CryptoKittie[]>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>()
  const [deviceCategory, setDeviceCategory] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [requestURL, setRequestURL] = useState<string>(
    `${FTL_API_MAP.cryptokitties}?page=${currentPage}&per_page=20`,
  )
  const [sortAsc, setSortAsc] = useState<boolean>(true)

  useEffect(() => {
    setDeviceCategory(setGridSize)
    if (deviceCategory === DeviceCategory.Desktop) {
      window.addEventListener('resize', () => {
        setDeviceCategory(handleWindowSizeChange)
      })
    }

    const fetchData = async () => {
      try {
        const res = await fetch(requestURL)
        const data = await res.json()
        if (!res.ok || !data) {
          throw res.status
        }
        setKitties(data.cats)
        setPaginationInfo(data.pagination_info)
      } catch (err) {
        switch (err) {
          case 404:
            setErrorMessage('Resource not found')
            break
          case 429:
            setErrorMessage('Server Overloaded')
            break
          default:
            setErrorMessage('Error')
        }
      }
    }

    fetchData()
  }, [currentPage, requestURL, sortAsc])

  if (errorMessage != undefined) {
    return (
      <div className="cryptoKitties">
        <h1>{errorMessage}</h1>
      </div>
    )
  }
  if (!kitties || !paginationInfo) {
    return (
      <div className="cryptoKitties">
        <LoadingSpinner></LoadingSpinner>
      </div>
    )
  }
  return (
    <div className="cryptoKitties">
      <FilterPanel
        setRequestURL={setRequestURL}
        currentPage={currentPage}
        setSortAsc={setSortAsc}
        sortAsc={sortAsc}
      ></FilterPanel>
      <div className={`cryptoKitties__grid ${deviceCategory}`}>
        {kitties?.map((kitty) => (
          <Card key={kitty.id} {...kitty}></Card>
        ))}
      </div>
      <div>
        <Pagination
          paginationInfo={paginationInfo}
          setCurrentPage={setCurrentPage}
          setRequestURL={setRequestURL}
          requestURL={requestURL}
        ></Pagination>
      </div>
    </div>
  )
}
