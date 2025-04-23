import service from '../../../../support-web/src/utils/request'

export const useReportApi = (id: number) => {
	return service.get('/check/report/' + id)
}

export const useReportSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/check/report', dataForm)
	} else {
		return service.post('/check/report', dataForm)
	}
}

export const usePreviewPdfApi = () => {
	return service.get('/check/report/preview')
}
