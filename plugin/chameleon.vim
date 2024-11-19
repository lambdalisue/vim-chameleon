if exists('g:loaded_chameleon')
  finish
endif
let g:loaded_chameleon = 1

command! -nargs=0 ChameleonApply call denops#notify('chameleon', 'apply', [])
command! -nargs=0 ChameleonEnable call denops#notify('chameleon', 'enable', [])
command! -nargs=0 ChameleonDisable call denops#notify('chameleon', 'disable', [])

let g:chameleon_interval = get(g:, 'chameleon_interval', 30 * 60 * 1000)

if !get(g:, 'chameleon_disable_on_startup', 0)
  augroup chameleon_plugin
    autocmd!
    autocmd User DenopsPluginPost:chameleon ChameleonEnable
    autocmd User ChameleonBackgroundChanged:* :
  augroup END
endif
