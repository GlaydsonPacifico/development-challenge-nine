import { create } from './create';
import { getAll } from './getAll';
import { getOne } from './getOne';
import { remove } from './remove';
import { update } from './update';


export const patientsService = {
  getAll,
  getOne,
  create,
  remove,
  update,
}