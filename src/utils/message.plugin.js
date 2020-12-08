/* Creating our own plugins to send messages - Toasts like in materialize  */

export default {
    install(Vue, options) {
        Vue.prototype.$message = function (html) {
            window.M.toast({
                html
            })
        }
        Vue.prototype.$error = function (html) {
            window.M.toast({
                html: `[Error: ${html}]`
            })
        }
        console.log(options);
    }
}