import Client from "./client.model";
import Program from "./program.model";

Client.belongsToMany(Program,{through : ClientPrograms})
Program.belongsToMany(Client,{through: ClientPrograms})

export const syncDatabase = async () => {
    try {
        await sequelize.sync({force: true});
        console.log('Db is synced')
    } catch (error) {
        console.log('Db sync failed', error)
    }
}