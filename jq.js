window.jq = (selectorOrArray) => {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else {
        elements = selectorOrArray
    }
    return {
        that: selectorOrArray.that,
        addClass(className) {
            // nodeList 虽然是类数组，但是有 forEach 方法（没有 map 等其他方法）
            elements.forEach(item => item.classList.add(className))
            return this
        },
        find(selector) {
            let arr = [];
            elements.forEach(item => {
                // 使用 ... 是为了将数组展开成一维数组
                arr.push(...item.querySelectorAll(selector))
            })

            // 保存旧的 this
            arr.that = this
            // 返回新的 this
            return jq(arr)
        },
        back() {
            return this.that
        },
        parent() {
            // 因为多个子元素可能会对应同一个父元素，所以需要去重
            let arr = []
            elements.forEach(item => {
                if (!arr.includes(item.parentNode)) {
                    arr.push(item.parentNode)
                }
            })
            return jq(arr)
        },
        children() {
            let arr = []
            elements.forEach(item => arr.push(...item.children))
            return jq(arr)
        },
        siblings() {
            let arr = []
            elements.forEach(item => {
                arr.push(...Array.from(item.parentNode.children).filter(n => n !== item))
            })
            return arr
        },
        next() {
            return jq(Array.from(elements).map(item => item.nextElementSibling))
        },
        prev() {
            return jq(Array.from(elements).map(item => item.prevElementSibling))
        },
        each(fn) {
            elements.forEach((item, index) => fn.call(null, item, index))
            return this
        },
        index() {
            return jq(Array.from(elements).map(item => {
                const nodes = item.parentNode.children
                for (let i = 0, len = nodes.length; i < len; i++) {
                    if (nodes[i] === item) {
                        return i;
                    }
                }
            }))
        },
        print() {
            console.log(elements);

        }
    }
}