import service from '../../../../support-web/src/utils/request'

export const useDiskApi = (id: number) => {
	return service.get('/check/disk/' + id)
}

export const useDiskSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/check/disk', dataForm)
	} else {
		return service.post('/check/disk', dataForm)
	}
}
