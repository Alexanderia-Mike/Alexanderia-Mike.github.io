const scrollThumb = document.getElementById("scroll-thumb")
const scrollBar = document.getElementById("scroll-bar")
const container = document.getElementById("container")
const wrapper = document.getElementById("wrapper")

console.log(`container width = ${container.clientWidth}, wrapper width = ${wrapper.clientWidth}`)

function getCssProperty(element, property) {
    const computedStyle = window.getComputedStyle(element);
    const leftValue = computedStyle.getPropertyValue(property);
    const value = parseFloat(leftValue);
    return isNaN(value) ? 0 : value
}

/**
 * control:
 * 1. thumb appear or disappear
 *      if wrapper.scrollWidth <= container.width: disappear; else: appear
 * 2. thumb width
 *      displayRatio = wrapper.width / wrapper.scrollWidth
 *      thumb.width = scrollBar.width * displayRatio
 * 3. thumb position-x
 *      - when mouse move event:
 *          thumb.left = min(thumb.left + moveEvent.deltaX, scrollBar.width - thum.width)
 *      - when window resize event:
 *          back to 0
 * 4. wrapper position-x
 *      - if wrapper.scrollWidth <= container.width:
 *          scrollRatio = thumb.left / scrollBar.width
 *          wrapper.left = -wrapper.scrollWidth * scrollRatio
 *      - else:
 *          wrapper.left = (container.width - wrapper.width) / 2
 */

const handleScrollBar = () => {
    if (wrapper.scrollWidth <= container.clientWidth) {
        scrollBar.style.display = 'none'
    } else {
        scrollBar.style.display = ''
    }
}

const handleThumbWidth = () => {
    // thumb width
    const wrapperDisplayWidth = container.clientWidth
    const displayRatio = wrapperDisplayWidth / wrapper.scrollWidth
    scrollThumb.style.width = `${scrollBar.clientWidth * displayRatio}px`
    // console.log(`scrollbar width = ${scrollBar.clientWidth}, display ratio = ${displayRatio}, new client width = ${scrollThumb.clientWidth}`)
}

const handleThumbPosition = (startLeft, deltaX) => {
    const newLeft = Math.max(0, Math.min(startLeft + deltaX, scrollBar.clientWidth - scrollThumb.clientWidth))
    // console.log(`original left = ${startLeft}, deltaX = ${deltaX}, max left = ${scrollBar.clientWidth - scrollThumb.clientWidth}, new left = ${newLeft}`)
    scrollThumb.style.left = `${newLeft}px`
}

const handleWrapperPosition = () => {
    if (wrapper.scrollWidth > container.clientWidth) {
        const scrollRatio = getCssProperty(scrollThumb, 'left') / scrollBar.clientWidth
        wrapper.style.left = `${-scrollRatio * wrapper.scrollWidth}px`
    }
    else {
        wrapper.style.left = `${(container.clientWidth - wrapper.clientWidth) / 2}px`
    }
}

const resizeHandler = () => {
    handleScrollBar()
    handleThumbWidth()
    scrollThumb.style.left = `0px`
    handleWrapperPosition()
}

const handleThumbDrag = (event) => {
    event.preventDefault()

    const startX =
        'touches' in event ? event.touches[0].clientX : event.clientX
    const thumbStartLeft = Math.min(getCssProperty(scrollThumb, 'left'))

    const moveHandler = (moveEvent) => {
        const clientX =
            'touches' in moveEvent
                ? moveEvent.touches[0].clientX
                : moveEvent.clientX
        const deltaX = clientX - startX
        handleScrollBar()
        handleThumbWidth()
        handleThumbPosition(thumbStartLeft, deltaX)
        handleWrapperPosition()
    }

    const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler)
        document.removeEventListener('mouseup', upHandler)
        document.removeEventListener('touchmove', moveHandler)
        document.removeEventListener('touchend', upHandler)
    }

    document.addEventListener('mousemove', moveHandler)
    document.addEventListener('mouseup', upHandler)
    document.addEventListener('touchmove', moveHandler)
    document.addEventListener('touchend', upHandler)
}

scrollThumb.addEventListener('mousedown', handleThumbDrag)
scrollThumb.addEventListener('tochstart', handleThumbDrag)
window.addEventListener('resize', resizeHandler)
resizeHandler()