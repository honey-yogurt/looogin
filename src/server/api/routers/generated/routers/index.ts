/******************************************************************************
* This file was generated by ZenStack CLI 2.9.4.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import createUserRouter from "./User.router";
import createVerificationTokenRouter from "./VerificationToken.router";
import createProductRouter from "./Product.router";
import createcategoryRouter from "./category.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
        user: createUserRouter(router, procedure),
        verificationToken: createVerificationTokenRouter(router, procedure),
        product: createProductRouter(router, procedure),
        category: createcategoryRouter(router, procedure),
    }
    );
}
