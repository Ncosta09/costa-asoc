// Plugin de remark que inserta un componente (por defecto <BlogMidCta />) antes del
// primer H2 que arranca después de una proporción dada del texto. Así el CTA cae a
// mitad de nota sin tocar los .mdx. Si la nota no tiene un H2 pasado ese punto,
// no inserta nada.

type Node = {
  type: string;
  depth?: number;
  position?: { start: { offset?: number } };
  children?: Node[];
  [key: string]: unknown;
};

type Options = { at: number; length: number; name?: string };

export function remarkMidCta({ at, length, name = "BlogMidCta" }: Options) {
  return (tree: Node) => {
    const children = tree.children;
    if (!children || length <= 0) return;
    const threshold = length * at;
    const index = children.findIndex(
      (n) =>
        n.type === "heading" &&
        n.depth === 2 &&
        (n.position?.start.offset ?? -1) >= threshold,
    );
    if (index <= 0) return;
    children.splice(index, 0, {
      type: "mdxJsxFlowElement",
      name,
      attributes: [],
      children: [],
    });
  };
}
