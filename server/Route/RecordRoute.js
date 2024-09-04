import express from 'express'

import { createRecord, deleteRecord, getAllRecords, updateRecord } from '../Controller/recordController.js';
const router = express.Router()


router.get('/', getAllRecords);


router.post('/', createRecord);


router.put('/:id', updateRecord);


router.delete('/:id', deleteRecord);

export default router;