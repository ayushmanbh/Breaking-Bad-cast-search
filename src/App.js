import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
// import Pagination from './components/ui/Pagination'
import Pagination from 'react-js-pagination'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [itemsPerPage] = useState(8)

  const handlePageChange = (pageNumber) => setActivePage(pageNumber)

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://www.breakingbadapi.com/api/characters/?name=${query}`)

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])

  const indexOfLastItem = activePage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className='container'>
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={currentItems} />
      <div className='d-flex justify-content-center mt-3'>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={items.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  )
}

// <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />

export default App