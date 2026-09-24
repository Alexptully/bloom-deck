/** Prefixes a file in `public/` with the deploy base path, e.g. "/renders/x.png" to "/bloom-deck/renders/x.png". */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
