import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import Markdown from "react-markdown";
import { useAsync } from "react-use";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { config, res } from "../init";

export type ArticleShow = {
    content: string;
};

export const ArticleShow: FC<ArticleShow> = ({ content }) => {
    return (
        <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {content}
        </Markdown>
    );
};

export type ArticleContainer = {
    id: string;
};

export const ArticleContainer: FC<ArticleContainer> = ({ id }) => {
    const raw_url = res?.data.files?.[id]?.raw_url;

    const state = useAsync(async () => {
        if (!raw_url) {
            return "";
        }
        return await fetch(raw_url).then((res) => res.text());
    });

    const description =
        state.value?.substring(0, 160).replace(/\n/g, " ") ??
        "Loading article...";

    return (
        <article>
            <Helmet>
                <title>{`${id} - ${config.title}`}</title>
                <meta name="description" content={description} />
                <meta
                    property="og:title"
                    content={`${id} - ${config.title}`}
                />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content={`${id} - ${config.title}`}
                />
                <meta name="twitter:description" content={description} />
            </Helmet>
            {!id || !raw_url || state.loading ? (
                <>Loading...</>
            ) : state.error ? (
                <>{state.error.message}</>
            ) : (
                <ArticleShow content={state.value ?? ""}></ArticleShow>
            )}
        </article>
    );
};
