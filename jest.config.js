module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/application/tests'],
    moduleNameMapper: {
        "^@repositories/(.*)$": "<rootDir>/src/application/implementation/repositories/$1",
        "^@services/(.*)$": "<rootDir>/src/application/implementation/services/$1",
        "^@controllers/(.*)$": "<rootDir>/src/application/controllers/$1",
        "^@middlewares/(.*)$": "<rootDir>/src/application/http/middlewares/$1",
        "^@typeorm-config$": "<rootDir>/src/infrastructure/typeorm.config.ts",
        "^@express-config$": "<rootDir>/src/config/express.config.ts",
        "^@helpers/(.*)$": "<rootDir>/src/application/helpers/$1",
        "^@entities/(.*)$": "<rootDir>/src/domain/entities/$1",
        "^@routes/(.*)$": "<rootDir>/src/routes/$1",
        "^@error-custom/(.*)$": "<rootDir>/src/error-handling/$1",
        "^@dtos/(.*)$": "<rootDir>/src/application/dtos/$1",
    },
    "resolver": undefined
};
