export interface Template {
    id?: string;
    shop?: string;
    name: string;
    content: string;
    blocks?: any;
    locale: string;
    type: 'email';
    engine: 'liquid' | 'handlebars' | 'mustache';
    subject?: string;
    description?: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}
//# sourceMappingURL=template.type.d.ts.map