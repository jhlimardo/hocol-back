const AssetsModel = require("../../models/Assets");

//metodo get de activos
const getAssets = async (req, res) => {
    const id = req.params.id;
    const queryObj = { ...req.query};
    if (!id && Object.keys(req.query).length === 0) {
      console.log("SIN PARAMETROS")
      try {
        const assets = await AssetsModel.find();
        res.status(200).json({message: "GET EXITOSO", data: assets});
      } catch (err) {
        res.status(500).send({message: "Oops...!!!hubo un error"});
      }
    } else if (id) {
      try {
        // console.log("id", id)
        const asset = await AssetsModel.find({_id: id});
        console.log("asset", asset[0])
        // res.status(200).json({message: "GET EXITOSO", data: Assets, status: 200});
        res.status(200).json(asset);
      } catch (err) {
        res.status(500).send({message: "Oops...!!!hubo un error", status: 500});
      }
    } else if (Object.keys(req.query).length > 0) {
      try{
        console.log("QUERY", queryObj)
        const asset= await AssetsModel.find(req.query);
        console.log("asset", asset[0])
        // res.status(200).json({message: "GET EXITOSO", data: user, status: 200});
        res.status(200).json({data: asset, message: "GET EXITOSO", status: 200, count: asset.length});
      } catch (err) {
        res.status(500).send({message: "Oops...!!!hubo un error", status: 500});
      }
    }
  };

//metodo post de activos
const addAssets = async (req, res) => {
    
    const {name, isActive, more} =req.body;
    console.log("add", req.body)

    
    try {
      if (req.body) {
        let assets;
        assets = await AssetsModel.find({name: name});
        console.log("Assets", assets)
        if (assets.length === 0) {
          
          assets = await AssetsModel.create(
            req.body
          )
          console.log("Create a new assets", assets)
        res.status(201).json({data: assets, message: "Assets creado correctamente", status: 201});
        } else res.status(400).json({ message: "El asset ya esxiste!", status: 400 });
      } else res.status(400).json({message: "Verifique los datos", status: 400})
      
    } catch (err) {
      console.error(err);
    }
  };
  

const updateAssets = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log("DESDE BACK", data);
        const assets = (await AssetsModel.findByIdAndUpdate(id, data, { 
            new: true,
            useFindAndModify: false
         }))
         if (!assets) return res.status(404).json({ message: "Asset no encontrado", status: 404 });
        res.status(200).json({ message: "Asset actualizado correctamente", status: 200, data: assets });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops...!!!hubo un error", status: 500 });
    }
};

const deleteAssets = async (req, res) => {
    try {
        const id = req.params.id;
        const assets = (await AssetsModel.findByIdAndDelete(id, { useFindAndModify: false }))
        if (!assets) return res.status(404).json({ message: "Usuario no encontrado", status: 404 });
        res.status(200).json({ message: "Usuario eliminado correctamente", status: 200, data: assets });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Oops...!!!hubo un error", status: 500 });
    }
};

module.exports = { 
    getAssets,
    addAssets,
    updateAssets, 
    deleteAssets };
