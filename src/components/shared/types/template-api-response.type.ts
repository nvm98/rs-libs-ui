import { TemplateApiErrorResponse, TemplateApiSuccessResponse, TemplateCreateSuccessResponse } from "@shared/interfaces";

export type TemplateApiResponse = TemplateApiSuccessResponse | TemplateApiErrorResponse | TemplateCreateSuccessResponse;
