import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition :{
        openapi: '3.0.0',
        info: {
            title:'CEMA HEALTH INFORMATION SYSTEM',
            version:'1.0.0',
            description: 'Health records management system'
        },
        components : {
            securitySchemes:{
                BearerAuth:{
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{BearerAuth: []}],
    },
    apis: ['.server/routes/*.js']
}

export default swaggerJsdoc(options)