import { Request, Response } from "express";
import { checklogin } from "../../usecases/adminAuth";
export const login = async (req: Request, res: Response) => {
  try {
    const result = await checklogin(req.body);
    res.send(result);
  } catch (error: any) {
    res.send({ message: error.message });
  }
};
