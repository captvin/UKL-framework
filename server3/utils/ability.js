const { Ability, AbilityBuilder } = require('@casl/ability')
const { outlet, transaksi,detail, paket, member, user } = require('@models')

const abilities = (id, role) => {
    const { can, cannot, build } = new AbilityBuilder(Ability)

    switch (role) {
        case 'admin':
            can('manage', [outlet, transaksi, member, user,paket, detail, outlet])
            break;
        case 'kasir':
            can('create', [transaksi, detail])
            can('read', [detail, transaksi, user, member, paket,outlet])
            can('update', [transaksi,detail])
            can('update', user, { id })
            can('delete', [transaksi,detail])
            break;
        case 'owner':
            can('read', [outlet, transaksi, member, user,paket, detail])
            break;
        default:
            break;
    }

    return build()
}

module.exports = abilities