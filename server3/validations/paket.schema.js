const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    jenis: Joi.string(),
    harga: Joi.number()
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdatePaketSchema: ValidateSchema(UpdateSchema),
    CreatePaketSchema: ValidateSchema(CreateSchema)
}

