import { table, getMinifiedRecords } from "@/lib/airtable";
const createCoffeeStore = async (req, res) => {
  //CREATE A RECORDS
  if (req.method === "POST") {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body[0];
    try {
      //CHECK ID
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          //create a record
          //CHECK NAME
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            //ERROR ID AND NAME
            res.status(400).json({ message: "Id or name is missing" });
          }
        }
      } else {
        //ERROR ID
        res.status(400).json({ message: "Id is missing" });
      }
    } catch (err) {
      ///ERROR CREATE OR  FINDING A STORE
      console.error("Error creating or finding a store", err);
      res
        .status(500)
        .json({ message: "Error creating or finding a store", err });
    }
  }
};
export default createCoffeeStore;
