const { Ability, AbilityBuilder } = require('@casl/ability')
const { Kelas, Pembayaran, Petugas, Siswa, Spp, user } = require('@models')

const abilities = (id, role) => {
    const { can, cannot, build } = new AbilityBuilder(Ability)

    switch (role) {
        case 'admin':
            can('manage', [Kelas, Pembayaran, Petugas, Siswa, Spp, user])
            break;
        case 'kasir':
            can('create', [Pembayaran])
            can('read', [Kelas, Pembayaran, Petugas, Siswa, Spp, user])
            can('update', [Pembayaran], { idPetugas: id })
            can('update', User, { id })
            can('delete', [Pembayaran], { idPetugas: id })
            break;
        case 'owner':
            can('read', [Kelas, Pembayaran, Petugas, Siswa, Spp, User])
            break;
        default:
            break;
    }

    return build()
}

module.exports = abilities