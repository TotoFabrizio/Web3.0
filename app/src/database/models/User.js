module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define(
        "User",
        {
            email: {
                type: dataTypes.STRING,

                unique: true,
            },
            password: {
                type: dataTypes.STRING,

                allowNull: false,
            },
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );
    return User;
};
