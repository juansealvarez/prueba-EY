const express = require('express');
const session = require('express-session');
const {getInventarios, createInventario, deleteInventario, getInventario, updateInventario, getCodigoInventario} = require('./models/dao_inventarios');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'assets'))); //configurar archivos estaticos

app.set('view engine', 'ejs'); //configurar ejs template
app.set('views', path.join(__dirname,'/views')); //ruta para directorios de views

app.use(bodyParser.json()); //configurar bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false
})); //para trabajar con formularios

app.get('/',(req, res)=>{
    //Valido si hay un usario en la sesion
    if (req.session.usuario != null){
        res.render('inicio',{
            usuario:req.session.usuario
        });
    }else{
        res.render("inicio",{
            usuario:{
                nombre: "",
                pais: "",
                mail: "",
                mensaje: ""
            }
        });
    };
});

app.get('/inventario', async (req, res)=>{
    const listaInventarios = await getInventarios();
    res.render("inventario",{
        inventarios : listaInventarios
    })
});

app.post('/registro', (req, res)=>{
    const usuario = {
        nombre:req.body.nombre,
        pais:req.body.pais,
        mail:req.body.mail,
        mensaje:req.body.mensaje
    };
    //guardarlo en sesion
    req.session.usuario = usuario;
    
    res.redirect('/');
});

app.get('/add', async (req, res)=>{
    res.render('inventario_registro');
});

app.post('/add', async (req,res)=>{
    const inv = {
        codigo : req.body.inv_codigo,
        nombre : req.body.inv_nombre,
        descripcion : req.body.inv_descripcion,
        cantidad : parseInt(req.body.inv_cantidad)
    };
    const inventarios = await getCodigoInventario(inv.codigo);
    if (inventarios == null){
        const invGuardado = await createInventario(inv);
        console.log(inv)
        console.log(invGuardado);
        res.redirect('/inventario');
    }else{
        res.render('inventario_registro_error');
    }
});

app.get('/edit',async (req, res)=>{
    res.render('inventario_edicion');
});

app.post('/edit', async (req, res) => {
    const codigo = req.body.inv_codigo;
    const inventarios = await getCodigoInventario(codigo);
    if (inventarios != null){
        const inv = {
            id: inventarios.id,
            codigo: codigo,
            nombre: req.body.inv_nombre,
            descripcion: req.body.inv_descripcion,
            cantidad: parseInt(req.body.inv_cantidad),
        };
        await updateInventario(inv);
        res.redirect('/inventario');
    }else{
        res.render('inventario_edicion_error');
    }
});

app.get('/delete', async (req, res)=>{
    res.render('inventario_eliminacion');
});

app.post('/delete', async (req,res)=>{
    const codigo = req.body.inv_codigo;
    const inventarios = await getCodigoInventario(codigo);
    if (inventarios != null){
        const inv = {
            id: inventarios.id,
            codigo: codigo,
            nombre: inventarios.nombre,
            descripcion: inventarios.descripcion,
            cantidad: parseInt(inventarios.cantidad),
        };
        await deleteInventario(inv);
        res.redirect('/inventario');
    }else{
        res.render('inventario_eliminacion_error');
    }
});

app.listen(PORT,()=>{
    console.log(`Servidor iniciandose en el puerto ${PORT}`);
});