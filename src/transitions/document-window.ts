export function ownerDocument(node: Node | null | undefined): Document {
    return (node && node.ownerDocument) || document;
}

export function ownerWindow(node: Node | null): Window {
    const doc = ownerDocument(node);
    return doc.defaultView || window;
}
