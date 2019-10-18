if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
app = require('./config/server');

app.listen(app.get('port'), () => {
    console.log('aplicacion en el puerto', app.get('port'));
});