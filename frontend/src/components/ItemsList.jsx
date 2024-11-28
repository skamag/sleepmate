import React, { useEffect, useState } from "react"
import axios from "axios"
import styles from "./ItemsList.module.css"

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
    <section className={styles.itemList}>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li className={styles.listItem} key={item.id}>
            <div className={styles.imageContainer}>
              <img src={item.images[0]} alt={item.name} />
            </div>
            <div className={styles.textContainer}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>
                Price: {item.price} {item.currency}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ItemsList
