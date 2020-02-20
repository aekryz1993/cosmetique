export const addTask = async (database, tasksCollection, body) => {
  try {
    await database.action(async () => {
      const newTask = await tasksCollection.create(task => {
        task.name = body.name;
        task.category = body.category;
        task.amount = body.amount;
        task.unit = body.unit;
      });
      if (newTask) {
        console.log(`${body.name} has been added`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
