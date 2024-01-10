// auth/auth.controller.ts
import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
interface Body {
    username: string;
    password: string;
}
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body, @Res() res) {
        console.log(body)
        const result = await this.authService.validateUser(body.username, body.password);
        if (typeof result === 'string') {
            return res.status(401).json({ message: result });
        }

        return res.status(200).json(result);
    }

}
