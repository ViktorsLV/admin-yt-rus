export default {
    bind(el, {value}) {
        window.M.Tooltip.init(el, {html: value})
    },
    /* to kill the directive when changing the pages (saves memory) */
    unbind(el) {
        const tooltip = window.M.Tooltip.getInstance(el)
    
        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}