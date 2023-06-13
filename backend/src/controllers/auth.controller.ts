import { Request, Response } from 'express';
import { registerUser, confirmRegistration, signInUser } from '../services/congnito';

export const signUp = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const response = await registerUser(username, password, email);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

export const confirmSignUp = async (req: Request, res: Response) => {
  const { username, code } = req.body;
  try {
    const response = await confirmRegistration(username, code);
    res.send({
      status: 200,
      message: 'Registered Successfully',
      code: response,
    });
  } catch (err) {
    res.send(err);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const response = await signInUser(username, password);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};
