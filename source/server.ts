import App from './simpleApp';
import databaseHandler from './database/databaseHandler';
import RouterSingleton from './router/routerSingleton';
// Sample
const app = new App(RouterSingleton.getInstance()).express;

databaseHandler.getInstance().migrate();

app.listen(process.env.PORT || 3333);
