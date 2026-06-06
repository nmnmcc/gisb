import { parse } from "@std/jsonc";
import { Config } from "../config";

export type Type = "markdown" | "config" | "other";

export const classify = (name: string): Type => {
    if (name.endsWith(".md")) {
        return "markdown";
    }

    if (name.endsWith(".json") || name.endsWith(".jsonc")) {
        return "config";
    }

    return "other";
};

export const parse_config = (raw?: string) => {
    if (raw === undefined) return null;

    try {
        return Config.parse(parse(raw));
    } catch (err) {
        console.error(err);
        return null;
    }
};
