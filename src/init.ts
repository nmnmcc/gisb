import { Octokit } from "octokit";
import { parse_config } from "./util/file";
import type { Config } from "./config";

const client = new Octokit();

export const res = await client.rest.gists
    .get({
        gist_id,
    })
    .catch((err) => {
        console.error(err);
        return null;
    });

export const config: Config = parse_config(
    (res?.data.files?.["config.json"] ?? res?.data.files?.["config.jsonc"])
        ?.content as string,
) ?? {
    title: "blog",
    icon: "/icon",
};

const iconElement = document.getElementById("icon");
if (iconElement) {
    iconElement.setAttribute("href", config.icon);
}

// export const commits = await client.rest.gists.listCommits({ gist_id });

export const files = Object.values(res?.data.files ?? {})
    // blog articles with larger date values ​​(indicating newer) should be ranked higher,
    // and sorted in descending order.
    .sort((a, b) => -(a?.filename?.localeCompare(b?.filename ?? "") ?? 0))
    .filter((file) => file !== null);
