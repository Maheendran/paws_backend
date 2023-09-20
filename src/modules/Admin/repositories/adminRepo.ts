import adminModel, { AdminInterface } from "../entites/adminModel";

export const findAdminByEmail = async (
  email: string
): Promise<AdminInterface | null> => {
  return await adminModel.findOne({ email });
};
