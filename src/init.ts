import { parse_config } from "./util/file";
import type { Config } from "./config";
import { memoize } from "./util/memoize";

type GistFile = {
    content?: string;
    filename?: string;
    raw_url?: string;
};

type Gist = {
    files?: Record<string, GistFile | null>;
};

export const res = await memoize(
    () =>
        fetch(`https://api.github.com/gists/${gist_id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        `GitHub Gist request failed: ${res.status}`,
                    );
                }

                return res.json() as Promise<Gist>;
            })
            .catch((err) => {
                console.error(err);
                return null;
            }),
    "res",
)();

export const config: Config = parse_config(
    (res?.files?.["config.json"] ?? res?.files?.["config.jsonc"])?.content,
) ?? {
    title: "blog",
    icon: "/icon",
};

document.title = config.title;

document.getElementById("icon")!.setAttribute("href", config.icon);

export const files = Object.values(res?.files ?? {})
    .filter((file): file is GistFile => file !== null)
    // blog articles with larger date values ​​(indicating newer) should be ranked higher,
    // and sorted in descending order.
    .sort((a, b) => -(a.filename ?? "").localeCompare(b.filename ?? ""));
