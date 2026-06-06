import { useEffect, useState, type FC } from "react";
import { Markdown } from "./Markdown";
import { res } from "../init";

export namespace Article {
    export type Show = {
        content: string;
    };

    export const Show: FC<Show> = ({ content }) => {
        return <Markdown content={content}></Markdown>;
    };

    export type Container = {
        id: string;
    };

    type State =
        | { loading: true; error?: never; value?: never }
        | { loading: false; error: Error; value?: never }
        | { loading: false; error?: never; value: string };

    export const Container: FC<Container> = ({ id }) => {
        const raw_url = res?.files?.[id]?.raw_url;
        const [state, set_state] = useState<State>({ loading: true });

        useEffect(() => {
            if (!raw_url) {
                set_state({ loading: true });
                return;
            }

            const controller = new AbortController();
            set_state({ loading: true });

            fetch(raw_url, { signal: controller.signal })
                .then((res) => res.text())
                .then((value) => {
                    set_state({ loading: false, value });
                })
                .catch((error: unknown) => {
                    if (controller.signal.aborted) return;
                    set_state({
                        loading: false,
                        error:
                            error instanceof Error
                                ? error
                                : new Error(String(error)),
                    });
                });

            return () => {
                controller.abort();
            };
        }, [raw_url]);

        return (
            <article>
                {!id || !raw_url || state.loading ? (
                    <>Loading...</>
                ) : state.error ? (
                    <>{state.error.message}</>
                ) : (
                    <Show content={state.value}></Show>
                )}
            </article>
        );
    };
}
