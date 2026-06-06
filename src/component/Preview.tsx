import type { FC } from "react";
import { Link } from "wouter";
import { Markdown } from "./Markdown";

export namespace Preview {
    export type Show = {
        id: string;
        content: string;
    };

    export const Show: FC<Show> = ({ id, content }) => {
        return (
            <div className="cursor-pointer **:m-0! hover:opacity-80">
                <Link href={`/article/${id}`} asChild>
                    <div className="line-clamp-3">
                        <Markdown content={content}></Markdown>
                    </div>
                </Link>
            </div>
        );
    };
}
