module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define(
        "User",
        {
            email: {
                type: dataTypes.STRING,

                unique: true,
            },
            username: {
                type: dataTypes.STRING,

                allowNull: true,
            },
            walletaddress: {
                type: dataTypes.STRING,

                allowNull: false,
            }
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );
    return User;
};
