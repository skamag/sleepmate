import React, { useEffect, useState } from "react"
import axios from "axios"

const ItemsList = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items")
        setItems(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching items:", error)
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>
              Price: {item.price} {item.currency}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemsList
