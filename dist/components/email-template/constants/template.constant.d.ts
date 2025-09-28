import { Language } from "../interfaces";
export declare const DEFAULT_TEMPLATES: {
    readonly SMS: "Hi {{customer_name}}, your {{subscription_name}} subscription is due for renewal. Amount: {{amount}}";
    readonly WHATSAPP: "🎉 Hello {{customer_name}}! Your subscription *{{subscription_name}}* is now active. Thank you for choosing us!";
    readonly WEB_PUSH: "🔔 {{customer_name}} | Your subscription {{subscription_name}} needs attention!";
};
export declare const TEMPLATE_LIMITS: {
    readonly SMS: {
        readonly MAX_LENGTH: 1530;
        readonly WARNING_LENGTH: 160;
        readonly SEGMENT_LENGTH: 160;
    };
    readonly WHATSAPP: {
        readonly MAX_LENGTH: 1024;
        readonly WARNING_LENGTH: 800;
    };
    readonly WEB_PUSH: {
        readonly MAX_LENGTH: 150;
        readonly WARNING_LENGTH: 120;
        readonly TITLE_MAX_LENGTH: 50;
        readonly BODY_MAX_LENGTH: 100;
    };
};
export declare const SAMPLE_DATA: {
    readonly customer_name: "John Doe";
    readonly product_name: "iPhone 15 Pro";
    readonly subscription_name: "Back in Stock Alert";
    readonly amount: "$999";
    readonly store_name: "Your Store";
};
export declare const getSmsSegmentCount: (text: string) => number;
export declare const validateSmsTemplate: (text: string) => {
    isValid: boolean;
    isWarning: boolean;
    length: number;
    maxLength: 1530;
    warningLength: 160;
    segments: number;
};
export declare const validateWhatsappTemplate: (text: string) => {
    isValid: boolean;
    isWarning: boolean;
    length: number;
    maxLength: 1024;
    warningLength: 800;
};
export declare const validateWebPushTemplate: (text: string) => {
    isValid: boolean;
    isWarning: boolean;
    length: number;
    maxLength: 150;
    warningLength: 120;
};
export declare const replaceVariablesWithSampleData: (text: string) => string;
export declare const availableLanguages: Language[];
export declare const TEMPLATE_NAME: {
    BACK_IN_STOCK: string;
    CONFIRMATION: string;
};
//# sourceMappingURL=template.constant.d.ts.map