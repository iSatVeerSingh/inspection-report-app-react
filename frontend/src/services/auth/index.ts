import Dexie from "dexie";

export const getInitStatus = async () => {
  try {
    const isExists = await Dexie.exists("inspection-db");
    return isExists;
  } catch (err) {
    console.log(err);
    return null;
  }
};