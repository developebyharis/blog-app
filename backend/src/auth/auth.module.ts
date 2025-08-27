import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { PrismaService } from "src/db/prisma.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "super-secret-key", 
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
