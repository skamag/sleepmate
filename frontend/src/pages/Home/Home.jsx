import ItemsList from "../../components/ItemsList"
// import data from "../../data/products.json"
import "./Home.css"

function Home() {
  return (
    <div className="home">
      <ItemsList />
      {/* <div>Home</div>

      {data.map((element) => (
        <div key={element.id} className="card">
          <div className="imageContainer">
            <img src={element.images[0]}></img>
          </div>
          <div className="textContainer">
            <p>{element.id}</p>
            <p>{element.name}</p>
            <p>{element.description}</p>
            <p>{element.price}</p>
          </div>
        </div>
      ))} */}
    </div>
  )
}

export default Home
