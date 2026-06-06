import type { FC } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

export const Markdown: FC<{ content: string }> = ({ content }) => {
    const html = DOMPurify.sanitize(marked.parse(content, { async: false }));

    return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};
