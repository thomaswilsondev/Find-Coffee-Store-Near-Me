const Airtable = require("airtable");
const base = new Airtable({ apiKey: "key4DkHhRaUI7Qtx4" }).base(
  "appJ8VyKa8asnMKMq"
);
const table = base("coffee-store");

console.log({ table });
const createCoffeeStore = async (req, res) => {
  console.log({ req });

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

        console.log({ findCoffeeStoreRecords });

        if (findCoffeeStoreRecords.length !== 0) {
          const records = findCoffeeStoreRecords.map((record) => {
            return {
              ...record.fields,
            };
          });
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

            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });
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
