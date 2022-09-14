const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    nama: Joi.string().max(30),
    idKelas: Joi.number(),
    alamat: Joi.string(),
    telepon: Joi.string().min(10).pattern(/^[0-9]+$/).message('"telepon" should be a valid phone number'),
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateSiswaSchema: ValidateSchema(UpdateSchema),
    CreateSiswaSchema: ValidateSchema(CreateSchema)
}