/******************************************************************************
* This file was generated by ZenStack CLI 2.9.4.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

const metadata = {
    models: {
        account: {
            name: 'Account', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, type: {
                    name: "type",
                    type: "String",
                }, provider: {
                    name: "provider",
                    type: "String",
                }, providerAccountId: {
                    name: "providerAccountId",
                    type: "String",
                }, refresh_token: {
                    name: "refresh_token",
                    type: "String",
                    isOptional: true,
                }, access_token: {
                    name: "access_token",
                    type: "String",
                    isOptional: true,
                }, expires_at: {
                    name: "expires_at",
                    type: "Int",
                    isOptional: true,
                }, token_type: {
                    name: "token_type",
                    type: "String",
                    isOptional: true,
                }, scope: {
                    name: "scope",
                    type: "String",
                    isOptional: true,
                }, id_token: {
                    name: "id_token",
                    type: "String",
                    isOptional: true,
                }, session_state: {
                    name: "session_state",
                    type: "String",
                    isOptional: true,
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'accounts',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, refresh_token_expires_in: {
                    name: "refresh_token_expires_in",
                    type: "Int",
                    isOptional: true,
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, provider_providerAccountId: {
                    name: "provider_providerAccountId",
                    fields: ["provider", "providerAccountId"]
                },
            }
            ,
        }
        ,
        session: {
            name: 'Session', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, sessionToken: {
                    name: "sessionToken",
                    type: "String",
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, expires: {
                    name: "expires",
                    type: "DateTime",
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'sessions',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, sessionToken: {
                    name: "sessionToken",
                    fields: ["sessionToken"]
                },
            }
            ,
        }
        ,
        user: {
            name: 'User', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                    isOptional: true,
                }, email: {
                    name: "email",
                    type: "String",
                    isOptional: true,
                }, emailVerified: {
                    name: "emailVerified",
                    type: "DateTime",
                    isOptional: true,
                }, password: {
                    name: "password",
                    type: "String",
                    isOptional: true,
                }, role: {
                    name: "role",
                    type: "String",
                    isOptional: true,
                    attributes: [{ "name": "@default", "args": [{ "value": "USER" }] }],
                }, image: {
                    name: "image",
                    type: "String",
                    isOptional: true,
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, accounts: {
                    name: "accounts",
                    type: "Account",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, sessions: {
                    name: "sessions",
                    type: "Session",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, products: {
                    name: "products",
                    type: "Product",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'owner',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, email: {
                    name: "email",
                    fields: ["email"]
                },
            }
            ,
        }
        ,
        verificationToken: {
            name: 'VerificationToken', fields: {
                identifier: {
                    name: "identifier",
                    type: "String",
                }, token: {
                    name: "token",
                    type: "String",
                    isId: true,
                }, expires: {
                    name: "expires",
                    type: "DateTime",
                },
            }
            , uniqueConstraints: {
                token: {
                    name: "token",
                    fields: ["token"]
                }, identifier_token: {
                    name: "identifier_token",
                    fields: ["identifier", "token"]
                },
            }
            ,
        }
        ,
        product: {
            name: 'Product', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, oprice: {
                    name: "oprice",
                    type: "Float",
                }, price: {
                    name: "price",
                    type: "Float",
                }, quantity: {
                    name: "quantity",
                    type: "Int",
                    attributes: [{ "name": "@default", "args": [{ "value": 1 }] }],
                }, description: {
                    name: "description",
                    type: "String",
                }, image: {
                    name: "image",
                    type: "String",
                }, detailImages: {
                    name: "detailImages",
                    type: "ProductImage",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'product',
                }, depreciation: {
                    name: "depreciation",
                    type: "String",
                }, status: {
                    name: "status",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [{ "value": "AVAILABLE" }] }],
                }, owner: {
                    name: "owner",
                    type: "User",
                    isDataModel: true,
                    backLink: 'products',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "ownerId" },
                }, ownerId: {
                    name: "ownerId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'owner',
                }, categoryId: {
                    name: "categoryId",
                    type: "String",
                }, label: {
                    name: "label",
                    type: "String",
                }, wants: {
                    name: "wants",
                    type: "Int",
                }, popularity: {
                    name: "popularity",
                    type: "Int",
                }, attributes: {
                    name: "attributes",
                    type: "productAttribute",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'product',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        productImage: {
            name: 'ProductImage', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, url: {
                    name: "url",
                    type: "String",
                }, description: {
                    name: "description",
                    type: "String",
                    isOptional: true,
                }, order: {
                    name: "order",
                    type: "Int",
                    attributes: [{ "name": "@default", "args": [{ "value": 0 }] }],
                }, product: {
                    name: "product",
                    type: "Product",
                    isDataModel: true,
                    backLink: 'detailImages',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "productId" },
                }, productId: {
                    name: "productId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'product',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        category: {
            name: 'category', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, description: {
                    name: "description",
                    type: "String",
                    isOptional: true,
                }, parentId: {
                    name: "parentId",
                    type: "String",
                    isOptional: true,
                    isForeignKey: true,
                    relationField: 'parent',
                }, parent: {
                    name: "parent",
                    type: "category",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'subCategories',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "parentId" },
                }, subCategories: {
                    name: "subCategories",
                    type: "category",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'parent',
                }, attributes: {
                    name: "attributes",
                    type: "categoryAttribute",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'category',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        label: {
            name: 'label', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, popularity: {
                    name: "popularity",
                    type: "Int",
                    attributes: [{ "name": "@default", "args": [{ "value": 0 }] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, name: {
                    name: "name",
                    fields: ["name"]
                },
            }
            ,
        }
        ,
        categoryAttribute: {
            name: 'categoryAttribute', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, category: {
                    name: "category",
                    type: "category",
                    isDataModel: true,
                    backLink: 'attributes',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "categoryId" },
                }, categoryId: {
                    name: "categoryId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'category',
                }, order: {
                    name: "order",
                    type: "Int",
                    attributes: [{ "name": "@default", "args": [{ "value": 0 }] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, categoryId_name: {
                    name: "categoryId_name",
                    fields: ["categoryId", "name"]
                },
            }
            ,
        }
        ,
        productAttribute: {
            name: 'productAttribute', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, value: {
                    name: "value",
                    type: "String",
                }, product: {
                    name: "product",
                    type: "Product",
                    isDataModel: true,
                    backLink: 'attributes',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "productId" },
                }, productId: {
                    name: "productId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'product',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, productId_name: {
                    name: "productId_name",
                    fields: ["productId", "name"]
                },
            }
            ,
        }
        ,
    }
    ,
    deleteCascade: {
        user: ['Account', 'Session', 'Product'],
        product: ['ProductImage', 'productAttribute'],
        category: ['categoryAttribute'],
    }
    ,
    authModel: 'User'
};
export default metadata;
