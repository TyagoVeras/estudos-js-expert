import { UsersController } from './controller/users.controller';
import { app } from './server';

app.get('/', UsersController.getUsers());
