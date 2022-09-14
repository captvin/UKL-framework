const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    idPetugas: Joi.number(),
    idSpp: Joi.number(),
    idSiswa: Joi.number(),
    tanggalBayar: Joi.string().isoDate(),
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdatePembayaranSchema: ValidateSchema(UpdateSchema),
    CreatePembayaranSchema: ValidateSchema(CreateSchema)
}