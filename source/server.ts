import App from './app';
import databasesHandler from './database/databasesHandler';
import RouterSingleton from './routes/routerSingleton';
// Sample
const app = new App(RouterSingleton.getInstance()).express;

databasesHandler.getInstance().migrate();

app.listen(process.env.PORT || 3333);
