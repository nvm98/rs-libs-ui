import { EmailBlock } from "@email-template/interfaces";
import { EmailBlockType } from "./email-block-type.type";

export type SubjectBlock = EmailBlock & {
    type: EmailBlockType.SUBJECT;
    content: {
        subjectLine: string;
        previewText: string;
    },
    styles: {},
}