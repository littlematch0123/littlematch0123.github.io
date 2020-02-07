window.dom = {
    create(str) {
        const tempNode = document.createElement("template")
        tempNode.innerHTML = str.trim()
        return tempNode.content.firstChild
    },
    after(newNode, refNode) {
        const { parentNode } = refNode
        // 即使 refNode.nextSibling 是 null，也可以成功
        refNode.parentNode.insertBefore(newNode, refNode.nextSibling)

    },
    before(newNode, refNode) {
        refNode.parentNode.insertBefore(newNode, refNode)
    },
    append(parentNode, childNode) {
        parentNode.appendChild(childNode)
    },
    wrap(newParentNode, refNode) {
        // 先把新父级插入到当前元素的前面
        refNode.parentNode.insertBefore(newParentNode, refNode)
        // 再把当前元素放入新父级的最后一个元素中
        newParentNode.appendChild(refNode)
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        node.innerHTML = ''
        return node
    },
    attr(node, key, val) {
        const { length } = arguments
        // 重载：根据参数个数的不同，实现不同的代码
        if (length === 3) {
            node.setAttribute(key, val)
        } else if (length === 2) {
            return node.getAttribute(key)
        }
    },
    text(node, text) {
        const { length } = arguments
        if (length === 2) {
            node.innerText = text
        } else if (length === 1) {
            return node.innerText
        }
    },
    html(node, html) {
        const { length } = arguments
        if (length === 2) {
            node.innerHTML = html
        } else if (length === 1) {
            return node.innerHTML
        }
    },
    style(node, keyOrObj, val) {
        const { length } = arguments
        // style(div, 'color', red)
        if (length === 3) {
            const key = keyOrObj
            node.style[key] = val
        } else if (length === 2) {
            // style(div, 'color')
            if (typeof keyOrObj === 'string') {
                const key = keyOrObj
                return node.style[key]
            } else {
                // style(div, { color: 'red' })
                const obj = keyOrObj
                for (let key in obj) {
                    node.style[key] = obj[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        contains(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, event, fn) {
        node.addEventListener(event, fn)
    },
    off(node, event, fn) {
        node.removeEventListener(event, fn)
    },
    find(selector, node) {
        return (node || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        return node.nextElementSibling
    },
    prev(node) {
        return node.prevElementSibling
    },
    each(nodeList, fn) {
        for (let i = 0, len = nodeList.length; i < len; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const nodes = node.parentNode.children;
        for (let i = 0, len = nodes.length; i < len; i++) {
            if (nodes[i] === node) {
                return i;
            }
        }
    },
}