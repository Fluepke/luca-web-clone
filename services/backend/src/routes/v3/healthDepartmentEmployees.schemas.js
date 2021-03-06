const { z } = require('../../middlewares/validateSchema');

const createSchema = z.object({
  email: z.string().email().max(255),
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  phone: z.string().max(255),
});

const updateSchema = z.object({
  isAdmin: z.boolean().optional(),
  firstName: z.string().max(255).optional(),
  lastName: z.string().max(255).optional(),
  phone: z.string().max(255).optional(),
});

const employeeIdParametersSchema = z.object({
  employeeId: z.string().uuid(),
});

module.exports = {
  createSchema,
  updateSchema,
  employeeIdParametersSchema,
};
