const db = require('../sequelize/models');

const getInventarios = async () =>{
   
    const invs = await db.Inventarios.findAll();
    const inventarios = [];
    for (let inv of invs){
        inventarios.push({
            id : inv.id,
            codigo : inv.codigo,
            nombre : inv.nombre,
            descripcion : inv.descripcion,
            cantidad : inv.cantidad,
        })
    };
    return inventarios;
};

const getInventario = async (invIndex) => {
    const inv = await db.Inventarios.findOne({
        where: {
            id: invIndex
        }
    });
    return inv;
};

const getCodigoInventario = async (codInv) => {
    const inv = await db.Inventarios.findOne({
        where: {
            codigo: codInv
        }
    });
    return inv;
};

const createInventario = async (inv) => {
    return await db.Inventarios.create(inv);
};

const updateInventario = async (inv) =>{
    const invAEditar = await getInventario(inv.id);
    invAEditar.codigo = inv.codigo;
    invAEditar.nombre = inv.nombre;
    invAEditar.descripcion = inv.descripcion;
    invAEditar.cantidad = inv.cantidad;
    await invAEditar.save();
    return true;
};

const deleteInventario = async (inv) =>{
    await db.Inventarios.destroy({
        where: {
            id: inv.id
        }
    });
    return true;
};

module.exports = {
    getInventarios : getInventarios,
    createInventario : createInventario,
    deleteInventario : deleteInventario,
    getInventario : getInventario,
    updateInventario : updateInventario,
    getCodigoInventario: getCodigoInventario,
};