import Sequelize from 'sequelize';

const sequelize = new Sequelize('jwtAuth', 'postgres', 'postgres', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
    },
);

export default sequelize;
