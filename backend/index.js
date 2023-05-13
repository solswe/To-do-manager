/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { object, string, number, date, boolean } from 'yup';
import jwtDecode from 'jwt-decode';


// database schema
const todoYup = object({
  user: string().required(),
  item: string().required(),
  details: string().optional(),
  complete: boolean().required(),
  category: string().optional(),
  createDate: date().default(() => new Date()),
});


const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

crudlify(app, {todo: todoYup})

export default app.init(); // export app to a runtime server engine



