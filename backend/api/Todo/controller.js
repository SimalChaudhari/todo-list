const { ServerError, ApiError } = require("@lib/error-handler/index");
const { ApiSuccess } = require("@lib/success-handler/index");
const { todoTable, userTable } = require("../../models/index");
const models = require("../../models/index");

// get All Todos
const getAll = async (req, res) => {
  try {
    let { page, limit, orderBy, orderDirection } = req.query;

    let order = [["createdAt", "DESC"]];
    if (orderBy && orderDirection) {
      order = [[orderBy, orderDirection]];
    }

    limit = limit ? parseInt(limit) : 10;
    offset = page ? parseInt(page) * limit : 0 * limit;
    
    const Todos = await todoTable.findAndCountAll({
      offset: offset,
      limit: limit,
      order: order
    });

    ApiSuccess(res, Todos);
  } catch (err) {
    ServerError(res, err);
  }
};


// Create
const create = async (req, res) => {
  try {
    const { name, description } = req.body;

    const Todo = await todoTable.create({
      name: name,
      description: description,
    });

    ApiSuccess(res, "Todo has been created successfully!");

  } catch (err) {
    ServerError(res, err);
  }
};

// update
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const todoData = await todoTable.findOne({ where: { id } });
    if (!todoData) {
      ApiError(res, "Invalid request!");
    } else {
      const updateData = {
        name: name,
        description: description,
      };

      await todoTable.update(updateData, { where: { id: id } });

      ApiSuccess(res, "Todo has been updated successfully!");
    }

  } catch (err) {
    ServerError(res, err);
  }
};

// delete
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await todoTable.findOne({ where: { id: id } });

    if (data) {
      await todoTable.destroy({ where: { id: id } }
      );
      ApiSuccess(res, "Data has been deleted successfully!");
    } else {
      ApiError(res, "Invalid request, Data not exist!");
    }

  } catch (err) {
    ServerError(res, err);
  }
};

// get by iD
const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await todoTable.findAndCountAll({
      include: [{
        model: models.userTable
      }],
      where: { id: id }
    });

    ApiSuccess(res, data);
  } catch (err) {
    ServerError(res, err);
  }
};


module.exports = {
  getAll,
  create,
  update,
  remove,
  getById
};