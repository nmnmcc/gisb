import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { PreviewShow } from "../component/Preview";
import { classify } from "../util/file";
import { config, files } from "../init";

export const Home: FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <Helmet>
                <title>{`Home - ${config.title}`}</title>
                <meta name="description" content="A blog powered by GitHub Gists. This is the home page." />
            </Helmet>
            {files
                ?.filter(({ filename }) => classify(filename!) === "markdown")
                .map(({ filename, content }) => (
                    <PreviewShow
                        key={filename}
                        id={filename!}
                        content={content!}
                    ></PreviewShow>
                ))}
        </div>
    );
};
