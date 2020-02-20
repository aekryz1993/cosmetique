export const updateGain = async (database, someFinance, product, unit) => {
  try {
    return await database.action(async () => {
      const updateedPost = await someFinance.update(finance => {
        finance.gain =
          unit === 'item'
            ? updateGain(database, someFinance, product.selling_price_piece)
            : updateGain(database, someFinance, product.selling_price_pack);
        finance.operation = 'gain';
      });
      if (updateedPost) {
        console.log('Gain updated');
      }
    });
  } catch (error) {
    console.log(error);
  }
};
