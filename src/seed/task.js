export const createTable = async (database, collection) => {
  try {
    return database.action(async () => {
      await collection.create();
    });
  } catch (error) {
    console.log(error);
  }
};
