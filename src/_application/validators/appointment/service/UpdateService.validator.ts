import Joi from "joi";
import { UpdateServiceDto } from "src/_application/dtos/appointments/service/UpdateService.dto";
import { ServiceDomain } from "src/appointment/domain/Service.domain";

export class UpdateServiceValidator {
  private schema = Joi.object<ServiceDomain>({
    name: Joi.string(),
    description: Joi.string(),
    duration: Joi.number(),
    price: Joi.number(),
    idService: Joi.string().uuid(),
  });
  validate(objToCompare: UpdateServiceDto, idService: string) {
    const { error } = this.schema.validate({...objToCompare, idService}, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(error.message);
    }
  }
}
