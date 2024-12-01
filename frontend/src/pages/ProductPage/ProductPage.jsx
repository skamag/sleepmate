import { useEffect, useState } from "react"
// import data from "../../data/products.json"
import axios from "axios"
import "./ProductPage.css"

function ProductPage({ selectedProduct, setSelectedProduct }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedItemIndex, setSelectedItemIndex] = useState(selectedProduct)
  const listImages = data[selectedItemIndex]?.images || []
  // const listImages = ["/luftrenser-2.webp", "/luftrenser-1.webp"]

  // "States" for hvorvidt det finnes ulike bilder, størrelser og farger
  // const [isImages, setIsImages] = useState(true)
  const [isSizes, setIsSizes] = useState(true)
  const [isColors, setIsColors] = useState(true)

  // "States" for å lagre valgte bilder, størrelser og farger
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  // "State" for dropdown meny
  const [dropdown, setDropdown] = useState(false)

  // Funksjoner for å oppdatere valgt bilder, størrelse eller farge
  const handleImageClick = (index) => setSelectedImageIndex(index) // Når et bilde klikkes
  const handleSizeClick = (index) => setSelectedSizeIndex(index) // Når en størrelse klikkes
  const handleColorClick = (index) => setSelectedColorIndex(index) // Når en farge klikkes

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items")
        setData(response.data)
        // console.log(response.data)
        // console.log(selectedProduct)
        // console.log(selectedItemIndex)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching items:", error)
        setLoading(false)
      }
      window.scroll(top)
    }

    fetchItems()
  }, [])

  useEffect(() => {
    const changeProduct = () => {
      window.scroll(top)
      handleChangeItem(selectedProduct)
    }

    changeProduct()
    console.log(selectedProduct)
  }, [selectedProduct])

  // Funksjon for å endre dropdown-menyens tilstand
  const toggleDropdown = () => {
    dropdown ? setDropdown(false) : setDropdown(true)
  }

  const handleChangeItem = (e) => {
    setSelectedItemIndex(e)
    setSelectedProduct(e)
    setSelectedImageIndex(0)
    // window.scroll(top)
    dropdown && setDropdown(false)
  }

  return (
    <section className="productPage">
      <div className="componentContainer">
        <div className="productContainer">
          {/* Bildeseksjon */}
          <div className="imageSection">
            {/* Liste med miniatyrbilder */}
            <div className="imageListContainer">
              {listImages.map((src, index) => (
                <button
                  className="listItem"
                  key={index}
                  onClick={() => handleImageClick(index)}
                  aria-label={`Velg bilde ${index + 1}`} // Tilgjengelighetsattributt
                  aria-pressed={index === selectedImageIndex}
                >
                  <img
                    className={
                      index === selectedImageIndex ? "selected" : "not-selected"
                    }
                    src={src}
                    alt={`Miniatyrbilde av produkt ${index + 1}`} // Beskriv bildet
                  />
                </button>
              ))}
            </div>
            {/* Valgt bilde */}
            <div className="imageContainer">
              <img
                src={`${listImages[selectedImageIndex]}`}
                alt={`Valgt produktbilde ${selectedImageIndex + 1}`}
              />
            </div>
          </div>

          {/* Produktinformasjon og alternativer m.m. */}
          <article className="infoContainer">
            <header className="header">
              <h1>{data[selectedItemIndex]?.name || "Loading..."}</h1>
              {/* <h1>Produktnavn</h1> */}
              <p>Varenummer: xxx / Produktnr.: xxx</p>
            </header>
            <div className="priceContainer">
              <h2>{data[selectedItemIndex]?.price + " kr" || "Loading..."}</h2>
              {/* <h2>xx.xx kr</h2> */}
            </div>
            <div className="descriptionContainer">
              <p>
                {data[selectedItemIndex]?.description || "Loading..."}
                {/* Lorem Ipsum er standard fylltekst i trykkeribransjen siden
                1500-tallet. */}
              </p>
            </div>

            {/* Alternativer for størrelse og farge */}
            {(isSizes || isColors) && data[selectedItemIndex] && (
              <div className="alternativesContainer">
                {isSizes && data[selectedItemIndex].sizes?.length > 0 ? (
                  <div className="sizes">
                    <div className="alternativesHeader">
                      <b>Størrelse:</b>
                    </div>
                    <div className="sizeButtons">
                      {data[selectedItemIndex].sizes.map((size, index) => (
                        <button
                          key={index}
                          className={
                            index === selectedSizeIndex
                              ? "selected"
                              : "not-selected"
                          }
                          onClick={() => handleSizeClick(index)}
                          aria-label={`Velg størrelse ${size}`}
                          aria-pressed={index === selectedSizeIndex}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="noOptions">Ingen størrelser tilgjengelige</p>
                )}

                {isColors && data[selectedItemIndex].colors?.length > 0 ? (
                  <div className="colors">
                    <div className="alternativesHeader">
                      <b>Farge:</b>
                    </div>
                    <div className="colorButtons">
                      {data[selectedItemIndex].colors.map((color, index) => (
                        <button
                          key={index}
                          className={
                            index === selectedColorIndex
                              ? "selected"
                              : "not-selected"
                          }
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorClick(index)}
                          aria-label={`Velg farge ${index + 1}`}
                          aria-pressed={index === selectedColorIndex}
                        ></button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="noOptions">Ingen farger tilgjengelige</p>
                )}
              </div>
            )}

            {/* Kjøpsknapp */}
            <div className="buttonContainer">
              <button className="button" aria-label="Legg til i handlekurv">
                <h3>Legg til i handlekurv</h3>
              </button>
            </div>

            {/* Dropdown-knapp */}
            <button
              className="dropdownContainer"
              onClick={() => toggleDropdown()}
              aria-label="Veksle dropdown"
              aria-expanded={dropdown}
            >
              <h3 className="dropdownTitle">Dropdown tittel</h3>
              <div className="dropdownButton">
                {dropdown ? <h2>&#8722;</h2> : <h2>&#43;</h2>}
              </div>
            </button>

            {/* Dropdown-meny */}
            {dropdown && (
              <div className="dropdownParagraphContainer">
                <p className="dropdownParagraph">
                  Lorem Ipsum er en fylltekst brukt i trykkeri- og
                  designindustrien.
                </p>
              </div>
            )}
          </article>
        </div>

        {/* Lignende produkter-seksjon */}
        <div className="similarProductsContainer">
          <h1>Lignende produkter</h1>
          <div className="cardsContainer">
            {/* {[
              "/bærbar-hvitsøyemaskin.webp",
              "/aromaterapi-diffuser.webp",
              "/søvndagslyslampe-1.webp",
              "/søvnsensor.webp",
            ].map((src, index) => ( */}
            {data
              .filter(
                (item) =>
                  item.category === data[selectedProduct].category &&
                  item.id !== data[selectedItemIndex].id
              )
              .slice(0, 4)
              .map((item, index) => (
                <article
                  className="card"
                  key={index}
                  onClick={() => handleChangeItem(item.id)}
                  // onClick={(index) => handleChangeItem(index)}
                >
                  <figure className="imageContainer">
                    <img
                      src={item.images[0]}
                      alt={`Lignende produkt ${index + 1}`}
                      aria-label={`Se detaljer om lignende produkt ${
                        index + 1
                      }`}
                    />
                  </figure>
                  <div className="textContainer">
                    <p>{item.name}</p>
                    <p>
                      <strong>{item.price} kr</strong>
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
