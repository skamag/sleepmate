import "./AdminOrders.css"

// const [orders, setOrders] = useState([])
// const [loading, setLoading] = useState(true)
// const [error, setError] = useState("")

// useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       setLoading(true)
//       const { data } = await API.get("/items")
//       setOrders(data)
//     } catch (err) {
//       setError("Failed to fetch orders.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   fetchorders()
// }, [])

// const handleUpdateOrder = async (id) => {
//   try {
//     const updatedOrder = { stock: 50 } // Example: Update stock
//     const { data } = await API.put(`/items/${id}`, updatedOrder) // PUT /api/items/:id
//     setOrders((prev) => prev.map((order) => (order._id === id ? data : order)))
//   } catch (err) {
//     console.error("Error updating order:", err)
//   }
// }

function AdminOrders() {
  return (
    <div className="adminOrders">
      AdminOrders
      {/* <ul>
        <li className="list-header">
          <span className="justify-center">
            <select name="handlinger" id="" value="">
              <option value="options-title">--</option>
              <option value="option-1">1</option>
              <option value="option-2">2</option>
              <option value="option-3">3</option>
            </select>
          </span>
          <span>Navn</span>
          <span>Pris</span>
          <span>På lager</span>
          <span></span>
        </li>
        {orders.map((order, index) => (
          <li key={order._id} className={`${index % 2 === 0 ? "dark" : ""}`}>
            <span className="justify-center">
              <input type="checkbox" />
            </span>
            <span>{order.name}</span>
            <span>{order.price}</span>
            <span>{order.stock}</span>
            <span className="justify-center">
              <button
                className="edit-button"
                onClick={() => handleUpdateOrder()}
              >
                <i className="fa fa-edit"></i>
              </button>
            </span>
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default AdminOrders
