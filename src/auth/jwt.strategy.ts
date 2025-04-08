import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // "Bearer <token>"
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret', // Same secret as used in JwtModule
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
