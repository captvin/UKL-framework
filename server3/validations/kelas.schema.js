const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    namaKelas: Joi.string(),
    jurusan: Joi.string().valid('RPL', 'TKJ'),
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateKelasSchema: ValidateSchema(UpdateSchema),
    CreateKelasSchema: ValidateSchema(CreateSchema)
}

