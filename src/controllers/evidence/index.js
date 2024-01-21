const EvivenceModel = require("../../models/Evidences");

//metodo get de activos
const getEvidence = async (req, res) => {
    const id = req.params.id;
    const queryObj = { ...req.query};
    if (!id && Object.keys(req.query).length === 0) {
      console.log("SIN PARAMETROS")
      try {
        const response = await EvivenceModel.find();
        res.status(200).json({message: "GET EXITOSO", data: response});
      } catch (err) {
        res.status(500).send({message: "Oops...!!!hubo un error"});
      }
    } else if (id) {
      try {
        // console.log("id", id)
        const response = await EvivenceModel.find({_id: id});
        console.log("response", response[0])
        // res.status(200).json({message: "GET EXITOSO", data: response, status: 200});
        res.status(200).json(response);
      } catch (err) {
        res.status(500).send({message: "Oops...!!!hubo un error", status: 500});
      }
    } else if (Object.keys(req.query).length > 0) {
      try{
        console.log("QUERY", queryObj)
        const response= await EvivenceModel.find(req.query);
        console.log("response", response[0])
        // res.status(200).json({message: "GET EXITOSO", data: user, status: 200});
        res.status(200).json({data: response, message: "GET EXITOSO", status: 200, count: response.length});
      } catch (err) {
        res.status(500).send({message: "Oops...!!!hubo un error", status: 500});
      }
    }
  };

//metodo post de activos
const addEvidence = async (req, res) => {
    
    const {evidence} =req.body;
    console.log("add", req.body)

    
    try {
      if (req.body) {
        let response;
        response = await EvivenceModel.find({evidence: evidence});
        console.log("response", response)
        if (response.length === 0) {
          
          response = await EvivenceModel.create(
            req.body
          )
          console.log("Create a new response", response)
        res.status(201).json({data: response, message: "Evidencia creada correctamente", status: 201});
        } else res.status(400).json({ message: "La evidencia ya esxiste!", status: 400 });
      } else res.status(400).json({message: "Verifique los datos", status: 400})
      
    } catch (err) {
      console.error(err);
    }
  };
  

const updateEvidence = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log("DESDE BACK", data);
        const response = (await EvivenceModel.findByIdAndUpdate(id, data, { 
            new: true,
            useFindAndModify: false
         }))
         if (!response) return res.status(404).json({ message: "Evidencia no encontrada", status: 404 });
        res.status(200).json({ message: "Evidencia actualizada correctamente", status: 200, data: response });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops...!!!hubo un error", status: 500 });
    }
};

const deleteEvidence = async (req, res) => {
    try {
        const id = req.params.id;
        const response = (await EvivenceModel.findByIdAndDelete(id, { useFindAndModify: false }))
        if (!response) return res.status(404).json({ message: "Evidencia no encontrada", status: 404 });
        res.status(200).json({ message: "Evidencia eliminada correctamente", status: 200, data: response });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops...!!!hubo un error", status: 500 });
    }
};

module.exports = { 
    getEvidence,
    addEvidence,
    updateEvidence, 
    deleteEvidence };
