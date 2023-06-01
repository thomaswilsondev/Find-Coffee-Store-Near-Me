const Airtable = require("airtable");
const base = new Airtable({ apiKey: "key4DkHhRaUI7Qtx4" }).base(
  "appJ8VyKa8asnMKMq"
);
const table = base("coffee-store");

const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (record) => {
  return record.map((record) => getMinifiedRecord(record));
};

export { table, getMinifiedRecords };
