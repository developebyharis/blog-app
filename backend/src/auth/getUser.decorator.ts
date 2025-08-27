import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // console.log("Data", data); // parse what user need from the controller
    // console.log("ctx", ctx); // add info related to the http req and which user if seding hte req 

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    console.log("user:", data ? user : user);

    return data ? user.userId : user.userId;
  }
);
