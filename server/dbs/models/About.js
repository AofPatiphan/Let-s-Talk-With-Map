module.exports = (sequelize, Datatypes) => {
    const About = sequelize.define(
        'About',
        {
            caption: {
                type: Datatypes.STRING,
            },
            age: {
                type: Datatypes.STRING,
            },
            gender: {
                type: Datatypes.ENUM('male', 'female'),
            },
            birthDate: {
                type: Datatypes.DATEONLY,
            },
            latitude: {
                type: Datatypes.STRING,
            },
            longitude: {
                type: Datatypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    About.associate = (models) => {
        About.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
            },
        });
    };

    return About;
};
