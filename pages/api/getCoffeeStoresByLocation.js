//Router /api/getCoffeeStoresByLocation?latLong=34,45&limit=30
//localhost:3000/api/getCoffeeStoresByLocation?latLong=10.869214749283616,106.7493411249436&limit=30
import { fetchCoffeeStores } from "../../lib/coffee-store";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200).json(response);
  } catch (err) {
    console.error("There is an error", err);
    res.status(500).json({ message: "Oh no! Something went wrong", err });
  }

  //return
};

export default getCoffeeStoresByLocation;
