import passport from "passport";
import userModel from "../../Dao/DB/models/users.js";

import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true //Para permitir que se pueda usar el req
        },
        async (req, email, password, done) => {
            const {name} = req.body;

            try {
                const user = await userModel.create({email, password, name, location, phone_number});
                
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )    
);

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'The user doesnt exist.' });
          }
  
          const validation = await user.isValidPassword(password);
  
          if (!validation) {
            return done(null, false, { message: 'Wrong Password, try again.' });
          }
  
          return done(null, user, { message: 'User logged successfully!' });
        } catch (error) {
          return done(error);
        }
      }
    )
);

passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'this_is_my_secret',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
);

export const isAuthenticated = (req, res, next) => {
  //Verifica si el usuario está autenticado
  if (req.isAuthenticated()) {
      //Si está autenticado, permite que la solicitud continúe
      return next();
  }
  //Sino se le redirecciona al principio 
  res.redirect('/forbidden');
};