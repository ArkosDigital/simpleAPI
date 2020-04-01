import app from './app';
import databasesHandler from './databasesHandler';

databasesHandler.migrate();

app.listen(process.env.PORT || 3333);
