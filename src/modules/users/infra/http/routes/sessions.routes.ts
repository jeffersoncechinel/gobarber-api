import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const SessionsRouter = Router();
const sessionsController = new SessionsController();

SessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create
);

export default SessionsRouter;
