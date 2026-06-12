// Flattens a Keystone document (array of nodes with nested `children`) into
// plain text, so descriptions can be truncated on the timeline.

type DocNode = {
  text?: string
  children?: DocNode[]
}

export const documentToText = (document: unknown): string => {
  if (!Array.isArray(document)) return ""

  const walk = (nodes: DocNode[]): string =>
    nodes
      .map(node => {
        if (typeof node.text === "string") return node.text
        if (Array.isArray(node.children)) return walk(node.children)
        return ""
      })
      .join("")

  return walk(document as DocNode[])
    .replace(/\s+/g, " ")
    .trim()
}
