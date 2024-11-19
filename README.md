# 🦎 Chameleon

Chameleon (_vim-chameleon_) is a simple Vim/Neovim plugin that automatically
applies the `background` option based on the OS's dark/light mode. It supports
macOS and will supports other major platforms, including Windows, and Linux.

## Installation

Install [Deno](https://deno.land), then use
[vim-plug](https://github.com/junegunn/vim-plug) or your favorite Vim plugin
manager to install it as follows:

```vim
Plug 'vim-denops/denops.vim'
Plug 'lambdalisue/vim-chameleon'
```

## Usage

The plugin automatically detects the OS's dark/light mode every 30 minutes and
adjusts the `background` option accordingly. If you'd like to apply the change
immediately, run the following command:

```vim
:ChameleonApply
```

To disable the plugin, run:

```vim
:ChameleonDisable
```

To re-enable it, run:

```vim
:ChameleonEnable
```

You can modify the interval for checking changes by setting
`g:chameleon_interval` in your `vimrc`:

```vim
" Check every 5 minutes
let g:chameleon_interval = 5 * 60 * 1000
```

To disable automatic detection on startup, use the
`g:chameleon_disable_on_startup` option:

```vim
let g:chameleon_disable_on_startup = 1
```

To execute commands when the background changes, use the
`ChameleonBackgroundChanged:{background}` autocommand. For example, to change
the `colorscheme`:

```vim
augroup chameleon
  autocmd!
  autocmd User ChameleonBackgroundChanged:light colorscheme dawnfox
  autocmd User ChameleonBackgroundChanged:dark colorscheme nordfox
augroup END
```

This configuration switches the colorscheme to `dawnfox` when the background is
light and to `nordfox` when it is dark. You can find these colorschemes at
[EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim).

## License

The code in this repository is licensed under the MIT License, as detailed in
the LICENSE file. Contributors must agree that any modifications submitted to
this repository adhere to this license.
