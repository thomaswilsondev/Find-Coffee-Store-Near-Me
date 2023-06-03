import { table, getMinifiedRecords } from "../../lib/airtable";
const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    const findCoffeeStoreRecords = await table
      .select({
        filterByFormula: `id="${id}"`,
      })
      .firstPage();

    if (findCoffeeStoreRecords.length !== 0) {
      const records = getMinifiedRecords(findCoffeeStoreRecords);
      res.json(records);
    } else {
      res.json({ message: `id could not be found` });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreById;
