import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/db/prisma.service";

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwtService: JwtService) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return this.generateToken(user.name, user.id, user.email);
  }

  async login(email: string, password: string) {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException("Invalid credentials");

    return this.generateToken(user.name, user.id, user.email);
  }

  private generateToken(name: string, userId: string, email: string) {
    const payload = { sub: userId, name, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
