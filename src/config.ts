export type Config = {
    title: string;
    icon: string;
};

export const Config = {
    parse(value: unknown): Config {
        if (value === null || typeof value !== "object") {
            throw new Error("Config must be an object");
        }

        const { title, icon } = value as Partial<Config>;
        if (typeof title !== "string") {
            throw new Error("Config title must be a string");
        }

        if (typeof icon !== "string") {
            throw new Error("Config icon must be a string");
        }

        new URL(icon);

        return { title, icon };
    },
};
