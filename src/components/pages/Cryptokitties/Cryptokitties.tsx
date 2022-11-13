import React, { useEffect, useState } from 'react'
import Card from './Card'
import { FTL_API_MAP } from 'API/FTL_API'
import { CryptoKittie } from 'models/CryptoKittie'
import Pagination from './Pagination'
import { PaginationInfo } from 'models/PaginationInfo'
// import data from 'localData/crypto_kitties.json'
import './Cryptokitties.scss'
import { setGridSize, handleWindowSizeChange } from 'utils/setGridSize'
import { DeviceCategory } from 'models/global'

export const Cryptokitties = () => {
  //   const [kitties, setKitties] = useState<CryptoKittie[]>(data.cats)
  const [kitties, setKitties] = useState<CryptoKittie[]>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>()
  const [deviceCategory, setDeviceCategory] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    setDeviceCategory(setGridSize)
    if (deviceCategory === DeviceCategory.Desktop) {
      window.addEventListener('resize', () => {
        setDeviceCategory(handleWindowSizeChange)
      })
    }

    const fetchData = async () => {
      console.log('fired')
      const requestURL = `${FTL_API_MAP.cryptokitties}?page=${currentPage}&per_page=20`

      try {
        const res = await fetch(requestURL)
        const data = await res.json()
        console.log(data)
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
  }, [currentPage])

  //IMPORTANT IF NUMBER OF ITEMS DIV NUMBER OF ROWS !==0 LAST ROW WRONG DISPLAY

  if (errorMessage != undefined) {
    return <h1>{errorMessage}</h1>
  }
  if (!kitties || !paginationInfo) {
    return <h1>Loading</h1>
  }
  //   console.log(paginationInfo)
  console.log(currentPage)

  return (
    <div className="cryptoKitties">
      <div className={`cryptoKitties__grid ${deviceCategory}`}>
        {kitties?.map((kitty) => (
          <Card key={kitty.id} {...kitty}></Card>
        ))}
      </div>
      <div>
        <Pagination
          nPages={5}
          paginationInfo={paginationInfo}
          setCurrentPage={setCurrentPage}
        ></Pagination>
      </div>
    </div>
  )
}
