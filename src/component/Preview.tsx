import type { FC } from "react";
import Markdown from "react-markdown";
import { Link } from "wouter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export type PreviewShow = {
    id: string;
    content: string;
};

export const PreviewShow: FC<PreviewShow> = ({ id, content }) => {
    return (
        <div className="cursor-pointer **:!m-0 hover:opacity-80">
            <Link href={`/article/${id}`} asChild>
                <div className="line-clamp-3">
                    <Markdown
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                    >
                        {content}
                    </Markdown>
                </div>
            </Link>
        </div>
    );
};
