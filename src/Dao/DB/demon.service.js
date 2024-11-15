import demonModel from "./models/demon.js";

const summonDemons = async () => demonModel.find();

const summonDemonById = async (id) => demonModel.findById(id).lean();

const createDemon = async (body) => demonModel.create(body);

const createManyDemons = async (body) => demonModel.insertMany(body);

const modifyDemon = async (id, update) => demonModel.findOneAndUpdate({id: id}, update);

const destroyDemon = async (id) => {
  try {
    await demonModel.deleteOne({ id: id });
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting demon');
  }
}

export { summonDemons, summonDemonById, createDemon, createManyDemons, modifyDemon, destroyDemon } 