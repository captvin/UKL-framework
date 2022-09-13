const { Ability, AbilityBuilder } = require('@casl/ability')
const { outlet, Pembayaran, Petugas, Siswa, Spp } = require('@models')

const abilities = (id, role) => {
    const { can, cannot, build } = new AbilityBuilder(Ability)

    switch (role) {
        case 'superadmin':
            can('manage', [outlet, Pembayaran, Petugas, Siswa, Spp])
            break;
        case 'admin':
            can('create', [Pembayaran])
            can('read', [outlet, Pembayaran, Petugas, Siswa, Spp])
            can('update', [Pembayaran], { idPetugas: id })
            can('update', Petugas, { id })
            can('delete', [Pembayaran], { idPetugas: id })
            break;
        case 'owner':
            can('read', [outlet, Pembayaran, Petugas, Siswa, Spp])
            break;
        default:
            break;
    }

    return build()
}

module.exports = abilities