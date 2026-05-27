import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'PakAnderiesSayangPiyoPlate2026',
    });
  }

  async validate(payload: any) {
    // Apa yang kamu return di sini akan jadi req.user
    return { userId: payload.sub, username: payload.username };
  }
}