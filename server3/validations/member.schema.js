const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    nama: Joi.string().max(30),
    alamat: Joi.string(),
    gender: Joi.string().valid('L','P'),
    tlp: Joi.string().min(10).pattern(/^[0-9]+$/).message('"telepon" should be a valid phone number'),
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateMemberSchema: ValidateSchema(UpdateSchema),
    CreateMemberSchema: ValidateSchema(CreateSchema)
}