import { useState } from "react"
import "./ProductPage.css"

function ProductPage() {
  const listImages = ["/luftrenser-2.webp", "/luftrenser-1.webp"]

  const [isImages, setIsImages] = useState(true)
  const [isSizes, setIsSizes] = useState(true)
  const [isColors, setIsColors] = useState(true)

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)

  const [dropdown, setDropdown] = useState(false)

  const handleColorClick = (index) => setSelectedColorIndex(index)
  const handleImageClick = (index) => setSelectedImageIndex(index)
  const handleSizeClick = (index) => setSelectedSizeIndex(index)

  const toggleDropdown = () => {
    dropdown ? setDropdown(false) : setDropdown(true)
  }

  return (
    <section className="productPage">
      <div className="componentContainer">
        <div className="productContainer">
          <div className="imageSection">
            <div className="imageListContainer">
              {listImages.map((src, index) => (
                <button
                  className="listItem"
                  key={index}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    className={
                      index === selectedImageIndex ? "selected" : "not-selected"
                    }
                    src={src}
                    alt={`Image ${index}`}
                  />
                </button>
              ))}
            </div>
            <div className="imageContainer">
              <img
                src={`${listImages[selectedImageIndex]}`}
                alt="placeholderImage"
              />
            </div>
          </div>
          <article className="infoContainer">
            <header className="header">
              <h1>Produktnavn</h1>
              <p>Varenummer: xxx / Produktnr.: xxx</p>
            </header>
            <div className="priceContainer">
              <h2>xx.xx kr</h2>
            </div>
            <div className="descriptionContainer">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
            {(isSizes || isColors) && (
              <div className="alternativesContainer">
                {isSizes && (
                  <div className="sizes">
                    <div className="alternativesHeader">
                      <b>Størrelse:</b>
                    </div>
                    <div className="sizeButtons">
                      {["Medium", "Large"].map((size, index) => (
                        <button
                          key={index}
                          className={
                            index === selectedSizeIndex
                              ? "selected"
                              : "not-selected"
                          }
                          onClick={() => handleSizeClick(index)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {isColors && (
                  <div className="colors">
                    <div className="alternativesHeader">
                      <b>Farge:</b>
                    </div>
                    <div className="colorButtons">
                      {["#aaaaaa", "#ed8824", "#b724ed"].map((color, index) => (
                        <button
                          key={index}
                          className={
                            index === selectedColorIndex
                              ? "selected"
                              : "not-selected"
                          }
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorClick(index)}
                        ></button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="buttonContainer">
              <button className="button">
                <h3>Legg til i handlevogn</h3>
              </button>
            </div>
            <button
              className="dropdownContainer"
              onClick={() => toggleDropdown()}
            >
              <h3 className="dropdownTitle">Dropdown tittel</h3>
              <div className="dropdownButton">
                {dropdown ? <h2>&#8722;</h2> : <h2>&#43;</h2>}
              </div>
            </button>
            {dropdown && (
              <div className="dropdownParagraphContainer">
                <p className="dropdownPargraph">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>
            )}
          </article>
        </div>

        <div className="similarProductsContainer">
          <h1>Lignende produkter</h1>
          <div className="cardsContainer">
            {[
              "/bærbar-hvitsøyemaskin.webp",
              "/aromaterapi-diffuser.webp",
              "/søvndagslyslampe-1.webp",
              "/søvnsensor.webp",
            ].map((src, index) => (
              <article className="card" key={index}>
                <figure className="imageContainer">
                  <img src={src} alt={`Similar product ${index + 1}`} />
                </figure>
                <div className="textContainer">
                  <p>Tittel</p>
                  <p>
                    <strong>Pris</strong>
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
