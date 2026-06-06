import type { FC, PropsWithChildren } from "react";
import { Link } from "wouter";
import { config } from "../init";

export const Main: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex w-full flex-col items-center">
            <div className="flex w-full max-w-5xl! flex-col p-8">
                <div className="flex flex-row items-end justify-between gap-4 pb-8">
                    <a
                        href={`https://gist.github.com/${gist_id}`}
                        className="text-4xl font-bold underline-offset-4 hover:underline"
                    >
                        {config.title}
                    </a>

                    <div className="flex flex-row gap-2 text-lg">
                        <Link
                            href="/"
                            className="underline-offset-4 hover:underline"
                        >
                            Home
                        </Link>
                    </div>
                </div>
                <div className="prose prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs contents w-full!">
                    {children}
                </div>
            </div>
        </div>
    );
};
