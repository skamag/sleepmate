import { useEffect, useState } from "react"
import API from "../utils/api"
import axios from "axios"
import { Link } from "react-router-dom"
import "./ProductsGrid.css"

function ProductsGrid({ startIndex, setSelectedProduct }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get("/items")
        setData(response.data)
        // console.log(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching items:", error)
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const handleSelectProduct = (e) => {
    setSelectedProduct(e)
  }

  return (
    <>
      <div className="productsGridContainer">
        <div className="cardsContainer">
          {/* {[
    "/bærbar-hvitsøyemaskin.webp",
    "/aromaterapi-diffuser.webp",
    "/søvndagslyslampe-1.webp",
    "/søvnsensor.webp",
  ].map((src, index) => ( */}
          {data
            .filter((item) => item.isFeatured)
            .slice(startIndex, startIndex + 4)
            .map((item, index) => (
              <Link className="link" to={"/produktside"} key={index}>
                <article
                  className="card"
                  onClick={() => handleSelectProduct(item._id)}
                >
                  <figure className="imageContainer">
                    <img
                      src={item.images[0]}
                      alt={`Lignende produkt ${index + 1}`}
                      aria-label={`Gå til lignende produkt ${index + 1}`}
                    />
                  </figure>
                  <div className="textContainer">
                    <p>{item.name}</p>
                    <p>
                      <strong>{item.price} kr</strong>
                    </p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </div>
    </>
  )
}

export default ProductsGrid
