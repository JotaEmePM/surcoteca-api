import { CRUD } from "@/common/interfaces/crud.interface";
import emailDao from "../daos/email.dao";

class EmailLogService implements CRUD {
    async list(limit: number, page: number) {
        return emailDao.getEmailLogs(limit, page)
    }

    async create(resource: any) {
        return emailDao.AddEmailLog(resource)
    }

    async readById(id: string) {
        return emailDao.getEmailLogById(id)
    }



    // The following methods are not implemented in este servicio ya que no se requiere de modificaciones o eliminaciones.
    async deleteById(id: string): Promise<any> { throw new Error('Method not implemented.') }
    async putById(id: string, resource: any): Promise<any> { throw new Error('Method not implemented.') }
    async patchById(id: string, resource: any): Promise<any> { throw new Error('Method not implemented.') }
}

export default new EmailLogService()
