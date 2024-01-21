const CompensationsModel = require("../../models/Compensations");

//metodo get de activos
const getCompensations = async (req, res) => {
  const id = req.params.id;
  console.log("queryObj antes", req.query);
  if (!id && Object.keys(req.query).length === 0) {
    try {
      const compensations = await CompensationsModel.find();
      res.status(200).json({ message: "GET EXITOSO", data: compensations, status: 200, count: compensations.length });
    } catch (err) {
      res.status(500).send({ message: "Oops...!!!hubo un error" });
    }
  } else if (id) {
    try {
      // console.log("id", id)
      const compensations = await CompensationsModel.find({ _id: id });
      console.log("asset", asset[0]);
      // res.status(200).json({message: "GET EXITOSO", data: Compensations, status: 200});
      res.status(200).json(compensations);
    } catch (err) {
      res.status(500).send({ message: "Oops...!!!hubo un error", status: 500 });
    }
  } else if(Object.keys(req.query).length > 0) {
    try {
      console.log("Query Compensations", queryObj)
      const compensations = await CompensationsModel.find(req.query);
      console.log("asset", asset[0]);
      // res.status(200).json({message: "GET EXITOSO", data: Compensations, status: 200});
      res.status(200).json({ message: "GET EXITOSO", data: compensations, status: 200, count: compensations.length });
    } catch (err) {
      res.status(500).send({ message: "Oops...!!!hubo un error", status: 500 });
    }
  }
};

//metodo post de activos
const addCompensations = async (req, res) => {
  const { name, isActive, more } = req.body;
  console.log("add", req.body);

  try {
    if (req.body) {
      let compensations;

      compensations = await CompensationsModel.create(req.body);

      console.log("Create a new Compensations", compensations);
      res
        .status(201)
        .json({
          data: compensations,
          message: "Compensancion creada correctamente",
          status: 201,
        });
    } else
      res.status(400).json({ message: "Verifique los datos", status: 400 });
  } catch (err) {
    console.error(err);
  }
};

const updateCompensations = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("DESDE BACK", data);
    const compensations = await CompensationsModel.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    });
    if (!compensations)
      return res
        .status(404)
        .json({ message: "Usuario no encontrado", status: 404 });
    res
      .status(200)
      .json({
        message: "Usuario actualizado correctamente",
        status: 200,
        data: compensations,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Oops...!!!hubo un error", status: 500 });
  }
};

const deleteCompensations = async (req, res) => {
  try {
    const id = req.params.id;
    const compensations = await CompensationsModel.findByIdAndDelete(id, {
      useFindAndModify: false,
    });
    if (!compensations)
      return res
        .status(404)
        .json({ message: "Usuario no encontrado", status: 404 });
    res
      .status(200)
      .json({
        message: "Usuario eliminado correctamente",
        status: 200,
        data: compensations,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Oops...!!!hubo un error", status: 500 });
  }
};

module.exports = {
  getCompensations,
  addCompensations,
  updateCompensations,
  deleteCompensations,
};
